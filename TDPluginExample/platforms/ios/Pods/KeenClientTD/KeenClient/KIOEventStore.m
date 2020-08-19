//
//  KIOEventStore.m
//  KeenClient
//
//  Created by Cory Watson on 3/26/14.
//  Copyright (c) 2014 Keen Labs. All rights reserved.
//

#import "KeenClient.h"
#import "KIOEventStore.h"
#import "KIOEventStore_PrivateMethods.h"
#import "keen_io_sqlite3.h"

#import "CommonCrypto/CommonCryptor.h"
#import "MF_Base64Additions.h"

static NSString *encKey = nil;

@interface KIOEventStore()
- (BOOL)openAndInitDB;
- (void)closeDB;
- (void)releaseStatements;
- (BOOL)isDatabaseFileAccessible;
- (NSString*)getDatabaseFilePath;

// A dispatch queue used for sqlite.
@property (nonatomic) dispatch_queue_t dbQueue;

@end

@implementation KIOEventStore {
    keen_io_sqlite3 *keen_dbname;
    BOOL dbIsOpen;
    BOOL dbIsTableCreated;
    BOOL dbIsStmtPrepared;
    keen_io_sqlite3_stmt *insert_stmt;
    keen_io_sqlite3_stmt *find_stmt;
    keen_io_sqlite3_stmt *count_all_stmt;
    keen_io_sqlite3_stmt *count_pending_stmt;
    keen_io_sqlite3_stmt *make_pending_stmt;
    keen_io_sqlite3_stmt *reset_pending_stmt;
    keen_io_sqlite3_stmt *purge_stmt;
    keen_io_sqlite3_stmt *delete_stmt;
    keen_io_sqlite3_stmt *delete_all_stmt;
    keen_io_sqlite3_stmt *age_out_stmt;
    keen_io_sqlite3_stmt *convert_date_stmt;
}
- (instancetype)init {
    self = [super init];
    
    if(self) {
        // we're going to use a queue for all database operations, so let's create it
        self.dbQueue = dispatch_queue_create("com.treasuredata.sqlite", DISPATCH_QUEUE_SERIAL);
        
        dbIsOpen = NO;
        dbIsTableCreated = NO;
        dbIsStmtPrepared = NO;
        [self openAndInitDB];
    }
    return self;
}


- (BOOL)openAndInitDB {
    if (!dbIsOpen) {
        if (![self isDatabaseFileAccessible]) {
            KCLog(@"Database file isn't accessible now");
            return false;
        }
        
        if (![self openDB]) {
            return false;
        }
    }
    
    if (!dbIsTableCreated) {
        // Calling `createTable` isn't atomic operation, but it's called by `init` and other methods that are in the dispatch queue.
        // So it's safe.
        if(![self createTable]) {
            KCLog(@"Failed to create SQLite table!");
            return false;
        }
    }
    
    if (!dbIsStmtPrepared) {
        if (![self prepareAllSQLiteStatements]) {
            KCLog(@"Failed to prepare statements!");
            return false;
        }
    }

    return true;
}

- (BOOL)prepareAllSQLiteStatements {
    // Now we'll init prepared statements for all the things we might do.

    // This statement inserts events into the table.
    char *insert_sql = "INSERT INTO events (projectId, collection, eventData, pending) VALUES (?, ?, ?, 0)";
    if (keen_io_sqlite3_prepare_v2(keen_dbname, insert_sql, -1, &insert_stmt, NULL) != SQLITE_OK) {
        [self handleSQLiteFailure:@"prepare insert statement"];
        return FALSE;
    }
    
    // This statement finds non-pending events in the table.
    char *find_sql = "SELECT id, collection, eventData FROM events WHERE pending=0 AND projectId=?";
    if(keen_io_sqlite3_prepare_v2(keen_dbname, find_sql, -1, &find_stmt, NULL) != SQLITE_OK) {
        [self handleSQLiteFailure:@"prepare find statement"];
        return FALSE;
    }

    // This statement counts the total number of events (pending or not)
    char *count_all_sql = "SELECT count(*) FROM events WHERE projectId=?";
    if(keen_io_sqlite3_prepare_v2(keen_dbname, count_all_sql, -1, &count_all_stmt, NULL) != SQLITE_OK) {
        [self handleSQLiteFailure:@"prepare count all statement"];
        return FALSE;
    }

    // This statement counts the number of pending events.
    char *count_pending_sql = "SELECT count(*) FROM events WHERE pending=1 AND projectId=?";
    if(keen_io_sqlite3_prepare_v2(keen_dbname, count_pending_sql, -1, &count_pending_stmt, NULL) != SQLITE_OK) {
        [self handleSQLiteFailure:@"prepare count pending statement"];
        return FALSE;
    }

    // This statement marks an event as pending.
    char *make_pending_sql = "UPDATE events SET pending=1 WHERE id=?";
    if(keen_io_sqlite3_prepare_v2(keen_dbname, make_pending_sql, -1, &make_pending_stmt, NULL) != SQLITE_OK) {
        [self handleSQLiteFailure:@"prepare pending statement"];
        return FALSE;
    }
    
    // This statement resets pending events back to normal.
    char *reset_pending_sql = "UPDATE events SET pending=0 WHERE projectId=?";
    if(keen_io_sqlite3_prepare_v2(keen_dbname, reset_pending_sql, -1, &reset_pending_stmt, NULL) != SQLITE_OK) {
        [self handleSQLiteFailure:@"prepare reset pending statement"];
        return FALSE;
    }

    // This statement purges all pending events.
    char *purge_sql = "DELETE FROM events WHERE pending=1 AND projectId=?";
    if(keen_io_sqlite3_prepare_v2(keen_dbname, purge_sql, -1, &purge_stmt, NULL) != SQLITE_OK) {
        [self handleSQLiteFailure:@"prepare purge statement"];
        return FALSE;
    }

    // This statement deletes a specific event.
    char *delete_sql = "DELETE FROM events WHERE id=?";
    if(keen_io_sqlite3_prepare_v2(keen_dbname, delete_sql, -1, &delete_stmt, NULL) != SQLITE_OK) {
        [self handleSQLiteFailure:@"prepare delete statement"];
        return FALSE;
    }

    // This statement deletes all events.
    char *delete_all_sql = "DELETE FROM events";
    if(keen_io_sqlite3_prepare_v2(keen_dbname, delete_all_sql, -1, &delete_all_stmt, NULL) != SQLITE_OK) {
        [self handleSQLiteFailure:@"prepare delete all statement"];
        return FALSE;
    }

    // This statement deletes old events at a given offset.
    char *age_out_sql = "DELETE FROM events WHERE id <= (SELECT id FROM events ORDER BY id DESC LIMIT 1 OFFSET ?)";
    if(keen_io_sqlite3_prepare_v2(keen_dbname, age_out_sql, -1, &age_out_stmt, NULL) != SQLITE_OK) {
        [self handleSQLiteFailure:@"prepare age out statement"];
        return FALSE;
    }
    
    // This statement converts an NSDate to an ISO-8601 formatted date/time string (we use sqlite because NSDateFormatter isn't thread-safe)
    char *convert_date_sql = "SELECT strftime('%Y-%m-%dT%H:%M:%S',datetime(?,'unixepoch','localtime'))";
    if(keen_io_sqlite3_prepare_v2(keen_dbname, convert_date_sql, -1, &convert_date_stmt, NULL) != SQLITE_OK) {
        [self handleSQLiteFailure:@"prepare convert date statement"];
        return FALSE;
    }
    
    dbIsStmtPrepared = TRUE;
    return TRUE;
}

- (BOOL)addEvent:(NSData *)eventData collection: (NSString *)coll {
    // KCLog(@"addEvent:start");

    __block BOOL wasAdded = NO;

    if (encKey) {
        NSString *encryptedBase64 = [self encrypt:eventData];
        if (encryptedBase64) {
            eventData = [encryptedBase64 dataUsingEncoding:NSUTF8StringEncoding];
        }
        else {
            KCLog(@"Encryption failed. Storing it as a plain...");
            encKey = NULL;
        }
    }

    // we need to wait for the queue to finish because this method has a return value that we're manipulating in the queue
    dispatch_sync(self.dbQueue, ^{
        if (![self openAndInitDB]) {
            KCLog(@"DB is closed, skipping addEvent");
            return;
        }
        
        if (keen_io_sqlite3_bind_text(self->insert_stmt, 1, [self.projectId UTF8String], -1, SQLITE_STATIC) != SQLITE_OK) {
            [self handleSQLiteFailure:@"bind pid to add event statement"];
            return;
        }
        
        if (keen_io_sqlite3_bind_text(self->insert_stmt, 2, [coll UTF8String], -1, SQLITE_STATIC) != SQLITE_OK) {
            [self handleSQLiteFailure:@"bind coll to add event statement"];
            return;
        }
        
        if (keen_io_sqlite3_bind_blob(self->insert_stmt, 3, [eventData bytes], (int) [eventData length], SQLITE_TRANSIENT) != SQLITE_OK) {
            [self handleSQLiteFailure:@"bind insert statement"];
            return;
        }
        
        if (keen_io_sqlite3_step(self->insert_stmt) != SQLITE_DONE) {
            [self handleSQLiteFailure:@"insert event"];
            return;
        }
        
        wasAdded = YES;
        
        // You must reset before the commit happens in SQLite. Doing this now!
        keen_io_sqlite3_reset(self->insert_stmt);
        // Clears off the bindings for future uses.
        keen_io_sqlite3_clear_bindings(self->insert_stmt);
    });
    
    return wasAdded;
}

- (NSMutableDictionary *)getEvents {
    // KCLog(@"getEvents: start");

    // Create a dictionary to hold the contents of our select.
    __block NSMutableDictionary *events = [NSMutableDictionary dictionary];
    
    // reset pending events, if necessary
    if([self hasPendingEvents]) {
        [self resetPendingEvents];
    }
    
    // we need to wait for the queue to finish because this method has a return value that we're manipulating in the queue
    dispatch_sync(self.dbQueue, ^{
        if (![self openAndInitDB]) {
            KCLog(@"DB is closed, skipping getEvents");
            // Return an empty array so we don't break anything. No nulls here!
            return;
        }

        if (keen_io_sqlite3_bind_text(self->find_stmt, 1, [self.projectId UTF8String], -1, SQLITE_STATIC) != SQLITE_OK) {
            [self handleSQLiteFailure:@"bind pid to find statement"];
            return;
        }

        while (keen_io_sqlite3_step(self->find_stmt) == SQLITE_ROW) {
            // Fetch data out the statement
            long long eventId = keen_io_sqlite3_column_int64(self->find_stmt, 0);

            NSString *coll = [NSString stringWithUTF8String:(char *)keen_io_sqlite3_column_text(self->find_stmt, 1)];

            const void *dataPtr = keen_io_sqlite3_column_blob(self->find_stmt, 2);
            int dataSize = keen_io_sqlite3_column_bytes(self->find_stmt, 2);

            NSData *data = [[NSData alloc] initWithBytes:dataPtr length:dataSize];

            // Bind and mark the event pending.
            if(keen_io_sqlite3_bind_int64(self->make_pending_stmt, 1, eventId) != SQLITE_OK) {
                [self handleSQLiteFailure:@"bind int for make pending"];
                return;
            }
            if (keen_io_sqlite3_step(self->make_pending_stmt) != SQLITE_DONE) {
                [self handleSQLiteFailure:@"mark event pending"];
                return;
            }

            // Reset the pendifier
            keen_io_sqlite3_reset(self->make_pending_stmt);
            keen_io_sqlite3_clear_bindings(self->make_pending_stmt);

            if ([events objectForKey:coll] == nil) {
                // We don't have an entry in the dictionary yet for this collection
                // so create one.
                [events setObject:[NSMutableDictionary dictionary] forKey:coll];
            }

            if (encKey) {
                NSData *decrypted = [self decrypt:[[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding]];
                NSError *error = NULL;
                if (decrypted) {
                    [NSJSONSerialization JSONObjectWithData:decrypted options:0 error:&error];
                }
                if (decrypted && !error) {
                    data = decrypted;
                }
                else {
                    KCLog(@"Decryption failed. Trying to hanlde this event as a plain JSON");
                    [NSJSONSerialization JSONObjectWithData:data options:0 error:&error];
                    if (error) {
                        KCLog(@"This event can't be handled as a plain JSON. Deleting it");
                        [self deleteEvent:[NSNumber numberWithLongLong:eventId]];
                        continue;
                    }
                }
            }
            else {
                NSError *error = NULL;
                [NSJSONSerialization JSONObjectWithData:data options:0 error:&error];
                if (error) {
                    KCLog(@"This event can't be handled as a plain JSON. Deleting it");
                    [self deleteEvent:[NSNumber numberWithLongLong:eventId]];
                    continue;
                }

            }

            [[events objectForKey:coll] setObject:data forKey:[NSNumber numberWithUnsignedLongLong:eventId]];
        }

        // Reset things
        keen_io_sqlite3_reset(self->find_stmt);
        keen_io_sqlite3_clear_bindings(self->find_stmt);
    });
    
    return events;
}

- (void)resetPendingEvents {
    // KCLog(@"resetPendingEvents: start");

    dispatch_async(self.dbQueue, ^{
        if (![self openAndInitDB]) {
            KCLog(@"DB is closed, skipping resetPendingEvents");
            return;
        }
        if (keen_io_sqlite3_bind_text(self->reset_pending_stmt, 1, [self.projectId UTF8String], -1, SQLITE_STATIC) != SQLITE_OK) {
            [self handleSQLiteFailure:@"bind pid to reset pending statement"];
            return;
        }
        if (keen_io_sqlite3_step(self->reset_pending_stmt) != SQLITE_DONE) {
            [self handleSQLiteFailure:@"reset pending events"];
            return;
        }
        keen_io_sqlite3_reset(self->reset_pending_stmt);
        keen_io_sqlite3_clear_bindings(self->reset_pending_stmt);
    });
}

- (BOOL)hasPendingEvents {
    BOOL hasRows = NO;

    if ([self getPendingEventCount] > 0) {
        hasRows = TRUE;
    }
    return hasRows;
}

- (NSUInteger)getPendingEventCount {
    // KCLog(@"getPendingEventCount: start");

    __block NSUInteger eventCount = 0;

    // we need to wait for the queue to finish because this method has a return value that we're manipulating in the queue
    dispatch_sync(self.dbQueue, ^{
        if (![self openAndInitDB]) {
            KCLog(@"DB is closed, skipping getPendingEventcount");
            return;
        }
        if (keen_io_sqlite3_bind_text(self->count_pending_stmt, 1, [self.projectId UTF8String], -1, SQLITE_STATIC) != SQLITE_OK) {
            [self handleSQLiteFailure:@"bind pid to count pending statement"];
            return;
        }
        if (keen_io_sqlite3_step(self->count_pending_stmt) == SQLITE_ROW) {
            eventCount = (NSInteger) keen_io_sqlite3_column_int(self->count_pending_stmt, 0);
        } else {
            [self handleSQLiteFailure:@"get count of pending rows"];
            return;
        }
        keen_io_sqlite3_reset(self->count_pending_stmt);
        keen_io_sqlite3_clear_bindings(self->count_pending_stmt);
    });
    
    return eventCount;
}

- (NSUInteger)getTotalEventCount {
    // KCLog(@"getTotalEventCount: start");

    __block NSUInteger eventCount = 0;

    // we need to wait for the queue to finish because this method has a return value that we're manipulating in the queue
    dispatch_sync(self.dbQueue, ^{
        if (![self openAndInitDB]) {
            KCLog(@"DB is closed, skipping getTotalEventCount");
            return;
        }
        if (keen_io_sqlite3_bind_text(self->count_all_stmt, 1, [self.projectId UTF8String], -1, SQLITE_STATIC) != SQLITE_OK) {
            [self handleSQLiteFailure:@"bind pid to total event statement"];
            return;
        }
        if (keen_io_sqlite3_step(self->count_all_stmt) == SQLITE_ROW) {
            eventCount = (NSInteger) keen_io_sqlite3_column_int(self->count_all_stmt, 0);
        } else {
            [self handleSQLiteFailure:@"get count of total rows"];
            return;
        }
        keen_io_sqlite3_reset(self->count_all_stmt);
        keen_io_sqlite3_clear_bindings(self->count_all_stmt);
    });
    
    return eventCount;
}

- (void)deleteEvent: (NSNumber *)eventId {
    // KCLog(@"deleteEvent: start");

    dispatch_async(self.dbQueue, ^{
        if (![self openAndInitDB]) {
            KCLog(@"DB is closed, skipping deleteEvent");
            return;
        }
        if (keen_io_sqlite3_bind_int64(self->delete_stmt, 1, [eventId unsignedLongLongValue]) != SQLITE_OK) {
            [self handleSQLiteFailure:@"bind eventid to delete statement"];
            return;
        }
        if (keen_io_sqlite3_step(self->delete_stmt) != SQLITE_DONE) {
            [self handleSQLiteFailure:@"delete event"];
            return;
        };
        keen_io_sqlite3_reset(self->delete_stmt);
        keen_io_sqlite3_clear_bindings(self->delete_stmt);
    });
}

- (void)deleteAllEvents {
    dispatch_async(self.dbQueue, ^{
        if (![self openAndInitDB]) {
            KCLog(@"DB is closed, skipping deleteEvent");
            return;
        }
        if (keen_io_sqlite3_step(self->delete_all_stmt) != SQLITE_DONE) {
            [self handleSQLiteFailure:@"delete all events"];
            return;
        };
        keen_io_sqlite3_reset(self->delete_all_stmt);
        keen_io_sqlite3_clear_bindings(self->delete_all_stmt);
    });
}

- (void)deleteEventsFromOffset: (NSNumber *)offset {
    dispatch_async(self.dbQueue, ^{
        if (![self openAndInitDB]) {
            KCLog(@"DB is closed, skipping deleteEvent");
            return;
        }
        if (keen_io_sqlite3_bind_int64(self->age_out_stmt, 1, [offset unsignedLongLongValue]) != SQLITE_OK) {
            [self handleSQLiteFailure:@"bind offset to ageOut statement"];
            return;
        }
        if (keen_io_sqlite3_step(self->age_out_stmt) != SQLITE_DONE) {
            [self handleSQLiteFailure:@"delete all events"];
            return;
        };
        keen_io_sqlite3_reset(self->age_out_stmt);
        keen_io_sqlite3_clear_bindings(self->age_out_stmt);
    });
}


- (void)purgePendingEvents {
    // KCLog(@"purgePendingEvents: start");

    dispatch_async(self.dbQueue, ^{
        if (![self openAndInitDB]) {
            KCLog(@"DB is closed, skipping purgePendingEvents");
            return;
        }
        if (keen_io_sqlite3_bind_text(self->purge_stmt, 1, [self.projectId UTF8String], -1, SQLITE_STATIC) != SQLITE_OK) {
            [self handleSQLiteFailure:@"bind pid to purge statement"];
            return;
        }
        if (keen_io_sqlite3_step(self->purge_stmt) != SQLITE_DONE) {
            [self handleSQLiteFailure:@"purge pending events"];
            // XXX What to do here?
            return;
        };
        keen_io_sqlite3_reset(self->purge_stmt);
        keen_io_sqlite3_clear_bindings(self->purge_stmt);
    });
}

- (BOOL)isDatabaseFileAccessible {
    NSString *my_sqlfile = [self getDatabaseFilePath];
    NSFileManager *fileManager = [NSFileManager defaultManager];
    if ([fileManager fileExistsAtPath:my_sqlfile]) {
        // Check if the existing database file is accessible since I/O to the file fails after Data Protection enabled
        FILE *f = fopen([my_sqlfile UTF8String], "r");
        if (f == NULL) {
            NSLog(@"Failed to open database file!");
            return FALSE;
        }
        fclose(f);
    }
    
    // Maybe it'd better check if it's possible to create database file here
    return TRUE;
}

- (NSString*)getDatabaseFilePath {
    NSString *libraryPath = [NSSearchPathForDirectoriesInDomains(NSLibraryDirectory, NSUserDomainMask, YES) objectAtIndex:0];
    NSString *my_sqlfile = [libraryPath stringByAppendingPathComponent:@"keenEvents.sqlite"];
    return my_sqlfile;
}

- (BOOL)openDB {
    __block BOOL wasOpened = NO;
    NSString *my_sqlfile = [self getDatabaseFilePath];
    
    // initialize sqlite ourselves so we can config
    keen_io_sqlite3_shutdown();
    keen_io_sqlite3_config(SQLITE_CONFIG_MULTITHREAD);
    keen_io_sqlite3_initialize();
    
    if (keen_io_sqlite3_open([my_sqlfile UTF8String], &keen_dbname) == SQLITE_OK) {
        wasOpened = YES;
    } else {
        [self handleSQLiteFailure:@"create database"];
    }
    dbIsOpen = wasOpened;
    
    return wasOpened;
}

- (BOOL)createTable {
    BOOL wasCreated = NO;
    
    char *err;
    NSString *sql = [NSString stringWithFormat:@"CREATE TABLE IF NOT EXISTS 'events' (ID INTEGER PRIMARY KEY AUTOINCREMENT, collection TEXT, projectId TEXT, eventData BLOB, pending INTEGER, dateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP);"];
    if (keen_io_sqlite3_exec(keen_dbname, [sql UTF8String], NULL, NULL, &err) != SQLITE_OK) {
        KCLog(@"Failed to create table: %@", [NSString stringWithCString:err encoding:NSUTF8StringEncoding]);
        keen_io_sqlite3_free(err); // Free that error message
        [self closeDB];
    }
    else {
        wasCreated = YES;
    }
    dbIsTableCreated = wasCreated;

    return wasCreated;
}

- (void)closeDB {
    // Free our DB. This is safe on null pointers.
    keen_io_sqlite3_close(keen_dbname);
    // Reset state in case it matters.
    dbIsOpen = NO;
}

- (void)releaseStatements {
    // Free all the prepared statements. This is safe on null pointers.
    keen_io_sqlite3_finalize(insert_stmt);
    keen_io_sqlite3_finalize(find_stmt);
    keen_io_sqlite3_finalize(count_all_stmt);
    keen_io_sqlite3_finalize(count_pending_stmt);
    keen_io_sqlite3_finalize(make_pending_stmt);
    keen_io_sqlite3_finalize(reset_pending_stmt);
    keen_io_sqlite3_finalize(purge_stmt);
    keen_io_sqlite3_finalize(delete_stmt);
    keen_io_sqlite3_finalize(delete_all_stmt);
    keen_io_sqlite3_finalize(age_out_stmt);
    keen_io_sqlite3_finalize(convert_date_stmt);
    dbIsStmtPrepared = NO;
}

- (id)convertNSDateToISO8601:(id)date {
    double offset = 0.0f;
    if([date isKindOfClass:[NSDate class]]) {
        offset = [[NSTimeZone localTimeZone] secondsFromGMTForDate:date] / 3600.00;  // need the offset
    }
    else if([date isKindOfClass:[NSString class]]) {
        offset = [[NSTimeZone localTimeZone] secondsFromGMT] / 3600.00;  // need the offset
    }
    NSArray *offsetArray = [[NSString stringWithFormat:@"%f",offset] componentsSeparatedByString:@"."]; // split it so we don't have to do math or numberformatting, which isn't thread-safe either
    NSString *hour = [[offsetArray objectAtIndex:0] stringByReplacingOccurrencesOfString:@"-" withString:@""];
    NSString *minute = [[offsetArray objectAtIndex:1] substringToIndex:2];
    
    // ensure we have leading zeros where necessary
    while([hour length] < 2) {
        hour = [@"0" stringByAppendingString:hour];
    }
    
    // minute math
    if([minute isEqual: @"25"]) { minute = @"15"; }
    if([minute isEqual: @"50"]) { minute = @"30"; }
    if([minute isEqual: @"75"]) { minute = @"45"; }
    
    NSString *offsetString = [[hour stringByAppendingString:@":"] stringByAppendingString:minute];
    
    // are we + or -?
    if(offset >= 0) {
        offsetString = [@"+" stringByAppendingString:offsetString];
    } else {
        offsetString = [@"-" stringByAppendingString:offsetString];
    }
    
    __block NSString *iso8601 = @"";
    dispatch_sync(self.dbQueue, ^{
        if (![self openAndInitDB]) {
            KCLog(@"DB is closed, skipping convertNSDateToISO8601");
            return;
        }
        // bind
        if (keen_io_sqlite3_bind_text(self->convert_date_stmt, 1, [[NSString stringWithFormat:@"%f", [date timeIntervalSince1970]] UTF8String], -1, SQLITE_STATIC) != SQLITE_OK) {
            [self handleSQLiteFailure:@"bind date to date conversion statement"];
            return;
        }
        
        if (keen_io_sqlite3_step(self->convert_date_stmt) != SQLITE_ROW) {
            [self handleSQLiteFailure:@"date conversion"];
            return;
        }
        
        iso8601 = [[NSString stringWithUTF8String:(char *)keen_io_sqlite3_column_text(self->convert_date_stmt, 0)] stringByAppendingString:offsetString];
        
        // reset things
        keen_io_sqlite3_reset(self->convert_date_stmt);
        keen_io_sqlite3_clear_bindings(self->convert_date_stmt);
    });
    
    return iso8601;
}

+ (void)initializeEncryptionKey:(NSString*)encryptionKey {
    encKey = encryptionKey;
}

- (NSData*)encdecBase:(int)mode data:(NSData*)data {
    if (encKey == nil) {
        return nil;
    }
    
    char keyBuf[kCCKeySizeAES128+1];
    bzero(keyBuf, sizeof(keyBuf));
    
    [encKey getCString:keyBuf maxLength:sizeof(keyBuf) encoding:NSUTF8StringEncoding];
    
    size_t buflen = [data length] + kCCBlockSizeAES128;
    void *buf = malloc(buflen);
    
    size_t proccessedBytes = 0;
    CCCryptorStatus status = CCCrypt(mode, kCCAlgorithmAES128, kCCOptionPKCS7Padding | kCCOptionECBMode,
                                     keyBuf, kCCKeySizeAES128, NULL, [data bytes], [data length],
                                     buf, buflen, &proccessedBytes);

    if (status != kCCSuccess) {
        free(buf);
        return nil;
    }
    
    NSData *result = [NSData dataWithBytes:buf length:proccessedBytes];
    free(buf);
    return result;
}

- (NSString*) base64Encode:(NSData*)data {
    NSString *encodeded;
    /*
     if ([data respondsToSelector:@selector(base64EncodedStringWithOptions:)]) {
        encodeded = [data base64EncodedStringWithOptions:kNilOptions]; // iOS7 and later
    } else {
        encodeded = [data base64Encoding]; // iOS6 and prior
    }
     */
    encodeded = [MF_Base64Codec base64StringFromData:data];
    return encodeded;
}

- (NSData*) base64Decode:(NSString*)data {
    NSData* decodeded;
    /*
    if ([NSData instancesRespondToSelector:@selector(initWithBase64EncodedString:options:)]) {
        decodeded = [[NSData alloc] initWithBase64EncodedString:data options:kNilOptions];
    } else {
        decodeded = [[NSData alloc] initWithBase64Encoding:data];
    }
     */
    decodeded = [MF_Base64Codec dataFromBase64String:data];
    return decodeded;
}

- (NSString*)encrypt:(NSData*)data {
    NSData *encrypted =[self encdecBase:kCCEncrypt data:data];
    return [self base64Encode:encrypted];
}

- (NSData *)decrypt:(NSString*)encryptedBase64 {
    NSData *decrypted = [self base64Decode:encryptedBase64];
    return [self encdecBase:kCCDecrypt data:decrypted];
}

- (void)handleSQLiteFailure: (NSString *) msg {
    NSLog(@"Failed to %@: %@",
          msg, [NSString stringWithCString:keen_io_sqlite3_errmsg(keen_dbname) encoding:NSUTF8StringEncoding]);

    if (dbIsStmtPrepared) {
        [self releaseStatements];
    }
    
    if (dbIsOpen) {
        [self closeDB];
    }

    self.lastErrorMessage = [NSString stringWithFormat:@"Failed to %@: %@",
                             msg, [NSString stringWithCString:keen_io_sqlite3_errmsg(keen_dbname) encoding:NSUTF8StringEncoding]];
}

@end
