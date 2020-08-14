#import <Cordova/CDVPlugin.h>

@interface TreasureDataPlugin: CDVPlugin

#pragma mark - Set up

- (void)setup:(CDVInvokedUrlCommand*)command;

#pragma mark - Add Event

- (void)addEvent:(CDVInvokedUrlCommand*)command;
- (void)addEventWithCallback:(CDVInvokedUrlCommand*)command;

#pragma mark - Upload Events

- (void)uploadEvents:(CDVInvokedUrlCommand*)command;
- (void)uploadEventsWithCallback:(CDVInvokedUrlCommand*)command;

#pragma mark - UUID

- (void)getUUID:(CDVInvokedUrlCommand*)command;
- (void)enableAutoAppendUniqId:(CDVInvokedUrlCommand *)command;
- (void)disableAutoAppendUniqId:(CDVInvokedUrlCommand *)command;
- (void)resetUniqId:(CDVInvokedUrlCommand *)command;

#pragma mark - Auto Append Model Information

- (void)enableAutoAppendModelInformation:(CDVInvokedUrlCommand *)command;
- (void)disableAutoAppendModelInformation:(CDVInvokedUrlCommand *)command;

#pragma mark - Auto Append App Information

- (void)enableAutoAppendAppInformation:(CDVInvokedUrlCommand *)command;
- (void)disableAutoAppendAppInformation:(CDVInvokedUrlCommand *)command;

#pragma mark - Auto Append Local Information

- (void)enableAutoAppendLocaleInformation:(CDVInvokedUrlCommand *)command;
- (void)disableAutoAppendLocaleInformation:(CDVInvokedUrlCommand *)command;

#pragma mark - Server Side Upload Timestamp

- (void)enableServerSideUploadTimestamp:(CDVInvokedUrlCommand *)command;
- (void)disableServerSideUploadTimestamp:(CDVInvokedUrlCommand *)command;

#pragma mark - Auto Append Record UUID

- (void)enableAutoAppendRecordUUID:(CDVInvokedUrlCommand *)command;
- (void)disableAutoAppendRecordUUID:(CDVInvokedUrlCommand *)command;

#pragma mark - Auto Append Advertising Identifier

- (void)enableAutoAppendAdvertisingIdentifier:(CDVInvokedUrlCommand *)command;
- (void)disableAutoAppendAdvertisingIdentifier:(CDVInvokedUrlCommand *)command;

#pragma mark - Session

- (void)startSession:(CDVInvokedUrlCommand *)command;
- (void)endSession:(CDVInvokedUrlCommand *)command;
- (void)getSessionId:(CDVInvokedUrlCommand *)command;
- (void)startGlobalSession:(CDVInvokedUrlCommand *)command;
- (void)endGlobalSession:(CDVInvokedUrlCommand *)command;
- (void)setGlobalSessionTimeoutMilli:(CDVInvokedUrlCommand *)command;
- (void)getGlobalSessionId:(CDVInvokedUrlCommand *)command;

#pragma mark - Automatically tracked events

#pragma mark Custom Event

- (void)enableCustomEvent:(CDVInvokedUrlCommand *)command;
- (void)disableCustomEvent:(CDVInvokedUrlCommand *)command;
- (void)isCustomEventEnabled:(CDVInvokedUrlCommand *)command;

#pragma mark App Lifecycle Event

- (void)enableAppLifecycleEvent:(CDVInvokedUrlCommand *)command;
- (void)disableAppLifecycleEvent:(CDVInvokedUrlCommand *)command;
- (void)isAppLifecycleEventEnabled:(CDVInvokedUrlCommand *)command;

#pragma mark In App Purchase Event

- (void)enableInAppPurchaseEvent:(CDVInvokedUrlCommand *)command;
- (void)disableInAppPurchaseEvent:(CDVInvokedUrlCommand *)command;
- (void)isInAppPurchaseEventEnabled:(CDVInvokedUrlCommand *)command;

#pragma mark - Profile API

- (void)fetchUserSegments:(CDVInvokedUrlCommand *)command;

#pragma mark - Misc.

#pragma mark Retry uploading

- (void)enableRetryUploading:(CDVInvokedUrlCommand *)command;
- (void)disableRetryUploading:(CDVInvokedUrlCommand *)command;

#pragma mark Event Compression

- (void)enableEventCompression:(CDVInvokedUrlCommand *)command;
- (void)disableEventCompression:(CDVInvokedUrlCommand *)command;

#pragma mark Logging

- (void)enableLogging:(CDVInvokedUrlCommand *)command;
- (void)disableLogging:(CDVInvokedUrlCommand *)command;

#pragma mark First Run

- (void)isFirstRun:(CDVInvokedUrlCommand *)command;
- (void)clearFirstRun:(CDVInvokedUrlCommand *)command;

@end
