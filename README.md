# Treasure Data Android and iOS SDKs Cordova Plugin
Cordova plugin for [td-android-sdk](https://github.com/treasure-data/td-android-sdk) and [td-ios-sdk](https://github.com/treasure-data/td-ios-sdk)

## Installation
```
cordova plugin add <plugin or github repo>
```

## Methods
After installing the plugin, you can access the methods through `cordova.plugins.TreasureDataPlugin` namespace.

### Common
---
### TreasureDataPlugin#setup(options)
Setup an instance

**Parameters:**

- **options:** Object (required) - instance configuration

**Options:**
```javascript
{
  apiEndpoint: "https://xxxx",
  encryptionKey: "xxxx",
  apiKey: "1/xxxxxxxxxxxxxxxxxxx",
  defaultDatabase: "xxxx",
  defaultTable: "xxxx",
  cdpEndpoint: "https://xxxx",
}
```
**Example:**

```javascript
var plugin = cordova.plugins.TreasureDataPlugin;
plugin.setup({
  apiEndpoint: 'https://in.treasuredata.com',
  apiKey: '1/xxxxxxxxxxxxxxxxxxx',
  defaultDatabase: 'defaultDatabase',
  defaultTable: 'defaultTable',
  cdpEndpoint: 'https://cdp.in.treasuredata.com'
});
```

### TreasureDataPlugin#addEvent(event, table, database)
Add an event to local buffer

**Parameters:**
- **event:** Object (required) - data object
- **table:** String (required) - table name
- **database:** String (optional) - database name

**Examples:**

```javascript
var plugin = cordova.plugins.TreasureDataPlugin;
plugin.addEvent(
  {
    cordova_val1: 'value1_with_cb',
    cordova_val2: 'value2_with_cb'
  },
  'cordova_test',
  '_a_database'
);
```
### TreasureDataPlugin#addEventWithCallback(event, table, database, success, error)
Add an event to local buffer

**Parameters:**
- **event:** Object (required) - data object
- **table:** String (required) - table name
- **database:** String (optional) - database name
- **success:** Function (optional) - successful callback
- **error:** Function (optional) - error callback

**Examples:**

```javascript
var plugin = cordova.plugins.TreasureDataPlugin;

function success() {
  // yay
}

function error() {
  // nay
}

plugin.addEventWithCallback(
  {
    cordova_val1: 'value1_with_cb',
    cordova_val2: 'value2_with_cb'
  },
  'cordova_test',
  '_a_database',
  success,
  error
);
```
### TreasureDataPlugin#uploadEvents()
Upload queued events to server

```javascript
var plugin = cordova.plugins.TreasureDataPlugin;
plugin.uploadEvents()
```

### TreasureDataPlugin#uploadEventsWithCallback(success, error)
Upload queued events to server

**Parameters:**

- **success:** Function (optional) - successful callback
- **error:** Function (optional) - error callback

```javascript
var plugin = cordova.plugins.TreasureDataPlugin;
function success() {
  // yay
}

function error() {
  // nay
}

plugin.uploadEvents(success, error)
```
### TreasureDataPlugin#fetchUserSegments(audienceTokens, keys, success, error)

Lookup for profiles via [Profile API](https://support.treasuredata.com/hc/en-us/sections/360000271688-Profiles-API)

**Parameters:**

- **audienceTokens:** Array (required) - audience ids
- **keys:** Object (required) - key columns
- **success:** Function (optional) - successful callback
- **error:** Function (optional) - error callback

**Examples:**
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
### Life cycle
---
### TreasureDataPlugin#enableAppLifecycleEvent()
### TreasureDataPlugin#disableAppLifecycleEvent()
### TreasureDataPlugin#isAppLifecycleEventEnabled(success)

**Parameters:**

- **success:** Function (optional) - successful callback

**Example:**
```javascript
var plugin = cordova.plugins.TreasureDataPlugin;
plugin.isAppLifecycleEventEnabled(function(yes) {
  // yes = 1 or 0
})
```
### Session
---
### TreasureDataPlugin#getSessionId(success)
**Parameters:**

- **success:** Function (optional) - successful callback

**Example:**
```javascript
var plugin = cordova.plugins.TreasureDataPlugin;
plugin.getSessionId(function(sessionId) {
  // yay()
});
```
### TreasureDataPlugin#setSessionTimeoutMilli(timeout)

**Parameters:**

- **timeout:** Number (required) - timeout in milliseconds

**Example:**
```javascript
var plugin = cordova.plugins.TreasureDataPlugin;
plugin.setSessionTimeoutMilli(1000);
```

### TreasureDataPlugin#setGlobalSessionTimeoutMilli(timeout)

**Parameters:**

- **timeout:** Number (required) - timeout in milliseconds

**Example:**
```javascript
var plugin = cordova.plugins.TreasureDataPlugin;
plugin.setGlobalSessionTimeoutMilli(1000);
```

### TreasureDataPlugin#startGlobalSession()
### TreasureDataPlugin#endGlobalSession()

### TreasureDataPlugin#getGlobalSessionId(success)
**Parameters:**

- **success:** Function (optional) - successful callback

**Example:**
```javascript
var plugin = cordova.plugins.TreasureDataPlugin;
plugin.getGlobalSessionId(function(globalSessionId) {
  // yay()
});
```

### TreasureDataPlugin#startSession(table, database)
**Parameters:**

- **table:** String (required) - table name
- **database:** String (optional) - database name

**Example:**
```javascript
var plugin = cordova.plugins.TreasureDataPlugin;
plugin.startSession("table_name", "database");
```

### TreasureDataPlugin#endSession(table, database)
**Parameters:**

- **table:** String (required) - table name
- **database:** String (optional) - database name

**Example:**
```javascript
var plugin = cordova.plugins.TreasureDataPlugin;
plugin.endSession("table_name", "database");
```

### In app purchase
---
### TreasureDataPlugin#enableInAppPurchaseEvent()
### TreasureDataPlugin#disableInAppPurchaseEvent()
### TreasureDataPlugin#isInAppPurchaseEventEnabled(success)
**Parameters:**

- **success:** Function (optional) - successful callback

**Example:**
```javascript
var plugin = cordova.plugins.TreasureDataPlugin;
plugin.isCustomEventEnabled(function(yes) {
  // yes = 1 or 0
});
```

### Custom event
---
### TreasureDataPlugin#enableCustomEvent()
### TreasureDataPlugin#disableCustomEvent()
### TreasureDataPlugin#isCustomEventEnable(success)
**Parameters:**

- **success:** Function (optional) - successful callback

**Example:**
```javascript
var plugin = cordova.plugins.TreasureDataPlugin;
plugin.isCustomEventEnabled(function(yes) {
  // yes = 1 or 0
});
```

### Others
---
### TreasureDataPlugin#enableAutoAppendUniqId()
### TreasureDataPlugin#disableAutoAppendUniqId()
### TreasureDataPlugin#resetUniqId()
### TreasureDataPlugin#enableAutoAppendAppInformation()
### TreasureDataPlugin#disableAutoAppendAppInformation()
### TreasureDataPlugin#enableAutoAppendModelInformation()
### TreasureDataPlugin#disableAutoAppendModelInformation()
### TreasureDataPlugin#enableAutoAppendLocaleInformation()
### TreasureDataPlugin#disableAutoAppendLocaleInformation()
### TreasureDataPlugin#enableServerSideUploadTimestamp(columnName)
### TreasureDataPlugin#disableServerSideUploadTimestamp()
### TreasureDataPlugin#enableAutoAppendRecordUUID(columnName)
### TreasureDataPlugin#disableAutoAppendRecordUUID()
### TreasureDataPlugin#enableAutoAppendAdvertisingIdentifier(columnName)
### TreasureDataPlugin#disableAutoAppendAdvertisingIdentifier()

### TreasureDataPlugin#disableAppInstalledEvent()
### TreasureDataPlugin#disableAppOpenEvent()
### TreasureDataPlugin#disableAppUpdatedEvent()
### TreasureDataPlugin#enableRetryUploading()
### TreasureDataPlugin#disableRetryUploading()
### TreasureDataPlugin#enableEventCompression()
### TreasureDataPlugin#disableEventCompression()
### TreasureDataPlugin#enableLogging()
### TreasureDataPlugin#disableLogging()
### TreasureDataPlugin#isFirstRun(success)
**Parameters:**

- **success:** Function (optional) - successful callback

**Example:**
```javascript
var plugin = cordova.plugins.TreasureDataPlugin;
plugin.isFirstRun(function(yes) {
  // yes = 1 or 0
});
```
### TreasureDataPlugin#clearFirstRun()
### TreasureDataPlugin#getUUID(success)
**Parameters:**

- **success:** Function (optional) - successful callback

**Example:**
```javascript
var plugin = cordova.plugins.TreasureDataPlugin;
plugin.getUUID(function(uuid) {
  // yay()
});
```
## Support
Need a hand with something? Shoot us an email at [support@treasuredata.com](mailto:support@treasuredata.com)
