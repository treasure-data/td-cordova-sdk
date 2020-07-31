var exec = require("cordova/exec");

function noop() {}

function execute(method, args, success, error) {
  success = success || noop;
  error = error || noop;

  exec(success, error, "TreasureDataPlugin", method, args);
}

exports.setup = function (options) {
  execute("setup", [options]);
};

exports.addEvent = function (event, table, database) {
  execute("addEvent", [event, table, database]);
};

exports.uploadEvents = function () {
  execute("uploadEvents", []);
};

exports.addEventWithCallback = function (
  event,
  table,
  database,
  success,
  error
) {
  execute("addEventWithCallback", [event, table, database], success, error);
};

exports.uploadEventsWithCallback = function (success, error) {
  execute("uploadEventsWithCallback", [], success, error);
};

exports.enableAppLifecycleEvent = function () {
  execute("enableAppLifecycleEvent", []);
};

exports.disableAppLifecycleEvent = function () {
  execute("disableAppLifecycleEvent", []);
};

exports.isAppLifecycleEventEnabled = function (success) {
  execute("isAppLifecycleEventEnabled", [], success);
};

exports.enableAutoAppendUniqId = function () {
  execute("enableAutoAppendUniqId", []);
};

exports.disableAutoAppendUniqId = function () {
  execute("disableAutoAppendUniqId", []);
};

exports.resetUniqId = function () {
  execute("resetUniqId", []);
};

exports.enableAutoAppendAppInformation = function () {
  execute("enableAutoAppendAppInformation", []);
};

exports.disableAutoAppendAppInformation = function () {
  execute("disableAutoAppendAppInformation", []);
};

exports.enableAutoAppendModelInformation = function () {
  execute("enableAutoAppendModelInformation", []);
};

exports.disableAutoAppendModelInformation = function () {
  execute("disableAutoAppendModelInformation", []);
};

exports.enableAutoAppendLocaleInformation = function () {
  execute("enableAutoAppendLocaleInformation", []);
};

exports.disableAutoAppendLocaleInformation = function () {
  execute("disableAutoAppendLocaleInformation", []);
};

exports.enableServerSideUploadTimestamp = function (columnName) {
  execute("enableServerSideUploadTimestamp", [columnName]);
};

exports.disableServerSideUploadTimestamp = function () {
  execute("disableServerSideUploadTimestamp", []);
};

exports.enableAutoAppendRecordUUID = function (columnName) {
  execute("enableAutoAppendRecordUUID", [columnName]);
};

exports.disableAutoAppendRecordUUID = function () {
  execute("disableAutoAppendRecordUUID", []);
};

exports.enableAutoAppendAdvertisingIdentifier = function (columnName) {
  execute("enableAutoAppendAdvertisingIdentifier", [columnName]);
};

exports.disableAutoAppendAdvertisingIdentifier = function () {
  execute("disableAutoAppendAdvertisingIdentifier", []);
};

exports.getSessionId = function (success) {
  execute("getSessionId", [], success);
};

exports.setSessionTimeoutMilli = function (timeout) {
  execute("setSessionTimeoutMilli", [timeout]);
};

exports.setGlobalSessionTimeoutMilli = function (timeout) {
  execute("setGlobalSessionTimeoutMilli", [timeout]);
};

exports.startGlobalSession = function () {
  execute("startGlobalSession", []);
};

exports.endGlobalSession = function () {
  execute("endGlobalSession", []);
};

exports.getGlobalSessionId = function (success) {
  execute("getGlobalSessionId", [], success);
};

exports.startSession = function (table, database) {
  execute("startSession", [table, database]);
};

exports.endSession = function (table, database) {
  execute("endSession", [table, database]);
};

exports.enableCustomEvent = function () {
  execute("enableCustomEvent", []);
};

exports.disableCustomEvent = function () {
  execute("disableCustomEvent", []);
};

exports.isCustomEventEnabled = function (success) {
  execute("isCustomEventEnabled", [], success);
};

exports.enableInAppPurchaseEvent = function () {
  execute("enableInAppPurchaseEvent", []);
};

exports.disableInAppPurchaseEvent = function () {
  execute("disableInAppPurchaseEvent", []);
};

exports.isInAppPurchaseEventEnabled = function (success) {
  execute("isInAppPurchaseEventEnabled", [], success);
};

exports.disableAppInstalledEvent = function () {
  execute("disableAppInstalledEvent", []);
};

exports.disableAppOpenEvent = function () {
  execute("disableAppOpenEvent", []);
};

exports.disableAppUpdatedEvent = function () {
  execute("disableAppUpdatedEvent", []);
};

exports.enableRetryUploading = function () {
  execute("enableRetryUploading", []);
};

exports.disableRetryUploading = function () {
  execute("disableRetryUploading", []);
};

exports.enableEventCompression = function () {
  execute("enableEventCompression", []);
};

exports.disableEventCompression = function () {
  execute("disableEventCompression", []);
};

exports.enableLogging = function () {
  execute("enableLogging", []);
};

exports.disableLogging = function () {
  execute("disableLogging", []);
};

exports.isFirstRun = function (success) {
  execute("isFirstRun", [], success);
};

exports.clearFirstRun = function () {
  execute("clearFirstRun", []);
};

exports.getUUID = function (success) {
  execute("getUUID", [], success);
};

exports.fetchUserSegments = function (audienceTokens, keys, success, error) {
  execute("fetchUserSegments", [audienceTokens, keys], success, error);
};
