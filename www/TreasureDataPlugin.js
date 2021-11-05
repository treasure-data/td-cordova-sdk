var exec = require("cordova/exec");

function noop() {}

function execute(method, args, success, error) {
  success = success || noop;
  error = error || noop;

  exec(success, error, "TreasureDataPlugin", method, args);
}

/**
 * Configure the Treasure Data object. 
 * 
 * @param {string}  apiEndpoint       Valid API endpoint for ingesting data. <br />[View full list of endpoints here.](https://docs.treasuredata.com/display/public/PD/Sites+and+Endpoints)
 * @param {string}  apiKey            Write only TD API Key
 * @param {string}  defaultDatabase   Database name in TD account
 * @param {string}  defaultTable      Table name in TD database
 * @param {string}  [cdpEndpoint]     Valid CDP endpoint for ingesting data. <br />[View full list of endpoints here.](https://docs.treasuredata.com/display/public/PD/Sites+and+Endpoints)
 * @param {string}  [encryptionKey]   Encryption key used to locally encrypt events when saved to device storage. This key will be used to generate an aes128 encryption key. Any string will work. 
 * 
 * @example
 * TreasureDataPlugin.setup({
 *   apiEndpoint: 'https://in.treasure-data.com', // Or other supported endpoints
 *   encryptionKey: 'xxxxx',
 *   apiKey: 'xxxxx', /// You should use write only api key
 *   defaultDatabase: 'default_database',
 *   defaultTable: 'default_table_name',
 *   cdpEndpoint: 'https://cdp.in.treasuredata.com' // Or other cdp endpoints
 * })
 * 
 * */
exports.setup = function (options) {
  execute("setup", [options]);
};


/**
 * Add an event to a local buffer.
 * 
 * @param {json}    event       JSON data to be uploded
 * @param {string}  table       Table name
 * @param {string}  database    Database name
 * 
 * @see {@link addEventWithCallback}
 * 
 * @example
 * const customEvent = {event: 'Custom event', data: new Date().getSeconds()};
 * TreasureDataPlugin.addEvent(customEvent, 'table', 'database');
 * // or
 * TreasureDataPlugin.addEvent(customEvent, 'table');
 * */
exports.addEvent = function (event, table, database) {
  execute("addEvent", [event, table, database]);
};

/**
 * Upload buffered events to Treasure Data.
 * This function can be called at any time.
 *
 * @see {@link uploadEventsWithCallback}
 * 
 * @example
 * TreasureDataPlugin.uploadEvents(); 
 * */
exports.uploadEvents = function () {
  execute("uploadEvents", []);
};

/**
 * Add an event to a local buffer. Use a callback function to certify success / failure.
 * 
 * @param {json}      event       Event data to be uploaded
 * @param {string}    table       Table name
 * @param {string}    database    Database name
 * @param {function}  success     Function to call when events uploaded successfully
 * @param {function}  error       Function to call when events failed to upload
 * 
 * @see {@link addEvent}
 * 
 * @example
 * const customEvent = {event: 'Custom event', data: new Date().getSeconds()};
 * TreasureDataPlugin.addEventWithCallback(customEvent, 'table', 'database', () => {
 *   console.log('Add Event Successfully');
 * }, (errorCode, errorMessage) => {
 *   console.log('Add Event Failed', errorCode, errorMessage);
 * });
 * 
 * */
exports.addEventWithCallback = function (
  event,
  table,
  database,
  success,
  error
) {
  execute("addEventWithCallback", [event, table, database], success, error);
};

/**
 * Upload buffered events to Treasure Data.
 * If you need to know when uploadEvents is successful or has failed, use uploadEventsWithCallback.
 * 
 * @param {function}  success   Function to call when events uploaded successfully
 * @param {function}  error     Function to call when events failed to upload
 * 
 * @see {@link uploadEvents}
 * 
 * @example
 * TreasureDataPlugin.uploadEventsWithCallback(() => {
 *   console.log('Upload events successfully')
 * }, (errorCode, errorMessage) => {
 *   console.log('Failed to upload events', errorCode, errorMessage);
 * });
 * */
exports.uploadEventsWithCallback = function (success, error) {
  execute("uploadEventsWithCallback", [], success, error);
};

/**
 * **Android Only function.**
 * App lifecycle event tracking is optional and not enabled by default. 
 * Enable automatic app lifecycle event tracking.
 * 
 * @see {@link disableAppLifecycleEvent}
 * @see {@link isAppLifecycleEventEnabled}
 * 
 * @example
 * TreasureDataPlugin.enableAppLifecycleEvent();
 * */
exports.enableAppLifecycleEvent = function () {
  execute("enableAppLifecycleEvent", []);
};

/**
 * **Android Only function.**
 * Disable tracking app lifecycle events.
 * 
 * @see {@link enableAppLifecycleEvent}
 * @see {@link isAppLifecycleEventEnabled}
 * 
 * @example
 * TreasureDataPlugin.disableAppLifecycleEvent();
 * 
 * */
exports.disableAppLifecycleEvent = function () {
  execute("disableAppLifecycleEvent", []);
};

/**
 * **Android Only function.**
 * Check if app lifecycle event tracking is enabled.
 * 
 * @param {function} success Callback function to execute on success.
 * 
 * @see {@link enableAppLifecycleEvent}
 * @see {@link disableAppLifecycleEvent}
 * 
 * @example
 * TreasureDataPlugin.isAppLifecycleEventEnabled((enabled) => {
 *   console.log('Tracking app lifecycle event is enabled?', enabled ? 'yes' : 'no');
 * })
 * 
 * */
exports.isAppLifecycleEventEnabled = function (success) {
  execute("isAppLifecycleEventEnabled", [], success);
};

/**
 * Automatically add the UUID of the device to each event.
 * This value won't change until the application is uninstalled.
 * 
 * @see {@link disableAutoAppendUniqId}
 * @see {@link resetUniqId}
 * 
 * @example
 * TreasureDataPlugin.enableAutoAppendUniqId();
 * 
 * */
exports.enableAutoAppendUniqId = function () {
  execute("enableAutoAppendUniqId", []);
};

/**
 * Disable adding the UUID of the device to each event automatically.
 * @see {@link enableAutoAppendUniqId}
 * @see {@link resetUniqId}
 * 
 * @example
 * TreasureDataPlugin.disableAutoAppendUniqId();
 * 
 * */
exports.disableAutoAppendUniqId = function () {
  execute("disableAutoAppendUniqId", []);
};

/**
 * Reset the UUID of the device. 
 * @see enableAutoAppendUniqId
 * @see disableAutoAppendUniqID
 * 
 * @example
 * TreasureDataPlugin.resetUniqId();
 * 
 * */
exports.resetUniqId = function () {
  execute("resetUniqId", []);
};

/**
 * Enable adding application package version information to each event automatically.
 * 
 * @see {@link disableAutoAppendAppInformation}
 * 
 * @example
 * TreasureDataPlugin.enableAutoAppendAppInformation();
 * */
exports.enableAutoAppendAppInformation = function () {
  execute("enableAutoAppendAppInformation", []);
};

/**
 * Disable adding application package version information to each event automatically.
 * 
 * @see {@link enableAutoAppendAppInformation}
 * 
 * @example
 * TreasureDataPlugin.disableAutoAppendAppInformation();
 * */
exports.disableAutoAppendAppInformation = function () {
  execute("disableAutoAppendAppInformation", []);
};

/**
 * Enable adding device model information to each event automatically.
 * @see {@link disableAutoAppendModelInformation}
 * 
 * @example
 * TreasureDataPlugin.enableAutoAppendModelInformation();
 * 
 * */
exports.enableAutoAppendModelInformation = function () {
  execute("enableAutoAppendModelInformation", []);
};

/**
 * Disable adding device model information to each event automatically.
 * @see {@link enableAutoAppendModelInformation}
 * 
 * @example
 * TreasureDataPlugin.disableAutoAppendModelInformation();
 * */
exports.disableAutoAppendModelInformation = function () {
  execute("disableAutoAppendModelInformation", []);
};

/**
 * Enable adding locale configuration information to each event automatically.
 * 
 * @see {@link disableAutoAppendLocaleInformation}
 * 
 * @example
 * TreasureDataPlugin.enableAutoAppendLocaleInformation();
 * */
exports.enableAutoAppendLocaleInformation = function () {
  execute("enableAutoAppendLocaleInformation", []);
};

/**
 * Disable adding locale configuration information to each event automatically.
 * 
 * @see {@link enableAutoAppendLocaleInformation}
 * 
 * @example
 * TreasureDataPlugin.disableAutoAppendLocaleInformation();
 * */
exports.disableAutoAppendLocaleInformation = function () {
  execute("disableAutoAppendLocaleInformation", []);
};

/**
 * To use server side upload timestamp in addition to the client device time that is recorded when your application calls addEvent.
 * 
 * @param {string} [columnName] Optionally include the column name to specify where to upload the timestamp to.
 * 
 * @see {@link disableServerSideUploadTimestamp}
 * 
 * @example
 * TreasureDataPlugin.enableServerSideUploadTimestamp();
 * // Or specify custom column
 * TreasureDataPlugin.enableServerSideUploadTimestamp('custom_servier_side_upload_timestamp_column');
 * */
exports.enableServerSideUploadTimestamp = function (columnName) {
  execute("enableServerSideUploadTimestamp", [columnName]);
};

/**
 * Disable server side upload timestamp.
 * 
 * @see {@link enableServerSideUploadTimestamp}
 * 
 * @example
 * TreasureDataPlugin.disableServerSideUploadTimestamp();
 * */
exports.disableServerSideUploadTimestamp = function () {
  execute("disableServerSideUploadTimestamp", []);
};

/**
 * Automatically add a UUID to each event record.
 * Each event will have a different UUID.
 * 
 * @see {@link disableAutoAppendRecordUUID}
 * 
 * @example
 * TreasureDataPlugin.enableAutoAppendRecordUUID();
 * */
exports.enableAutoAppendRecordUUID = function (columnName) {
  execute("enableAutoAppendRecordUUID", [columnName]);
};

/**
 * Disable automatically adding a UUID to each event record.
 * 
 * @see {@link enableAutoAppendRecordUUID}
 * 
 * @example
 * TreasureDataPlugin.disableAutoAppendRecordUUID();
 * */
exports.disableAutoAppendRecordUUID = function () {
  execute("disableAutoAppendRecordUUID", []);
};

/**
 * @description In **Android**, you must install Google Play Service Ads (Gradle com.google.android.gms:play-services-ads) as a dependency for this feature to work.  
 * In **iOS**, you must link the Ad Support framework in the Link Binary With Libraries build phase for this feature to work.  
 * User must also not turn on the Limit Ad Tracking feature in their device, or Treasure Data will not attach Advertising Id to the record. 
 * Due to the asynchronous nature of getting Advertising Id, after the `enableAutoAppendAdvertisingIdentifier` method is called, it may take some time for Advertising Id to be available and added to the record. 
 * Treasure Data does cache the Advertising Id in order to add to the next event without having to wait for the fetch Advertising Id task to complete.
 * 
 * @summary Advertising ID will be added to each event record automatically.
 * 
 * @param {string} [columnName] - Optional column name to use
 * 
 * @see {@link disableAutoAppendAdvertisingIdentifier}
 * 
 * @example
 * TreasureDataPlugin.enableAutoAppendAdvertisingIdentifier();
 * // Or specify custom column
 * TreasureDataPlugin.enableAutoAppendAdvertisingIdentifier('custom_aaid_column');
 * */
exports.enableAutoAppendAdvertisingIdentifier = function (columnName) {
  execute("enableAutoAppendAdvertisingIdentifier", [columnName]);
};

/**
 * Disable adding Advertising Id.
 * 
 * @see {@link enableAutoAppendAdvertisingIdentifier}
 * 
 * @example
 * TreasureDataPlugin.disableAutoAppendAdvertisingIdentifier();
 * */
exports.disableAutoAppendAdvertisingIdentifier = function () {
  execute("disableAutoAppendAdvertisingIdentifier", []);
};

/**
 * Get current session ID.
 * 
 * @param {function} success - callback function with session id in first parameter
 * */
exports.getSessionId = function (success) {
  execute("getSessionId", [], success);
};

/**
 * @summary Set the session timeout in milliseconds.  
 * 
 * @description If `startSession()` is called during this timeout after `endSession()` is called, app will start session with the same id as previous one.
 * 
 * @param {long} timeout - timeout duration in milliseconds
 * 
 * @see {@link startSession}
 * @see {@link endSession}
 * */
exports.setSessionTimeoutMilli = function (timeout) {
  execute("setSessionTimeoutMilli", [timeout]);
};

/**
 * Set the global session timeout in milliseconds.
 * 
 * @param {long} timeout - timeout duration in milliseconds
 * 
 * @see {@link startGlobalSession}
 * @see {@link endGlobalSession}
 * @see {@link getGlobalSessionId}
 * */
exports.setGlobalSessionTimeoutMilli = function (timeout) {
  execute("setGlobalSessionTimeoutMilli", [timeout]);
};

/**
 * Start tracking a global session.
 * 
 * @see {@link setGlobalSessionTimeoutMilli}
 * @see {@link endGlobalSession}
 * @see {@link getGlobalSessionId}
 * */
exports.startGlobalSession = function () {
  execute("startGlobalSession", []);
};

/**
 * End tracking a global session.
 * 
 * @see {@link setGlobalSessionTimeoutMilli}
 * @see {@link startGlobalSession}
 * @see {@link getGlobalSessionId}
 * 
 * */
exports.endGlobalSession = function () {
  execute("endGlobalSession", []);
};

/**
 * Get the current global session ID.
 * 
 * @param {function} success - callback function with session id in first parameter.
 * 
 * @see {@link setGlobalSessionTimeoutMilli}
 * @see {@link startGlobalSession}
 * @see {@link endGlobalSession}
 * */
exports.getGlobalSessionId = function (success) {
  execute("getGlobalSessionId", [], success);
};

/**
 * Start tracking a session.
 * 
 * @param {string} sessionTable     - Table to use for the current session
 * @param {string} sessionDatabase  - Database to use for the current session
 * 
 * @see {@link endSession}
 * 
 * @example
 * TreasureDataPlugin.startSession(sessionTable, sessionDatabase);
 * */
exports.startSession = function (table, database) {
  execute("startSession", [table, database]);
};

/**
 * Stop tracking the current session.
 * 
 * @param {string} sessionTable     - Table to use for the current session
 * @param {string} sessionDatabase  - Database to use for the current session
 * 
 * @see {@link startSession}
 * 
 * @example
 * TreasureDataPlugin.endSession(sessionTable, sessionDatabase);
 * */
exports.endSession = function (table, database) {
  execute("endSession", [table, database]);
};

/**
 * @summary Custom events are enabled by default.
 * 
 * @description Use this function to optionally enable custom events if you have disabled them manually. 
 * 
 * @see {@link disableCustomEvent}
 * 
 * @example
 * TreasureDataPlugin.enableCustomEvent();
 * */
exports.enableCustomEvent = function () {
  execute("enableCustomEvent", []);
};

/**
 * @description Custom events are enabled by default. 
 * 
 * @summary Use this function to optionally disable custom events.
 * 
 * @see {@link enableCustomEvent}
 * 
 * @example
 * TreasureDataPlugin.disableCustomEvent();
 * */
exports.disableCustomEvent = function () {
  execute("disableCustomEvent", []);
};

/**
 * Whether or not the custom event tracking is enabled.
 * 
 * @param {function} success - callback, passes in true/false accordingly. 
 * 
 * */
exports.isCustomEventEnabled = function (success) {
  execute("isCustomEventEnabled", [], success);
};

/**
 * @summary Track in-app purchase events automatically.
 *   
 * @description You don't need to check for platform when calling this feature's APIs as they will simply be no-op. In-app purchase event tracking is optional and not enabled by default. To track in-app purchase events automatically, you only need to add a line of code:
 * 
 * @see {@link disableInAppPurchaseEvent}
 * @see {@link isInAppPurchaseEventEnabled}
 * 
 * @example
 * TreasureDataPlugin.enableInAppPurchaseEvent();
 * */
exports.enableInAppPurchaseEvent = function () {
  execute("enableInAppPurchaseEvent", []);
};

/**
 * Disable tracking in-app purchase events.
 * 
 * @see {@link enableInAppPurchaseEvent}
 * @see {@link isInAppPurchaseEventEnabled}
 * 
 * @example
 * TreasureDataPlugin.disableInAppPurchaseEvent();
 * */
exports.disableInAppPurchaseEvent = function () {
  execute("disableInAppPurchaseEvent", []);
};

/**
 * Check if tracking in-app purchase events is enabled.
 * 
 * @param {function} enabled - value will be a string `yes` or `no` respective of whether it is enabled or not. 
 * 
 * @see {@link enableInAppPurchaseEvent}
 * @see {@link disableInAppPurchaseEvent}
 * 
 * @example
 * TreasureDataPlugin.isInAppPurchaseEventEnabled((enabled) => {
 * console.log('Tracking in app purchase event is enabled?', enabled ? 'yes' : 'no');
 * }) 
 * */
exports.isInAppPurchaseEventEnabled = function (success) {
  execute("isInAppPurchaseEventEnabled", [], success);
};

/**
 * Disable automatic tracking of the event when app is installed.
 * */
exports.disableAppInstalledEvent = function () {
  execute("disableAppInstalledEvent", []);
};

/**
 * Disable automatic tracking of the event when app is opened.
 * */
exports.disableAppOpenEvent = function () {
  execute("disableAppOpenEvent", []);
};

/**
 * Disable automatic tracking of the event when app is updated.
 * */
exports.disableAppUpdatedEvent = function () {
  execute("disableAppUpdatedEvent", []);
};

/**
 * Enable retry uploading.
 * 
 * @see {@link disableRetryUploading}
 * 
 * @example
 * TreasureDataPlugin.enableRetryUploading();
 * */
exports.enableRetryUploading = function () {
  execute("enableRetryUploading", []);
};

/**
 * Disable retry uploading. 
 * 
 * @see {@link enableRetryUploading}
 * 
 * @example
 * TreasureDataPlugin.disableRetryUploading();
 * */
exports.disableRetryUploading = function () {
  execute("disableRetryUploading", []);
};

/**
 * Event data will be compressed before uploading to server.
 * 
 * @see {@link disableEventCompression}
 * */
exports.enableEventCompression = function () {
  execute("enableEventCompression", []);
};

/**
 * Event data will be uploaded in the full uncompressed format.
 * 
 * @see {@link enableEventCompression}
 * */
exports.disableEventCompression = function () {
  execute("disableEventCompression", []);
};

/**
 * Enable the debug log.
 * 
 * @see {@link disableLogging}
 * 
 * @example
 * TreasureDataPlugin.enableLogging();
 * */
exports.enableLogging = function () {
  execute("enableLogging", []);
};

/**
 * Disable the debug log. 
 * 
 * @see {@link enableLogging}
 * 
 * @example
 * TreasureDataPlugin.disableLogging();
 * */
exports.disableLogging = function () {
  execute("disableLogging", []);
};

/**
 * Is this the first run, true/false. 
 * 
 * @param {function} success - callback function that true/false is passed to accordingly.
 * 
 * @see {@link clearFirstRun}
 * */
exports.isFirstRun = function (success) {
  execute("isFirstRun", [], success);
};

/**
 * Clear first run flag.
 * 
 * @see {@link isFirstRun}
 * */
exports.clearFirstRun = function () {
  execute("clearFirstRun", []);
};

/**
 * @summary Get the UUID value assigned to every event as td_uuid by the enableAutoAppendUniqID function.
 * 
 * @description This function assumes you have first called enableAutoAppendUniqID  , which causees all events to have a td_uuid field added to them. getUUID()  returns the value of this td_uuid key for the user to use as they see fit. Note that all events will have the same UUID appended to them.
 * 
 * @param {function} success - passes the UUID.
 * 
 * @see {@link enableAutoAppendUniqID}
 * */
exports.getUUID = function (success) {
  execute("getUUID", [], success);
};

/**
 * @summary Profiles API.  
 *   
 * @description This feature is not enabled on accounts by default, please contact support for more information.  
 * **Important:** You must set [`setup('cdpEndpoint: xyz')`](#setup) property of TreasureData's sharedInstance. 
 * 
 * @param {array}       audienceTokens  - Audience Tokens
 * @param {json}        keys            - keys to access the Profiles API 
 * @param {function}    success         - function to call on success
 * @param {function}    error           - function to call on failure / error

 * 
 * @see {@link setup}
 * 
 * @example
 * var plugin = cordova.plugins.TreasureDataPlugin;
 * function success(response) {
 *   /* response format => [
 *     {
 *       "segments": ["segment_id"],
 *       "attributes": {
 *         "age": ##,
 *         "td_client_id": "xxxxxxxxxxxxx"
 *       },
 *       "audienceId": "audience_id",
 *       "key": { "name": "user_id", "value": "xxxxxxx" }
 *     },
 *     {
 *       "segments": ["segment_id", "segment_id"],
 *       "attributes": {
 *         "im_segments": "xxxxxxxxxxxx",
 *         "work_style_per_family": "xxxxxxxx"
 *       },
 *       "audienceId": "audience_id",
 *       "key": {
 *         "name": "td_client_id",
 *         "value": "xxxxxxxxxxxxx"
 *       }
 *     }
 *   ] * /
 * 
 *   // yay
 * }
 * 
 * function error() {
 *   // nay
 * }
 * 
 * plugin.fetchUserSegments(
 *   ["audience_id","audience_id"],
 *   {
 *     user_id: "xxxxx",
 *     td_client_id: "xxxxx"
 *   },
 *   success,
 *   error
 * );
 * 
 * */
exports.fetchUserSegments = function (audienceTokens, keys, success, error) {
  execute("fetchUserSegments", [audienceTokens, keys], success, error);
};

/**
   * Set default `value` for  `key` in all new events targeting `database` and `table`.
   * When `database` and/or `table` parameters are null, the null parameter acts like a wild card that allows to set specified key value pair to new events added to any database (if `database` is null) and/or to any table (if `table` is null).
   * For example, if you pass null to both `database` and `table` parameters, all new events will have specified default value.
   * 
   * @param value default value for `key`
   * @param key the event's key that default value is set to, corresponding to column in table.
   * @param database the database to set default value to. If null, specified table of any database will have new events with the added default value.
   * @param table the table to set default value to. If null, any table of specified database will have new events with the added default value.
   * 
   * */
exports.setDefaultValue = function (value, key, database, table) {
  console.log("Setting default value");
  execute("setDefaultValue", [value, key, database, table]);
  // TdReactNativeSdk.setDefaultValue(value, key, database, table);
};

/**
 * Get default value of `key` in all new events targeting `database` and `table`.
 * @see {@link setDefaultValue} for logic setting database and table.
 * 
 * @param key the event's key that default value is set to, corresponding to column in table.
 * @param database the database to get default value from. If null, get default value of specified table of any database.
 * @param table the table to get default value from. If null, get default value of any table of specified database.
 * @param success callback with the default value in first parameter.
 * 
 * */
exports.defaultValue = function (key, database, table, success) {
  execute("defaultValue", [key, database, table], success);
};

/**
 * Remove default value of `key` in all new events targeting `database` and `table`.
 * @see {@link setDefaultValue} for logic setting database and table.
 * 
 * @param key the event's key that default value is set to, corresponding to column in table.
 * @param database the database to remove default value from. If null, specified table of any database will have new events without the default value.
 * @param table the table to remove default value from. If null, any table of specified database will have new events without the default value.
 * */
exports.removeDefaultValue = function (key, database, table) {
  execute("removeDefaultValue", [key, database, table]);
  // TdReactNativeSdk.removeDefaultValue(key, database, table);
};