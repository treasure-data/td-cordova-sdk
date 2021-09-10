## Functions

<table>
  <thead>
    <tr>
      <th>Global</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td><a href="#setup">setup(apiEndpoint, apiKey, defaultDatabase, defaultTable, [cdpEndpoint], [encryptionKey])</a></td>
    <td><p>Configure the Treasure Data object.</p>
</td>
        </tr>
<tr>
    <td><a href="#addEvent">addEvent(event, table, database)</a></td>
    <td><p>Add an event to a local buffer.</p>
</td>
        </tr>
<tr>
    <td><a href="#uploadEvents">uploadEvents()</a></td>
    <td><p>Upload buffered events to Treasure Data.
This function can be called at any time.</p>
</td>
        </tr>
<tr>
    <td><a href="#addEventWithCallback">addEventWithCallback(event, table, database, success, error)</a></td>
    <td><p>Add an event to a local buffer. Use a callback function to certify success / failure.</p>
</td>
        </tr>
<tr>
    <td><a href="#uploadEventsWithCallback">uploadEventsWithCallback(success, error)</a></td>
    <td><p>Upload buffered events to Treasure Data.
If you need to know when uploadEvents is successful or has failed, use uploadEventsWithCallback.</p>
</td>
        </tr>
<tr>
    <td><a href="#enableAppLifecycleEvent">enableAppLifecycleEvent()</a></td>
    <td><p><strong>Android Only function.</strong>
App lifecycle event tracking is optional and not enabled by default. 
Enable automatic app lifecycle event tracking.</p>
</td>
        </tr>
<tr>
    <td><a href="#disableAppLifecycleEvent">disableAppLifecycleEvent()</a></td>
    <td><p><strong>Android Only function.</strong>
Disable tracking app lifecycle events.</p>
</td>
        </tr>
<tr>
    <td><a href="#isAppLifecycleEventEnabled">isAppLifecycleEventEnabled(success)</a></td>
    <td><p><strong>Android Only function.</strong>
Check if app lifecycle event tracking is enabled.</p>
</td>
        </tr>
<tr>
    <td><a href="#enableAutoAppendUniqId">enableAutoAppendUniqId()</a></td>
    <td><p>Automatically add the UUID of the device to each event.
This value won&#39;t change until the application is uninstalled.</p>
</td>
        </tr>
<tr>
    <td><a href="#disableAutoAppendUniqId">disableAutoAppendUniqId()</a></td>
    <td><p>Disable adding the UUID of the device to each event automatically.</p>
</td>
        </tr>
<tr>
    <td><a href="#resetUniqId">resetUniqId()</a></td>
    <td><p>Reset the UUID of the device.</p>
</td>
        </tr>
<tr>
    <td><a href="#enableAutoAppendAppInformation">enableAutoAppendAppInformation()</a></td>
    <td><p>Enable adding application package version information to each event automatically.</p>
</td>
        </tr>
<tr>
    <td><a href="#disableAutoAppendAppInformation">disableAutoAppendAppInformation()</a></td>
    <td><p>Disable adding application package version information to each event automatically.</p>
</td>
        </tr>
<tr>
    <td><a href="#enableAutoAppendModelInformation">enableAutoAppendModelInformation()</a></td>
    <td><p>Enable adding device model information to each event automatically.</p>
</td>
        </tr>
<tr>
    <td><a href="#disableAutoAppendModelInformation">disableAutoAppendModelInformation()</a></td>
    <td><p>Disable adding device model information to each event automatically.</p>
</td>
        </tr>
<tr>
    <td><a href="#enableAutoAppendLocaleInformation">enableAutoAppendLocaleInformation()</a></td>
    <td><p>Enable adding locale configuration information to each event automatically.</p>
</td>
        </tr>
<tr>
    <td><a href="#disableAutoAppendLocaleInformation">disableAutoAppendLocaleInformation()</a></td>
    <td><p>Disable adding locale configuration information to each event automatically.</p>
</td>
        </tr>
<tr>
    <td><a href="#enableServerSideUploadTimestamp">enableServerSideUploadTimestamp([columnName])</a></td>
    <td><p>To use server side upload timestamp in addition to the client device time that is recorded when your application calls addEvent.</p>
</td>
        </tr>
<tr>
    <td><a href="#disableServerSideUploadTimestamp">disableServerSideUploadTimestamp()</a></td>
    <td><p>Disable server side upload timestamp.</p>
</td>
        </tr>
<tr>
    <td><a href="#enableAutoAppendRecordUUID">enableAutoAppendRecordUUID()</a></td>
    <td><p>Automatically add a UUID to each event record.
Each event will have a different UUID.</p>
</td>
        </tr>
<tr>
    <td><a href="#disableAutoAppendRecordUUID">disableAutoAppendRecordUUID()</a></td>
    <td><p>Disable automatically adding a UUID to each event record.</p>
</td>
        </tr>
<tr>
    <td><a href="#enableAutoAppendAdvertisingIdentifier">enableAutoAppendAdvertisingIdentifier([columnName])</a></td>
    <td><p>Advertising ID will be added to each event record automatically.</p>
</td>
    </tr>
<tr>
    <td><a href="#disableAutoAppendAdvertisingIdentifier">disableAutoAppendAdvertisingIdentifier()</a></td>
    <td><p>Disable adding Advertising Id.</p>
</td>
        </tr>
<tr>
    <td><a href="#getSessionId">getSessionId(success)</a></td>
    <td><p>Get current session ID.</p>
</td>
        </tr>
<tr>
    <td><a href="#setSessionTimeoutMilli">setSessionTimeoutMilli(timeout)</a></td>
    <td><p>Set the session timeout in milliseconds.</p>
</td>
    </tr>
<tr>
    <td><a href="#setGlobalSessionTimeoutMilli">setGlobalSessionTimeoutMilli(timeout)</a></td>
    <td><p>Set the global session timeout in milliseconds.</p>
</td>
        </tr>
<tr>
    <td><a href="#startGlobalSession">startGlobalSession()</a></td>
    <td><p>Start tracking a global session.</p>
</td>
        </tr>
<tr>
    <td><a href="#endGlobalSession">endGlobalSession()</a></td>
    <td><p>End tracking a global session.</p>
</td>
        </tr>
<tr>
    <td><a href="#getGlobalSessionId">getGlobalSessionId(success)</a></td>
    <td><p>Get the current global session ID.</p>
</td>
        </tr>
<tr>
    <td><a href="#startSession">startSession(sessionTable, sessionDatabase)</a></td>
    <td><p>Start tracking a session.</p>
</td>
        </tr>
<tr>
    <td><a href="#endSession">endSession(sessionTable, sessionDatabase)</a></td>
    <td><p>Stop tracking the current session.</p>
</td>
        </tr>
<tr>
    <td><a href="#enableCustomEvent">enableCustomEvent()</a></td>
    <td><p>Custom events are enabled by default.</p>
</td>
    </tr>
<tr>
    <td><a href="#disableCustomEvent">disableCustomEvent()</a></td>
    <td><p>Use this function to optionally disable custom events.</p>
</td>
    </tr>
<tr>
    <td><a href="#isCustomEventEnabled">isCustomEventEnabled(success)</a></td>
    <td><p>Whether or not the custom event tracking is enabled.</p>
</td>
        </tr>
<tr>
    <td><a href="#enableInAppPurchaseEvent">enableInAppPurchaseEvent()</a></td>
    <td><p>Track in-app purchase events automatically.</p>
</td>
    </tr>
<tr>
    <td><a href="#disableInAppPurchaseEvent">disableInAppPurchaseEvent()</a></td>
    <td><p>Disable tracking in-app purchase events.</p>
</td>
        </tr>
<tr>
    <td><a href="#isInAppPurchaseEventEnabled">isInAppPurchaseEventEnabled(enabled)</a></td>
    <td><p>Check if tracking in-app purchase events is enabled.</p>
</td>
        </tr>
<tr>
    <td><a href="#disableAppInstalledEvent">disableAppInstalledEvent()</a></td>
    <td><p>Disable automatic tracking of the event when app is installed.</p>
</td>
        </tr>
<tr>
    <td><a href="#disableAppOpenEvent">disableAppOpenEvent()</a></td>
    <td><p>Disable automatic tracking of the event when app is opened.</p>
</td>
        </tr>
<tr>
    <td><a href="#disableAppUpdatedEvent">disableAppUpdatedEvent()</a></td>
    <td><p>Disable automatic tracking of the event when app is updated.</p>
</td>
        </tr>
<tr>
    <td><a href="#enableRetryUploading">enableRetryUploading()</a></td>
    <td><p>Enable retry uploading.</p>
</td>
        </tr>
<tr>
    <td><a href="#disableRetryUploading">disableRetryUploading()</a></td>
    <td><p>Disable retry uploading.</p>
</td>
        </tr>
<tr>
    <td><a href="#enableEventCompression">enableEventCompression()</a></td>
    <td><p>Event data will be compressed before uploading to server.</p>
</td>
        </tr>
<tr>
    <td><a href="#disableEventCompression">disableEventCompression()</a></td>
    <td><p>Event data will be uploaded in the full uncompressed format.</p>
</td>
        </tr>
<tr>
    <td><a href="#enableLogging">enableLogging()</a></td>
    <td><p>Enable the debug log.</p>
</td>
        </tr>
<tr>
    <td><a href="#disableLogging">disableLogging()</a></td>
    <td><p>Disable the debug log.</p>
</td>
        </tr>
<tr>
    <td><a href="#isFirstRun">isFirstRun(success)</a></td>
    <td><p>Is this the first run, true/false.</p>
</td>
        </tr>
<tr>
    <td><a href="#clearFirstRun">clearFirstRun()</a></td>
    <td><p>Clear first run flag.</p>
</td>
        </tr>
<tr>
    <td><a href="#getUUID">getUUID(success)</a></td>
    <td><p>Get the UUID value assigned to every event as td_uuid by the enableAutoAppendUniqID function.</p>
</td>
    </tr>
<tr>
    <td><a href="#fetchUserSegments">fetchUserSegments(audienceTokens, keys, success, error)</a></td>
    <td><p>Profiles API.</p>
</td>
    </tr>
</tbody>
</table>

<a name="setup"></a>

## setup
`setup(apiEndpoint, apiKey, defaultDatabase, defaultTable, [cdpEndpoint], [encryptionKey])` <br /><br />
**Description:** <br />
Configure the Treasure Data object.


| Param | Type | Description |
| --- | --- | --- |
| apiEndpoint | <code>string</code> | Valid API endpoint for ingesting data. <br />[View full list of endpoints here.](https://docs.treasuredata.com/display/public/PD/Sites+and+Endpoints) |
| apiKey | <code>string</code> | Write only TD API Key |
| defaultDatabase | <code>string</code> | Database name in TD account |
| defaultTable | <code>string</code> | Table name in TD database |
| [cdpEndpoint] | <code>string</code> | Valid CDP endpoint for ingesting data. <br />[View full list of endpoints here.](https://docs.treasuredata.com/display/public/PD/Sites+and+Endpoints) |
| [encryptionKey] | <code>string</code> | Encryption key used to locally encrypt events when saved to device storage. This key will be used to generate an aes128 encryption key. Any string will work. |

**Example**  
```js
TreasureDataPlugin.setup({
  apiEndpoint: 'https://in.treasure-data.com', // Or other supported endpoints
  encryptionKey: 'xxxxx',
  apiKey: 'xxxxx', /// You should use write only api key
  defaultDatabase: 'default_database',
  defaultTable: 'default_table_name',
  cdpEndpoint: 'https://cdp.in.treasuredata.com' // Or other cdp endpoints
})
```

* * *

<a name="addEvent"></a>

## addEvent
`addEvent(event, table, database)` <br /><br />
**Description:** <br />
Add an event to a local buffer.


| Param | Type | Description |
| --- | --- | --- |
| event | <code>json</code> | JSON data to be uploded |
| table | <code>string</code> | Table name |
| database | <code>string</code> | Database name |

**Example**  
```js
const customEvent = {event: 'Custom event', data: new Date().getSeconds()};
TreasureDataPlugin.addEvent(customEvent, 'table', 'database');
// or
TreasureDataPlugin.addEvent(customEvent, 'table');
```
**See**: [addEventWithCallback](#addEventWithCallback)  

* * *

<a name="uploadEvents"></a>

## uploadEvents
`uploadEvents()` <br /><br />
**Description:** <br />
Upload buffered events to Treasure Data.
This function can be called at any time.

**Example**  
```js
TreasureDataPlugin.uploadEvents();
```
**See**: [uploadEventsWithCallback](#uploadEventsWithCallback)  

* * *

<a name="addEventWithCallback"></a>

## addEventWithCallback
`addEventWithCallback(event, table, database, success, error)` <br /><br />
**Description:** <br />
Add an event to a local buffer. Use a callback function to certify success / failure.


| Param | Type | Description |
| --- | --- | --- |
| event | <code>json</code> | Event data to be uploaded |
| table | <code>string</code> | Table name |
| database | <code>string</code> | Database name |
| success | <code>function</code> | Function to call when events uploaded successfully |
| error | <code>function</code> | Function to call when events failed to upload |

**Example**  
```js
const customEvent = {event: 'Custom event', data: new Date().getSeconds()};
TreasureDataPlugin.addEventWithCallback(customEvent, 'table', 'database', () => {
  console.log('Add Event Successfully');
}, (errorCode, errorMessage) => {
  console.log('Add Event Failed', errorCode, errorMessage);
});
```
**See**: [addEvent](#addEvent)  

* * *

<a name="uploadEventsWithCallback"></a>

## uploadEventsWithCallback
`uploadEventsWithCallback(success, error)` <br /><br />
**Description:** <br />
Upload buffered events to Treasure Data.
If you need to know when uploadEvents is successful or has failed, use uploadEventsWithCallback.


| Param | Type | Description |
| --- | --- | --- |
| success | <code>function</code> | Function to call when events uploaded successfully |
| error | <code>function</code> | Function to call when events failed to upload |

**Example**  
```js
TreasureDataPlugin.uploadEventsWithCallback(() => {
  console.log('Upload events successfully')
}, (errorCode, errorMessage) => {
  console.log('Failed to upload events', errorCode, errorMessage);
});
```
**See**: [uploadEvents](#uploadEvents)  

* * *

<a name="enableAppLifecycleEvent"></a>

## enableAppLifecycleEvent
`enableAppLifecycleEvent()` <br /><br />
**Description:** <br />
**Android Only function.**
App lifecycle event tracking is optional and not enabled by default. 
Enable automatic app lifecycle event tracking.

**Example**  
```js
TreasureDataPlugin.enableAppLifecycleEvent();
```
**See**

- [disableAppLifecycleEvent](#disableAppLifecycleEvent)
- [isAppLifecycleEventEnabled](#isAppLifecycleEventEnabled)


* * *

<a name="disableAppLifecycleEvent"></a>

## disableAppLifecycleEvent
`disableAppLifecycleEvent()` <br /><br />
**Description:** <br />
**Android Only function.**
Disable tracking app lifecycle events.

**Example**  
```js
TreasureDataPlugin.disableAppLifecycleEvent();
```
**See**

- [enableAppLifecycleEvent](#enableAppLifecycleEvent)
- [isAppLifecycleEventEnabled](#isAppLifecycleEventEnabled)


* * *

<a name="isAppLifecycleEventEnabled"></a>

## isAppLifecycleEventEnabled
`isAppLifecycleEventEnabled(success)` <br /><br />
**Description:** <br />
**Android Only function.**
Check if app lifecycle event tracking is enabled.


| Param | Type | Description |
| --- | --- | --- |
| success | <code>function</code> | Callback function to execute on success. |

**Example**  
```js
TreasureDataPlugin.isAppLifecycleEventEnabled((enabled) => {
  console.log('Tracking app lifecycle event is enabled?', enabled ? 'yes' : 'no');
})
```
**See**

- [enableAppLifecycleEvent](#enableAppLifecycleEvent)
- [disableAppLifecycleEvent](#disableAppLifecycleEvent)


* * *

<a name="enableAutoAppendUniqId"></a>

## enableAutoAppendUniqId
`enableAutoAppendUniqId()` <br /><br />
**Description:** <br />
Automatically add the UUID of the device to each event.
This value won't change until the application is uninstalled.

**Example**  
```js
TreasureDataPlugin.enableAutoAppendUniqId();
```
**See**

- [disableAutoAppendUniqId](#disableAutoAppendUniqId)
- [resetUniqId](#resetUniqId)


* * *

<a name="disableAutoAppendUniqId"></a>

## disableAutoAppendUniqId
`disableAutoAppendUniqId()` <br /><br />
**Description:** <br />
Disable adding the UUID of the device to each event automatically.

**Example**  
```js
TreasureDataPlugin.disableAutoAppendUniqId();
```
**See**

- [enableAutoAppendUniqId](#enableAutoAppendUniqId)
- [resetUniqId](#resetUniqId)


* * *

<a name="resetUniqId"></a>

## resetUniqId
`resetUniqId()` <br /><br />
**Description:** <br />
Reset the UUID of the device.

**Example**  
```js
TreasureDataPlugin.resetUniqId();
```
**See**

- enableAutoAppendUniqId
- disableAutoAppendUniqID


* * *

<a name="enableAutoAppendAppInformation"></a>

## enableAutoAppendAppInformation
`enableAutoAppendAppInformation()` <br /><br />
**Description:** <br />
Enable adding application package version information to each event automatically.

**Example**  
```js
TreasureDataPlugin.enableAutoAppendAppInformation();
```
**See**: [disableAutoAppendAppInformation](#disableAutoAppendAppInformation)  

* * *

<a name="disableAutoAppendAppInformation"></a>

## disableAutoAppendAppInformation
`disableAutoAppendAppInformation()` <br /><br />
**Description:** <br />
Disable adding application package version information to each event automatically.

**Example**  
```js
TreasureDataPlugin.disableAutoAppendAppInformation();
```
**See**: [enableAutoAppendAppInformation](#enableAutoAppendAppInformation)  

* * *

<a name="enableAutoAppendModelInformation"></a>

## enableAutoAppendModelInformation
`enableAutoAppendModelInformation()` <br /><br />
**Description:** <br />
Enable adding device model information to each event automatically.

**Example**  
```js
TreasureDataPlugin.enableAutoAppendModelInformation();
```
**See**: [disableAutoAppendModelInformation](#disableAutoAppendModelInformation)  

* * *

<a name="disableAutoAppendModelInformation"></a>

## disableAutoAppendModelInformation
`disableAutoAppendModelInformation()` <br /><br />
**Description:** <br />
Disable adding device model information to each event automatically.

**Example**  
```js
TreasureDataPlugin.disableAutoAppendModelInformation();
```
**See**: [enableAutoAppendModelInformation](#enableAutoAppendModelInformation)  

* * *

<a name="enableAutoAppendLocaleInformation"></a>

## enableAutoAppendLocaleInformation
`enableAutoAppendLocaleInformation()` <br /><br />
**Description:** <br />
Enable adding locale configuration information to each event automatically.

**Example**  
```js
TreasureDataPlugin.enableAutoAppendLocaleInformation();
```
**See**: [disableAutoAppendLocaleInformation](#disableAutoAppendLocaleInformation)  

* * *

<a name="disableAutoAppendLocaleInformation"></a>

## disableAutoAppendLocaleInformation
`disableAutoAppendLocaleInformation()` <br /><br />
**Description:** <br />
Disable adding locale configuration information to each event automatically.

**Example**  
```js
TreasureDataPlugin.disableAutoAppendLocaleInformation();
```
**See**: [enableAutoAppendLocaleInformation](#enableAutoAppendLocaleInformation)  

* * *

<a name="enableServerSideUploadTimestamp"></a>

## enableServerSideUploadTimestamp
`enableServerSideUploadTimestamp([columnName])` <br /><br />
**Description:** <br />
To use server side upload timestamp in addition to the client device time that is recorded when your application calls addEvent.


| Param | Type | Description |
| --- | --- | --- |
| [columnName] | <code>string</code> | Optionally include the column name to specify where to upload the timestamp to. |

**Example**  
```js
TreasureDataPlugin.enableServerSideUploadTimestamp();
// Or specify custom column
TreasureDataPlugin.enableServerSideUploadTimestamp('custom_servier_side_upload_timestamp_column');
```
**See**: [disableServerSideUploadTimestamp](#disableServerSideUploadTimestamp)  

* * *

<a name="disableServerSideUploadTimestamp"></a>

## disableServerSideUploadTimestamp
`disableServerSideUploadTimestamp()` <br /><br />
**Description:** <br />
Disable server side upload timestamp.

**Example**  
```js
TreasureDataPlugin.disableServerSideUploadTimestamp();
```
**See**: [enableServerSideUploadTimestamp](#enableServerSideUploadTimestamp)  

* * *

<a name="enableAutoAppendRecordUUID"></a>

## enableAutoAppendRecordUUID
`enableAutoAppendRecordUUID()` <br /><br />
**Description:** <br />
Automatically add a UUID to each event record.
Each event will have a different UUID.

**Example**  
```js
TreasureDataPlugin.enableAutoAppendRecordUUID();
```
**See**: [disableAutoAppendRecordUUID](#disableAutoAppendRecordUUID)  

* * *

<a name="disableAutoAppendRecordUUID"></a>

## disableAutoAppendRecordUUID
`disableAutoAppendRecordUUID()` <br /><br />
**Description:** <br />
Disable automatically adding a UUID to each event record.

**Example**  
```js
TreasureDataPlugin.disableAutoAppendRecordUUID();
```
**See**: [enableAutoAppendRecordUUID](#enableAutoAppendRecordUUID)  

* * *

<a name="enableAutoAppendAdvertisingIdentifier"></a>

## enableAutoAppendAdvertisingIdentifier
`enableAutoAppendAdvertisingIdentifier([columnName])` <br /><br />
**Description:** <br />
Advertising ID will be added to each event record automatically.  
In **Android**, you must install Google Play Service Ads (Gradle com.google.android.gms:play-services-ads) as a dependency for this feature to work.  
In **iOS**, you must link the Ad Support framework in the Link Binary With Libraries build phase for this feature to work.  
User must also not turn on the Limit Ad Tracking feature in their device, or Treasure Data will not attach Advertising Id to the record. 
Due to the asynchronous nature of getting Advertising Id, after the `enableAutoAppendAdvertisingIdentifier` method is called, it may take some time for Advertising Id to be available and added to the record. 
Treasure Data does cache the Advertising Id in order to add to the next event without having to wait for the fetch Advertising Id task to complete.


| Param | Type | Description |
| --- | --- | --- |
| [columnName] | <code>string</code> | Optional column name to use |

**Example**  
```js
TreasureDataPlugin.enableAutoAppendAdvertisingIdentifier();
// Or specify custom column
TreasureDataPlugin.enableAutoAppendAdvertisingIdentifier('custom_aaid_column');
```
**See**: [disableAutoAppendAdvertisingIdentifier](#disableAutoAppendAdvertisingIdentifier)  

* * *

<a name="disableAutoAppendAdvertisingIdentifier"></a>

## disableAutoAppendAdvertisingIdentifier
`disableAutoAppendAdvertisingIdentifier()` <br /><br />
**Description:** <br />
Disable adding Advertising Id.

**Example**  
```js
TreasureDataPlugin.disableAutoAppendAdvertisingIdentifier();
```
**See**: [enableAutoAppendAdvertisingIdentifier](#enableAutoAppendAdvertisingIdentifier)  

* * *

<a name="getSessionId"></a>

## getSessionId
`getSessionId(success)` <br /><br />
**Description:** <br />
Get current session ID.


| Param | Type | Description |
| --- | --- | --- |
| success | <code>function</code> | callback function with session id in first parameter |


* * *

<a name="setSessionTimeoutMilli"></a>

## setSessionTimeoutMilli
`setSessionTimeoutMilli(timeout)` <br /><br />
**Description:** <br />
Set the session timeout in milliseconds.  
If `startSession()` is called during this timeout after `endSession()` is called, app will start session with the same id as previous one.


| Param | Type | Description |
| --- | --- | --- |
| timeout | <code>long</code> | timeout duration in milliseconds |

**See**

- [startSession](#startSession)
- [endSession](#endSession)


* * *

<a name="setGlobalSessionTimeoutMilli"></a>

## setGlobalSessionTimeoutMilli
`setGlobalSessionTimeoutMilli(timeout)` <br /><br />
**Description:** <br />
Set the global session timeout in milliseconds.


| Param | Type | Description |
| --- | --- | --- |
| timeout | <code>long</code> | timeout duration in milliseconds |

**See**

- [startGlobalSession](#startGlobalSession)
- [endGlobalSession](#endGlobalSession)
- [getGlobalSessionId](#getGlobalSessionId)


* * *

<a name="startGlobalSession"></a>

## startGlobalSession
`startGlobalSession()` <br /><br />
**Description:** <br />
Start tracking a global session.

**See**

- [setGlobalSessionTimeoutMilli](#setGlobalSessionTimeoutMilli)
- [endGlobalSession](#endGlobalSession)
- [getGlobalSessionId](#getGlobalSessionId)


* * *

<a name="endGlobalSession"></a>

## endGlobalSession
`endGlobalSession()` <br /><br />
**Description:** <br />
End tracking a global session.

**See**

- [setGlobalSessionTimeoutMilli](#setGlobalSessionTimeoutMilli)
- [startGlobalSession](#startGlobalSession)
- [getGlobalSessionId](#getGlobalSessionId)


* * *

<a name="getGlobalSessionId"></a>

## getGlobalSessionId
`getGlobalSessionId(success)` <br /><br />
**Description:** <br />
Get the current global session ID.


| Param | Type | Description |
| --- | --- | --- |
| success | <code>function</code> | callback function with session id in first parameter. |

**See**

- [setGlobalSessionTimeoutMilli](#setGlobalSessionTimeoutMilli)
- [startGlobalSession](#startGlobalSession)
- [endGlobalSession](#endGlobalSession)


* * *

<a name="startSession"></a>

## startSession
`startSession(sessionTable, sessionDatabase)` <br /><br />
**Description:** <br />
Start tracking a session.


| Param | Type | Description |
| --- | --- | --- |
| sessionTable | <code>string</code> | Table to use for the current session |
| sessionDatabase | <code>string</code> | Database to use for the current session |

**Example**  
```js
TreasureDataPlugin.startSession(sessionTable, sessionDatabase);
```
**See**: [endSession](#endSession)  

* * *

<a name="endSession"></a>

## endSession
`endSession(sessionTable, sessionDatabase)` <br /><br />
**Description:** <br />
Stop tracking the current session.


| Param | Type | Description |
| --- | --- | --- |
| sessionTable | <code>string</code> | Table to use for the current session |
| sessionDatabase | <code>string</code> | Database to use for the current session |

**Example**  
```js
TreasureDataPlugin.endSession(sessionTable, sessionDatabase);
```
**See**: [startSession](#startSession)  

* * *

<a name="enableCustomEvent"></a>

## enableCustomEvent
`enableCustomEvent()` <br /><br />
**Description:** <br />
Custom events are enabled by default.  
Use this function to optionally enable custom events if you have disabled them manually.

**Example**  
```js
TreasureDataPlugin.enableCustomEvent();
```
**See**: [disableCustomEvent](#disableCustomEvent)  

* * *

<a name="disableCustomEvent"></a>

## disableCustomEvent
`disableCustomEvent()` <br /><br />
**Description:** <br />
Use this function to optionally disable custom events.  
Custom events are enabled by default.

**Example**  
```js
TreasureDataPlugin.disableCustomEvent();
```
**See**: [enableCustomEvent](#enableCustomEvent)  

* * *

<a name="isCustomEventEnabled"></a>

## isCustomEventEnabled
`isCustomEventEnabled(success)` <br /><br />
**Description:** <br />
Whether or not the custom event tracking is enabled.


| Param | Type | Description |
| --- | --- | --- |
| success | <code>function</code> | callback, passes in true/false accordingly. |


* * *

<a name="enableInAppPurchaseEvent"></a>

## enableInAppPurchaseEvent
`enableInAppPurchaseEvent()` <br /><br />
**Description:** <br />
Track in-app purchase events automatically.  
You don't need to check for platform when calling this feature's APIs as they will simply be no-op. In-app purchase event tracking is optional and not enabled by default. To track in-app purchase events automatically, you only need to add a line of code:

**Example**  
```js
TreasureDataPlugin.enableInAppPurchaseEvent();
```
**See**

- [disableInAppPurchaseEvent](#disableInAppPurchaseEvent)
- [isInAppPurchaseEventEnabled](#isInAppPurchaseEventEnabled)


* * *

<a name="disableInAppPurchaseEvent"></a>

## disableInAppPurchaseEvent
`disableInAppPurchaseEvent()` <br /><br />
**Description:** <br />
Disable tracking in-app purchase events.

**Example**  
```js
TreasureDataPlugin.disableInAppPurchaseEvent();
```
**See**

- [enableInAppPurchaseEvent](#enableInAppPurchaseEvent)
- [isInAppPurchaseEventEnabled](#isInAppPurchaseEventEnabled)


* * *

<a name="isInAppPurchaseEventEnabled"></a>

## isInAppPurchaseEventEnabled
`isInAppPurchaseEventEnabled(enabled)` <br /><br />
**Description:** <br />
Check if tracking in-app purchase events is enabled.


| Param | Type | Description |
| --- | --- | --- |
| enabled | <code>function</code> | value will be a string `yes` or `no` respective of whether it is enabled or not. |

**Example**  
```js
TreasureDataPlugin.isInAppPurchaseEventEnabled((enabled) => {
console.log('Tracking in app purchase event is enabled?', enabled ? 'yes' : 'no');
})
```
**See**

- [enableInAppPurchaseEvent](#enableInAppPurchaseEvent)
- [disableInAppPurchaseEvent](#disableInAppPurchaseEvent)


* * *

<a name="disableAppInstalledEvent"></a>

## disableAppInstalledEvent
`disableAppInstalledEvent()` <br /><br />
**Description:** <br />
Disable automatic tracking of the event when app is installed.


* * *

<a name="disableAppOpenEvent"></a>

## disableAppOpenEvent
`disableAppOpenEvent()` <br /><br />
**Description:** <br />
Disable automatic tracking of the event when app is opened.


* * *

<a name="disableAppUpdatedEvent"></a>

## disableAppUpdatedEvent
`disableAppUpdatedEvent()` <br /><br />
**Description:** <br />
Disable automatic tracking of the event when app is updated.


* * *

<a name="enableRetryUploading"></a>

## enableRetryUploading
`enableRetryUploading()` <br /><br />
**Description:** <br />
Enable retry uploading.

**Example**  
```js
TreasureDataPlugin.enableRetryUploading();
```
**See**: [disableRetryUploading](#disableRetryUploading)  

* * *

<a name="disableRetryUploading"></a>

## disableRetryUploading
`disableRetryUploading()` <br /><br />
**Description:** <br />
Disable retry uploading.

**Example**  
```js
TreasureDataPlugin.disableRetryUploading();
```
**See**: [enableRetryUploading](#enableRetryUploading)  

* * *

<a name="enableEventCompression"></a>

## enableEventCompression
`enableEventCompression()` <br /><br />
**Description:** <br />
Event data will be compressed before uploading to server.

**See**: [disableEventCompression](#disableEventCompression)  

* * *

<a name="disableEventCompression"></a>

## disableEventCompression
`disableEventCompression()` <br /><br />
**Description:** <br />
Event data will be uploaded in the full uncompressed format.

**See**: [enableEventCompression](#enableEventCompression)  

* * *

<a name="enableLogging"></a>

## enableLogging
`enableLogging()` <br /><br />
**Description:** <br />
Enable the debug log.

**Example**  
```js
TreasureDataPlugin.enableLogging();
```
**See**: [disableLogging](#disableLogging)  

* * *

<a name="disableLogging"></a>

## disableLogging
`disableLogging()` <br /><br />
**Description:** <br />
Disable the debug log.

**Example**  
```js
TreasureDataPlugin.disableLogging();
```
**See**: [enableLogging](#enableLogging)  

* * *

<a name="isFirstRun"></a>

## isFirstRun
`isFirstRun(success)` <br /><br />
**Description:** <br />
Is this the first run, true/false.


| Param | Type | Description |
| --- | --- | --- |
| success | <code>function</code> | callback function that true/false is passed to accordingly. |

**See**: [clearFirstRun](#clearFirstRun)  

* * *

<a name="clearFirstRun"></a>

## clearFirstRun
`clearFirstRun()` <br /><br />
**Description:** <br />
Clear first run flag.

**See**: [isFirstRun](#isFirstRun)  

* * *

<a name="getUUID"></a>

## getUUID
`getUUID(success)` <br /><br />
**Description:** <br />
Get the UUID value assigned to every event as td_uuid by the enableAutoAppendUniqID function.  
This function assumes you have first called enableAutoApprendUniqID  , which causees all events to have a td_uuid field added to them. getUUID()  returns the value of this td_uuid key for the user to use as they see fit. Note that all events will have the same UUID appended to them.


| Param | Type | Description |
| --- | --- | --- |
| success | <code>function</code> | passes the UUID. |

**See**: [enableAutoApprendUniqID](enableAutoApprendUniqID)  

* * *

<a name="fetchUserSegments"></a>

## fetchUserSegments
`fetchUserSegments(audienceTokens, keys, success, error)` <br /><br />
**Description:** <br />
Profiles API.  
This feature is not enabled on accounts by default, please contact support for more information.  
**Important:** You must set [`setup('cdpEndpoint: xyz')`](#setup) property of TreasureData's sharedInstance.


| Param | Type | Description |
| --- | --- | --- |
| audienceTokens | <code>array</code> | Audience Tokens |
| keys | <code>json</code> | keys to access the Profiles API |
| success | <code>function</code> | function to call on success |
| error | <code>function</code> | function to call on failure / error |

**Example**  
```js
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
  ] * /

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
**See**: [setup](#setup)  

* * *

