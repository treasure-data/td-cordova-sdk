#import "TreasureDataPlugin.h"
#import <Cordova/CDVPlugin.h>
#import "TreasureData.h"

@implementation TreasureDataPlugin

#pragma mark - Send Plugin Result Helpers

- (void)sendOkResult:(CDVInvokedUrlCommand *)command {
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)sendStringResult:(CDVInvokedUrlCommand *)command string:(NSString *)string {
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:string];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)sendBoolResult:(CDVInvokedUrlCommand *)command boolValue:(BOOL)boolValue {
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:boolValue];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)sendArrayResult:(CDVInvokedUrlCommand *)command array:(NSArray *)array {
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:array];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)sendErrorMessageResult:(CDVInvokedUrlCommand *)command code:(NSString *)code message:(NSString *)message {
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:@{@"code": code, @"message": message}];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (NSString*)getStringArg: (CDVInvokedUrlCommand *)command atIndex: (NSInteger)index {
    if ([command.arguments count] <= index) {
        return nil;
    }

    NSString *columnName = [command.arguments objectAtIndex:index];

    if (columnName == nil || ![columnName isKindOfClass:[NSString class]]) {
        return nil;
    }

    return columnName;
}

#pragma mark - Set up

- (void)setup:(CDVInvokedUrlCommand *)command
{
    NSDictionary *configuration = [command.arguments objectAtIndex:0];

    [TreasureData initializeApiEndpoint:configuration[@"apiEndpoint"]];
    [TreasureData initializeEncryptionKey:configuration[@"encryptionKey"]];
    [TreasureData initializeWithApiKey:configuration[@"apiKey"]];
    [[TreasureData sharedInstance] setDefaultDatabase:configuration[@"defaultDatabase"]];
    [[TreasureData sharedInstance] setDefaultTable:configuration[@"defaultTable"]];
    [[TreasureData sharedInstance] setCdpEndpoint:configuration[@"cdpEndpoint"]];
}

#pragma mark - Add Event

- (void)addEvent:(CDVInvokedUrlCommand *)command
{
    NSDictionary *event = [command.arguments objectAtIndex:0];
    NSString *table = [self getStringArg:command atIndex:1];
    NSString *database = [self getStringArg:command atIndex:2];

    if (database == nil) {
        [[TreasureData sharedInstance] addEvent:event table:table];
    } else {
        [[TreasureData sharedInstance] addEvent:event database:database table:table];
    }
}

- (void)addEventWithCallback:(CDVInvokedUrlCommand *)command
{
    NSDictionary *event = [command.arguments objectAtIndex:0];
    NSString *table = [self getStringArg:command atIndex:1];
    NSString *database = [self getStringArg:command atIndex:2];

    if (database == nil) {
        [[TreasureData sharedInstance] addEventWithCallback:event table:table onSuccess:^{
            [self sendOkResult:command];
        } onError:^(NSString * _Nonnull errorCode, NSString * _Nullable errorMessage) {
            [self sendErrorMessageResult:command code:errorCode message:errorMessage];
        }];
    } else {
        [[TreasureData sharedInstance] addEventWithCallback:event database:database table:table onSuccess:^{
            [self sendOkResult:command];
        } onError:^(NSString * _Nonnull errorCode, NSString * _Nullable errorMessage) {
            [self sendErrorMessageResult:command code:errorCode message:errorMessage];
        }];
    }
}

#pragma mark - Upload Events

- (void)uploadEvents:(CDVInvokedUrlCommand *)command
{
    [[TreasureData sharedInstance] uploadEvents];
}

- (void)uploadEventsWithCallback:(CDVInvokedUrlCommand *)command
{
    [[TreasureData sharedInstance] uploadEventsWithCallback:^{
        [self sendOkResult:command];
    } onError:^(NSString * _Nonnull errorCode, NSString * _Nullable errorMessage) {
        [self sendErrorMessageResult:command code:errorCode message:errorMessage];
    }];
}

#pragma mark - UUID

- (void)getUUID:(CDVInvokedUrlCommand *)command
{
    NSString *uuid = [[TreasureData sharedInstance] getUUID];
    [self sendStringResult:command string:uuid];
}

- (void)enableAutoAppendUniqId:(CDVInvokedUrlCommand *)command
{
    [[TreasureData sharedInstance] enableAutoAppendUniqId];
}

- (void)disableAutoAppendUniqId:(CDVInvokedUrlCommand *)command
{
    [[TreasureData sharedInstance] disableAutoAppendUniqId];
}

- (void)resetUniqId:(CDVInvokedUrlCommand *)command
{
    [[TreasureData sharedInstance] resetUniqId];
}

#pragma mark - Auto Append Model Information

- (void)enableAutoAppendModelInformation:(CDVInvokedUrlCommand *)command
{
    [[TreasureData sharedInstance] enableAutoAppendModelInformation];
}

- (void)disableAutoAppendModelInformation:(CDVInvokedUrlCommand *)command
{
    [[TreasureData sharedInstance] disableAutoAppendModelInformation];
}

#pragma mark - Auto Append App Information

- (void)enableAutoAppendAppInformation:(CDVInvokedUrlCommand *)command
{
    [[TreasureData sharedInstance] enableAutoAppendAppInformation];
}

- (void)disableAutoAppendAppInformation:(CDVInvokedUrlCommand *)command
{
    [[TreasureData sharedInstance] disableAutoAppendAppInformation];
}

#pragma mark - Auto Append Local Information

- (void)enableAutoAppendLocaleInformation:(CDVInvokedUrlCommand *)command
{
    [[TreasureData sharedInstance] enableAutoAppendLocaleInformation];
}

- (void)disableAutoAppendLocaleInformation:(CDVInvokedUrlCommand *)command
{
    [[TreasureData sharedInstance] disableAutoAppendLocaleInformation];
}

#pragma mark - Server Side Upload Timestamp

- (void)enableServerSideUploadTimestamp:(CDVInvokedUrlCommand *)command
{
    NSString *columnName = [self getStringArg:command atIndex:0];
    if (columnName == nil) {
        [[TreasureData sharedInstance] enableServerSideUploadTimestamp];
    } else {
        [[TreasureData sharedInstance] enableServerSideUploadTimestamp:columnName];
    }
}

- (void)disableServerSideUploadTimestamp:(CDVInvokedUrlCommand *)command
{
    [[TreasureData sharedInstance] disableServerSideUploadTimestamp];
}

#pragma mark - Auto Append Record UUID

- (void)enableAutoAppendRecordUUID:(CDVInvokedUrlCommand *)command
{
    NSString *columnName = [self getStringArg:command atIndex:0];
    if (columnName == nil) {
        [[TreasureData sharedInstance] enableAutoAppendRecordUUID];
    } else {
        [[TreasureData sharedInstance] enableAutoAppendRecordUUID:columnName];
    }
}

- (void)disableAutoAppendRecordUUID:(CDVInvokedUrlCommand *)command
{
    [[TreasureData sharedInstance] disableAutoAppendRecordUUID];
}

#pragma mark - Auto Append Advertising Identifier

- (void)enableAutoAppendAdvertisingIdentifier:(CDVInvokedUrlCommand *)command
{
    NSString *columnName = [self getStringArg:command atIndex:0];
    if (columnName == nil) {
        [[TreasureData sharedInstance] enableAutoAppendAdvertisingIdentifier];
    } else {
        [[TreasureData sharedInstance] enableAutoAppendAdvertisingIdentifier:columnName];
    }
}

- (void)disableAutoAppendAdvertisingIdentifier:(CDVInvokedUrlCommand *)command
{
    [[TreasureData sharedInstance] disableAutoAppendAdvertisingIdentifier];
}

#pragma mark - Session

- (void)startSession:(CDVInvokedUrlCommand *)command
{
    NSString *table = [self getStringArg:command atIndex:0];
    NSString *database = [self getStringArg:command atIndex:1];

    if (database == nil) {
        [[TreasureData sharedInstance] startSession:table];
    } else {
        [[TreasureData sharedInstance] startSession:table database:database];
    }
}

- (void)endSession:(CDVInvokedUrlCommand *)command
{
    NSString *table = [self getStringArg:command atIndex:0];
    NSString *database = [self getStringArg:command atIndex:1];

    if (database == nil) {
        [[TreasureData sharedInstance] endSession:table];
    } else {
        [[TreasureData sharedInstance] endSession:table database:database];
    }
}

- (void)getSessionId:(CDVInvokedUrlCommand *)command
{
    NSString *sessionId = [[TreasureData sharedInstance] getSessionId];
    [self sendStringResult:command string:sessionId];
}

- (void)startGlobalSession:(CDVInvokedUrlCommand *)command
{
    [TreasureData startSession];
}

- (void)endGlobalSession:(CDVInvokedUrlCommand *)command
{
    [TreasureData endSession];
}

- (void)setGlobalSessionTimeoutMilli:(CDVInvokedUrlCommand *)command
{
    NSNumber *to = [command.arguments objectAtIndex:0];
    [TreasureData setSessionTimeoutMilli:to.doubleValue];
}

- (void)getGlobalSessionId:(CDVInvokedUrlCommand *)command
{
    NSString *sessionId = [TreasureData getSessionId];
    [self sendStringResult:command string:sessionId];
}

#pragma mark - Automatically tracked events

#pragma mark Custom Event

- (void)enableCustomEvent:(CDVInvokedUrlCommand *)command
{
    [[TreasureData sharedInstance] enableCustomEvent];
}

- (void)disableCustomEvent:(CDVInvokedUrlCommand *)command
{
    [[TreasureData sharedInstance] disableCustomEvent];
}

- (void)isCustomEventEnabled:(CDVInvokedUrlCommand *)command
{
    BOOL isCustomEventEnabled = [[TreasureData sharedInstance] isCustomEventEnabled];
    [self sendBoolResult:command boolValue:isCustomEventEnabled];
}

#pragma mark App Lifecycle Event

- (void)enableAppLifecycleEvent:(CDVInvokedUrlCommand *)command
{
    [[TreasureData sharedInstance] enableAppLifecycleEvent];
}

- (void)disableAppLifecycleEvent:(CDVInvokedUrlCommand *)command
{
    [[TreasureData sharedInstance] disableAppLifecycleEvent];
}

- (void)isAppLifecycleEventEnabled:(CDVInvokedUrlCommand *)command
{
    BOOL isAppLifecycleEventEnabled = [[TreasureData sharedInstance] isAppLifecycleEventEnabled];
    [self sendBoolResult:command boolValue:isAppLifecycleEventEnabled];
}

#pragma mark In App Purchase Event

- (void)enableInAppPurchaseEvent:(CDVInvokedUrlCommand *)command
{
    [[TreasureData sharedInstance] enableInAppPurchaseEvent];
}

- (void)disableInAppPurchaseEvent:(CDVInvokedUrlCommand *)command
{
    [[TreasureData sharedInstance] disableInAppPurchaseEvent];
}

- (void)isInAppPurchaseEventEnabled:(CDVInvokedUrlCommand *)command
{
    BOOL isInAppPurchaseEventEnabled = [[TreasureData sharedInstance] isInAppPurchaseEventEnabled];
    [self sendBoolResult:command boolValue:isInAppPurchaseEventEnabled];
}

#pragma mark - Profile API

- (void)fetchUserSegments:(CDVInvokedUrlCommand *)command
{
    NSArray *audienceTokens = [command.arguments objectAtIndex:0];
    NSDictionary *keys = [command.arguments objectAtIndex:1];

    [[TreasureData sharedInstance] fetchUserSegments:audienceTokens keys:keys options:nil completionHandler:^(NSArray * _Nullable jsonResponse, NSError * _Nullable error) {
        if (jsonResponse != nil) {
            [self sendArrayResult:command array:jsonResponse];
        } else if (error != nil) {
            NSString *errorCode = [NSString stringWithFormat:@"%li", (long)error.code];
            [self sendErrorMessageResult:command code:errorCode message:error.localizedDescription];
        }
    }];
}

#pragma mark - Misc.

#pragma mark Retry uploading

- (void)enableRetryUploading:(CDVInvokedUrlCommand *)command
{
    [[TreasureData sharedInstance] enableRetryUploading];
}

- (void)disableRetryUploading:(CDVInvokedUrlCommand *)command
{
    [[TreasureData sharedInstance] disableRetryUploading];
}

#pragma mark Event Compression

- (void)enableEventCompression:(CDVInvokedUrlCommand *)command
{
    [TreasureData enableEventCompression];
}

- (void)disableEventCompression:(CDVInvokedUrlCommand *)command
{
    [TreasureData disableEventCompression];
}

#pragma mark Logging

- (void)enableLogging:(CDVInvokedUrlCommand *)command
{
    [TreasureData enableLogging];
}

- (void)disableLogging:(CDVInvokedUrlCommand *)command
{
    [TreasureData disableLogging];
}

#pragma mark First Run

- (void)isFirstRun:(CDVInvokedUrlCommand *)command
{
    BOOL isFirstRun = [[TreasureData sharedInstance] isFirstRun];
    [self sendBoolResult:command boolValue:isFirstRun];
}

- (void)clearFirstRun:(CDVInvokedUrlCommand *)command
{
    [[TreasureData sharedInstance] clearFirstRun];
}

@end
