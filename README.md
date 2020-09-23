# Treasure Data Android and iOS SDKs Cordova Plugin
td-cordova-sdk module that uses native iOS and Android SDK underneath to provide Treasure Data Mobile SDK features for cordova apps.

You can see more detailed documentation in repositories for [td-android-sdk](https://github.com/treasure-data/td-android-sdk) and [td-ios-sdk](https://github.com/treasure-data/td-ios-sdk)

## Getting started
```
cordova plugin add td-cordova-sdk
```

## Usage

After installing the plugin, you can access the methods through `cordova.plugins.TreasureDataPlugin` namespace.

## Configuration
```javascript
TreasureDataPlugin.setup({
  apiEndpoint: 'https://in.treasure-data.com', // Or other supported endpoints
  encryptionKey: 'xxxxx',
  apiKey: 'xxxxx', /// You should use write only api key
  defaultDatabase: 'default_database',
  defaultTable: 'default_table_name',
  cdpEndpoint: 'https://cdp.in.treasuredata.com' // Or other cdp endpoints
})
```

## Add an event to local buffer
You can add custom events to a specific database and table. If database param is not specified, `defaultDatabase` configuration in `TreasureDataPlugin.setup({...})` will be used instead.
Specify the database and table to which you want to import the events. The total length of database and table must be shorter than 129 characters.
```javascript
const customEvent = {event: 'Custom event', data: new Date().getSeconds()};
TreasureDataPlugin.addEvent(customEvent, 'table', 'database');
// or
TreasureDataPlugin.addEvent(customEvent, 'table');
```

Or if you need to know when `addEvent` is successful or has failed, use `addEventWithCallback` instead. You can pass `null` or `undefined` as database param and `defaultDatabase` configuration in `TreasureDataPlugin.setup({...})` will be used instead.
```javascript
const customEvent = {event: 'Custom event', data: new Date().getSeconds()};
TreasureDataPlugin.addEventWithCallback(customEvent, 'table', 'database', () => {
  console.log('Add Event Successfully');
}, (errorCode, errorMessage) => {
  console.log('Add Event Failed', errorCode, errorMessage);
});
```

## Upload buffered events to TreasureData
You can upload all buffered events to Treasure Data at anytime with `uploadEvent` function
```javascript
TreasureDataPlugin.uploadEvents();
```

Or if you need to know when `uploadEvents` is successful or has failed, use `uploadEventsWithCallback` instead.
```javascript
TreasureDataPlugin.uploadEventsWithCallback(() => {
  console.log('Upload events successfully')
}, (errorCode, errorMessage) => {
  console.log('Failed to upload events', errorCode, errorMessage);
});
```

## Custom Events
Add and upload custom events are enabled by default. However you can disable and enable this feature at any time using:
```javascript
TreasureDataPlugin.enableCustomEvent();
```
To disable custom events
```javascript
TreasureDataPlugin.disableCustomEvent();
```

## (Android only) Track app lifecycle events automatically
This feature is only available in Android. App lifecycle event tracking is optional and not enable by default. You can track app lifecycle events automatically using:
```javascript
TreasureDataPlugin.enableAppLifecycleEvent();
```
To disable tracking app lifecycle events:
```javascript
TreasureDataPlugin.disableAppLifecycleEvent();
```
To check if tracking app lifecycle events is enabled:
```javascript
TreasureDataPlugin.isAppLifecycleEventEnabled((enabled) => {
  console.log('Tracking app lifecycle event is enabled?', enabled ? 'yes' : 'no');
})
```

## Track in app purchase events automatically
You don't need to check for platform when calling this feature's APIs, they will simply be no-op.
In app purchase event tracking is optional and not enable by default. To track in app purchase events automatically, you only need to add a line of code:
```javascript
TreasureDataPlugin.enableInAppPurchaseEvent();
```
To disable tracking in app purchase events:
```javascript
TreasureDataPlugin.disableInAppPurchaseEvent();
```
To check if tracking in app purchase events is enabled:
```javascript
TreasureDataPlugin.isInAppPurchaseEventEnabled((enabled) => {
  console.log('Tracking in app purchase event is enabled?', enabled ? 'yes' : 'no');
})
```

## Adding UUID of the device to each event automatically
UUID of the device will be added to each event automatically if you call `TreasureDataPlugin.enableAutoAppendUniqId()`. This value won't change until the application is uninstalled.
```javascript
TreasureDataPlugin.enableAutoAppendUniqId();
```
To disable adding UUID of device to each event automatically:
```javascript
TreasureDataPlugin.disableAutoAppendUniqId();
```
To reset UUID of device
```javascript
TreasureDataPlugin.resetUniqId();
```

## Adding an UUID to each event record automatically
UUID will be added to each event record automatically if you call `enableAutoAppendRecordUUID`. Each event has different UUID.
```javascript
TreasureDataPlugin.enableAutoAppendRecordUUID();
```
To disable adding record UUID to each event automatically:
```javascript
TreasureDataPlugin.disableAutoAppendRecordUUID();
```

## Adding Advertising Id to each event record automatically
Advertising Id will be added to each event record automatically if you call `enableAutoAppendAdvertisingIdentifier`.

In Android, you must install Google Play Service Ads (Gradle `com.google.android.gms:play-services-ads`) as a dependency for this feature to work.

In iOS, you must link Ad Support framework in Link Binary With Libraries build phase for this feature to work.

User must also not turn on Limit Ad Tracking feature in their device, otherwise, Treasure Data will not attach Advertising Id to the record. Due to asynchronous nature of getting Advertising Id, after `enableAutoAppendAdvertisingIdentifier` method called, it may take some time for Advertising Id to be available to be added to the record. However, Treasure Data does cache the Advertising Id in order to add to the next event without having to wait for the fetch Advertising Id task to complete.
```javascript
TreasureDataPlugin.enableAutoAppendAdvertisingIdentifier();
// Or specify custom column
TreasureDataPlugin.enableAutoAppendAdvertisingIdentifier('custom_aaid_column');
```
To disable adding Advertising Id:
```javascript
TreasureDataPlugin.disableAutoAppendAdvertisingIdentifier();
```

## Adding device model information to each event automatically
To add device model information to each event automatically
```javascript
TreasureDataPlugin.enableAutoAppendModelInformation();
```
To disable:
```javascript
TreasureDataPlugin.disableAutoAppendModelInformation();
```

## Adding application package version information to each event automatically
To add application version information to each event automatically
```javascript
TreasureDataPlugin.enableAutoAppendAppInformation();
```
To disable:
```javascript
TreasureDataPlugin.disableAutoAppendAppInformation();
```

## Adding locale configuration information to each event automatically
To add locale configuration information to each event automatically
```javascript
TreasureDataPlugin.enableAutoAppendLocaleInformation();
```
To disable:
```javascript
TreasureDataPlugin.disableAutoAppendLocaleInformation();
```

## Use server side upload timestamp
To use server side upload timestamp not only client device time that is recorded when your application calls addEvent
```javascript
TreasureDataPlugin.enableServerSideUploadTimestamp();
// Or specify custom column
TreasureDataPlugin.enableServerSideUploadTimestamp('custom_servier_side_upload_timestamp_column');
```
To disable:
```javascript
TreasureDataPlugin.disableServerSideUploadTimestamp();
```

## Start/End session
Call `startSession` to start tracking a session
```javascript
TreasureDataPlugin.startSession(sessionTable, sessionDatabase);
```
Call `endSession` to end tracking current session
```javascript
TreasureDataPlugin.endSession(sessionTable, sessionDatabase);
```

## Profile API
This feature is not enabled on accounts by default, please contact support for more information. Important! You must set cdpEndpoint property of TreasureData's sharedInstance. Usage example:

```javascript
var plugin = cordova.plugins.TreasureDataPlugin;
function success(response) {
  /* response format => [
    {
      "segments": ["segment_id"],
      "attributes": {
        "age": ##,
        "td_client_id": "xxxxxxxxxxxxx"
      },
      "audienceId": "audience_id",
      "key": { "name": "user_id", "value": "xxxxxxx" }
    },
    {
      "segments": ["segment_id", "segment_id"],
      "attributes": {
        "im_segments": "xxxxxxxxxxxx",
        "work_style_per_family": "xxxxxxxx"
      },
      "audienceId": "audience_id",
      "key": {
        "name": "td_client_id",
        "value": "xxxxxxxxxxxxx"
      }
    }
  ] */

  // yay
}

function error() {
  // nay
}

plugin.fetchUserSegments(
  ["audience_id","audience_id"],
  {
    user_id: "xxxxx",
    td_client_id: "xxxxx"
  },
  success,
  error
);
```

## Enable/Disable debug log
To enable debug log
```javascript
TreasureDataPlugin.enableLogging();
```
To disable:
```javascript
TreasureDataPlugin.disableLogging();
```

## Enable/Disable retry uploading
To enable retry uploading
```javascript
TreasureDataPlugin.enableRetryUploading();
```
To disable:
```javascript
TreasureDataPlugin.disableRetryUploading();
```

## Device and OS support
See native SDKs repository for more information about supported devices and OS

## Support
Need a hand with something? Shoot us an email at [support@treasuredata.com](mailto:support@treasuredata.com)
