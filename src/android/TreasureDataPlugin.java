package com.treasuredata.cordova;

import android.content.Context;
import android.util.Log;

import com.treasuredata.android.TDCallback;
import com.treasuredata.android.TreasureData;
import com.treasuredata.android.cdp.FetchUserSegmentsCallback;
import com.treasuredata.android.cdp.Profile;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * This class is a wrapper for td-android-sdk
 */
public class TreasureDataPlugin extends CordovaPlugin {
    private final String TAG = "TdCordovaSdk";
    private final String DEFAULT_DATABASE = "td_cordova_sdk";
    private final String DEFAULT_TABLE = "samples";

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("setup")) {
            try {
                JSONObject options = args.getJSONObject(0);
                this.setup(options);
            } catch (URISyntaxException urie) {
                Log.e(TAG, urie.getMessage(), urie);
            }
        } else if (action.equals("addEvent")) {
            try {
                JSONObject event = args.getJSONObject(0);
                String table = this.getStringArg(args, 1);
                String database = this.getStringArg(args, 2);

                this.addEvent(event, table, database);
            } catch (JSONException jsone) {
                Log.e(TAG, jsone.getMessage(), jsone);
            }
        } else if (action.equals("uploadEvents")) {
            this.uploadEvents();
        } else if (action.equals("addEventWithCallback")) {
            try {
                JSONObject event = args.getJSONObject(0);
                String table = this.getStringArg(args, 1);
                String database = this.getStringArg(args, 2);

                this.addEventWithCallback(event, table, database, callbackContext);
            } catch (JSONException jsone) {
                Log.e(TAG, jsone.getMessage(), jsone);
            }
        } else if (action.equals("uploadEventsWithCallback")) {
            Log.i(TAG, "Upload events with callback");
            this.uploadEventsWithCallback(callbackContext);
        } else if (action.equals("enableAppLifecycleEvent")) {
            this.enableAppLifecycleEvent();
        } else if (action.equals("disableAppLifecycleEvent")) {
            this.disableAppLifecycleEvent();
        } else if (action.equals("isAppLifecycleEventEnabled")) {
            this.isAppLifecycleEventEnabled(callbackContext);
        } else if (action.equals("enableAutoAppendUniqId")) {
            this.enableAutoAppendUniqId();
        } else if (action.equals("disableAutoAppendUniqId")) {
            this.disableAutoAppendUniqId();
        } else if (action.equals("resetUniqId")) {
            this.resetUniqId();
        } else if (action.equals("enableAutoAppendAppInformation")) {
            this.enableAutoAppendAppInformation();
        } else if (action.equals("disableAutoAppendAppInformation")) {
            this.disableAutoAppendAppInformation();
        } else if (action.equals("enableAutoAppendModelInformation")) {
            this.enableAutoAppendModelInformation();
        } else if (action.equals("disableAutoAppendModelInformation")) {
            this.disableAutoAppendModelInformation();
        } else if (action.equals("enableAutoAppendLocaleInformation")) {
            this.enableAutoAppendLocaleInformation();
        } else if (action.equals("disableAutoAppendLocaleInformation")) {
            this.disableAutoAppendLocaleInformation();
        } else if (action.equals("enableAutoAppendRecordUUID")) {
            final String columnName = this.getStringArg(args, 0);
            this.enableAutoAppendRecordUUID(columnName);
        } else if (action.equals("disableAutoAppendRecordUUID")) {
            this.disableAutoAppendRecordUUID();
        } else if (action.equals("enableAutoAppendAdvertisingIdentifier")) {
            final String columnName = this.getStringArg(args, 0);
            this.enableAutoAppendAdvertisingIdentifier(columnName);
        } else if (action.equals("disableAutoAppendAdvertisingIdentifier")) {
            this.disableAutoAppendAdvertisingIdentifier();
        } else if (action.equals("getSessionId")) {
            this.getSessionId(callbackContext);
        } else if (action.equals("setSessionTimeoutMilli")) {
            final Integer timeout = args.getInt(0);
            this.setSessionTimeoutMilli(timeout);
        } else if (action.equals("setGlobalSessionTimeoutMilli")) {
            final Integer timeout = args.getInt(0);
            this.setGlobalSessionTimeoutMilli(timeout);
        } else if (action.equals("startGlobalSession")) {
            this.startGlobalSession();
        } else if (action.equals("endGlobalSession")) {
            this.endGlobalSession();
        } else if (action.equals("getGlobalSessionId")) {
            this.getGlobalSessionId(callbackContext);
        } else if (action.equals("resetGlobalSessionId")) {
            this.resetGlobalSessionId(callbackContext);
        } else if (action.equals("startSession")) {
            final String table = this.getStringArg(args, 0);
            final String database = this.getStringArg(args, 1);

            this.startSession(table, database);
        } else if (action.equals("endSession")) {
            final String table = this.getStringArg(args, 0);
            final String database = this.getStringArg(args, 1);

            this.endSession(table, database);
        } else if (action.equals("enableCustomEvent")) {
            this.enableCustomEvent();
        } else if (action.equals("disableCustomEvent")) {
            this.disableCustomEvent();
        } else if (action.equals("isCustomEventEnabled")) {
            this.isCustomEventEnabled(callbackContext);
        } else if (action.equals("enableInAppPurchaseEvent")) {
            this.enableInAppPurchaseEvent();
        } else if (action.equals("disableInAppPurchaseEvent")) {
            this.disableInAppPurchaseEvent();
        } else if (action.equals("isInAppPurchaseEventEnabled")) {
            this.isInAppPurchaseEventEnabled(callbackContext);
        } else if (action.equals("disableAppInstalledEvent")) {
            this.disableAppInstalledEvent();
        } else if (action.equals("disableAppOpenEvent")) {
            this.disableAppOpenEvent();
        } else if (action.equals("disableAppUpdatedEvent")) {
            this.disableAppUpdatedEvent();
        } else if (action.equals("enableRetryUploading")) {
            this.enableRetryUploading();
        } else if (action.equals("disableRetryUploading")) {
            this.disableRetryUploading();
        } else if (action.equals("enableEventCompression")) {
            this.enableEventCompression();
        } else if (action.equals("disableEventCompression")) {
            this.disableEventCompression();
        } else if (action.equals("enableLogging")) {
            this.enableLogging();
        } else if (action.equals("disableLogging")) {
            this.disableLogging();
        } else if (action.equals("isFirstRun")) {
            this.isFirstRun(callbackContext);
        } else if (action.equals("clearFirstRun")) {
            this.clearFirstRun();
        } else if (action.equals("getUUID")) {
            this.getUUID(callbackContext);
        } else if (action.equals("fetchUserSegments")) {
            final JSONArray tokens = args.getJSONArray(0);
            final JSONObject keys = args.getJSONObject(1);

            this.fetchUserSegments(tokens, keys, callbackContext);
        } else if (action.equals("setDefaultValue")) {
            final String key = this.getStringArg(args, 0);
            final String value = this.getStringArg(args, 1);
            final String database = this.getStringArg(args, 2);
            final String table = this.getStringArg(args, 3);
            this.setDefaultValue(database, table, key, value);
        } else if (action.equals("defaultValue")) {
            final String key = this.getStringArg(args, 0);
            final String database = this.getStringArg(args, 1);
            final String table = this.getStringArg(args, 2);
            this.getDefaultValue(database, table, key, callbackContext);
        } else if (action.equals("removeDefaultValue")) {
            final String key = this.getStringArg(args, 0);
            final String database = this.getStringArg(args, 1);
            final String table = this.getStringArg(args, 2);
            this.removeDefaultValue(database, table, key);
        } else {
          return false;
        }

        return true;
    }

    private String getStringArg(JSONArray args, int atIndex) throws JSONException {
        final String argValue = args.getString(atIndex);

        return argValue == "null" ? null : argValue;
    }

    private void setup(JSONObject options) throws JSONException, URISyntaxException {
        if (options.has("apiKey")) {
            String defaultDatabase = DEFAULT_DATABASE;
            if (options.has("defaultDatabase")) {
                defaultDatabase = options.getString("defaultDatabase");
            }

            String defaultTable = DEFAULT_TABLE;
            if (options.has("defaultTable")) {
                defaultTable = options.getString("defaultTable");
            }

            String cdpEndpoint = "";
            if (options.has("cdpEndpoint")) {
                cdpEndpoint = options.getString("cdpEndpoint");
            }

            String encryptionKey = "";
            if (options.has("encryptionKey")) {
                encryptionKey = options.getString("encryptionKey");
            }

            Context context = this.cordova.getActivity().getApplicationContext();

            if (options.has("apiEndpoint")) {
              TreasureData.initializeSharedInstance(context, options.getString("apiKey"), options.getString("apiEndpoint"));
            } else {
              TreasureData.initializeSharedInstance(context, options.getString("apiKey"));
            }

            final TreasureData instance = TreasureData.sharedInstance();

            if (!cdpEndpoint.isEmpty()) {
                instance.setCDPEndpoint(cdpEndpoint);
            }

            if (!encryptionKey.isEmpty()) {
                TreasureData.initializeEncryptionKey(encryptionKey);
            }

            instance.setDefaultDatabase(defaultDatabase);
            instance.setDefaultTable(defaultTable);
        } else {
            throw new IllegalArgumentException("API key must be specified.");
        }
    }

    private void addEvent(JSONObject event, String table, String database) throws JSONException {
        String remoteTable = table != null && !table.isEmpty() ? table : DEFAULT_TABLE;

        if (remoteTable == null || remoteTable.isEmpty()) {
            throw new IllegalArgumentException("Table name must be specified");
        }

        final Map<String, Object> convertedEvent = this.toMap(event);

        if (database == null || database.isEmpty()) {
            TreasureData.sharedInstance().addEvent(remoteTable, convertedEvent);
        } else {
            TreasureData.sharedInstance().addEvent(database, remoteTable, convertedEvent);
        }
    }

    private void addEventWithCallback(JSONObject event, String table, String database, CallbackContext callbackContext) throws JSONException {
        String remoteTable = table != null && !table.isEmpty() ? table : DEFAULT_TABLE;

        if (remoteTable == null || remoteTable.isEmpty()) {
            throw new IllegalArgumentException("Table name must be specified");
        }

        final Map<String, Object> convertedEvent = this.toMap(event);
        final DefaultCallback callback = new DefaultCallback("addEvent", callbackContext);

        if (database == null || database.isEmpty()) {
            TreasureData.sharedInstance().addEventWithCallback(remoteTable, convertedEvent, callback);
        } else {
            TreasureData.sharedInstance().addEventWithCallback(database, table, convertedEvent, callback);
        }
    }

    private void uploadEventsWithCallback(CallbackContext callbackContext) {
        final DefaultCallback callback = new DefaultCallback("uploadEvents", callbackContext);

        TreasureData.sharedInstance().uploadEventsWithCallback(callback);
    }

    private void uploadEvents() {
        TreasureData.sharedInstance().uploadEvents();
    }

    private void fetchUserSegments(JSONArray audienceTokens, JSONObject keys, final CallbackContext callback) throws JSONException {
        List<String> profileTokens = this.toList(audienceTokens);
        Map<String, Object> convertedMap = new HashMap<>();
        Map<String, String> keysMap = new HashMap<>();

        if (keys != null) {
            convertedMap = this.toMap(keys);
            for(Map.Entry<String, Object> entry : convertedMap.entrySet()) {
                keysMap.put(entry.getKey(), (String)entry.getValue());
            }
        }

        TreasureData.sharedInstance().fetchUserSegments(profileTokens, keysMap, new FetchUserSegmentsCallback() {
            @Override
            public void onSuccess(List<Profile> profiles) {
                try {
                    JSONArray response = new JSONArray();

                    for(Profile profile : profiles) {
                        JSONObject profileMap = new JSONObject();

                        JSONArray segments = new JSONArray(profile.getSegments().toArray());
                        profileMap.put("segments", segments);

                        JSONObject attributes = new JSONObject(profile.getAttributes());
                        profileMap.put("attributes", attributes);

                        profileMap.put("audienceId", profile.getAudienceId());

                        JSONObject keyMap = new JSONObject();
                        keyMap.put("name", profile.getKey().getName());
                        keyMap.put("value", (String)profile.getKey().getValue());
                        profileMap.put("key", keyMap);

                        response.put(profileMap);
                    }

                    if (callback != null) {
                        callback.success(response.toString());
                    } else {
                        Log.d(TAG, "Fetching user segments successfully");
                    }
                } catch (JSONException jsone) {
                    if (callback != null) {
                        callback.error(jsone.getMessage());
                    }
                }
            }

            @Override
            public void onError(Exception e) {
                String message = "Failed to fetch user segments. Error message: " + e.getMessage();
                if (callback != null) {
                    callback.error(message);
                } else {
                    Log.e(TAG, message);
                }
            }
        });
    }

    private void setDefaultValue(String database, String table, String key, String value) {
        TreasureData.sharedInstance().setDefaultValue(database, table, key, value);
    }

    private void getDefaultValue(String database, String table, String key, final CallbackContext callback) throws JSONException {
        Object defaultValue = TreasureData.sharedInstance().getDefaultValue(database, table, key);
        String defaultValueString = defaultValue == null ? null : defaultValue.toString();
        callback.success(defaultValueString);
    }

    private void removeDefaultValue(String database, String table, String key) {
        TreasureData.sharedInstance().removeDefaultValue(database, table, key);
    }

    private void enableAppLifecycleEvent() {
        TreasureData.sharedInstance().enableAppLifecycleEvent(true);
    }

    private void disableAppLifecycleEvent() {
        TreasureData.sharedInstance().enableAppLifecycleEvent(false);
    }

    private void isAppLifecycleEventEnabled(CallbackContext callback) {
        final int enabled = TreasureData.sharedInstance().isAppLifecycleEventEnabled() ? 1 : 0;
        callback.success(enabled);
    }

    private void enableAutoAppendUniqId() {
        TreasureData.sharedInstance().enableAutoAppendUniqId();
    }

    private void disableAutoAppendUniqId() {
        TreasureData.sharedInstance().disableAutoAppendUniqId();
    }

    private void resetUniqId() {
        TreasureData.sharedInstance().resetUniqId();
    }

    private void enableAutoAppendModelInformation() {
        TreasureData.sharedInstance().enableAutoAppendModelInformation();
    }

    private void disableAutoAppendModelInformation() {
        TreasureData.sharedInstance().disableAutoAppendModelInformation();
    }

    private void enableAutoAppendAppInformation() {
        TreasureData.sharedInstance().enableAutoAppendAppInformation();
    }

    private void disableAutoAppendAppInformation() {
        TreasureData.sharedInstance().disableAutoAppendAppInformation();
    }

    private void enableAutoAppendLocaleInformation() {
        TreasureData.sharedInstance().enableAutoAppendLocaleInformation();
    }

    private void disableAutoAppendLocaleInformation() {
        TreasureData.sharedInstance().disableAutoAppendLocaleInformation();
    }

    private void enableAutoAppendRecordUUID(String columnName) {
        if (columnName == null || columnName.isEmpty()) {
            TreasureData.sharedInstance().enableAutoAppendRecordUUID();
        } else {
            TreasureData.sharedInstance().enableAutoAppendRecordUUID(columnName);
        }
    }

    private void disableAutoAppendRecordUUID() {
        TreasureData.sharedInstance().disableAutoAppendRecordUUID();
    }

    private void enableAutoAppendAdvertisingIdentifier(String columnName) {
        if (columnName == null || columnName.isEmpty()) {
            TreasureData.sharedInstance().enableAutoAppendAdvertisingIdentifier();
        } else {
            TreasureData.sharedInstance().enableAutoAppendAdvertisingIdentifier(columnName);
        }
    }

    private void disableAutoAppendAdvertisingIdentifier() {
        TreasureData.sharedInstance().disableAutoAppendAdvertisingIdentifier();
    }

    private void getSessionId(CallbackContext callback) {
        callback.success(TreasureData.sharedInstance().getSessionId());
    }

    private void setSessionTimeoutMilli(Integer timeout) {
        TreasureData.sharedInstance().setSessionTimeoutMilli(timeout);
    }

    private void setGlobalSessionTimeoutMilli(Integer timeout) {
        TreasureData.setSessionTimeoutMilli(timeout);
    }

    private void startGlobalSession() {
        TreasureData.startSession(this.cordova.getActivity().getApplicationContext());
    }

    private void endGlobalSession() {
        TreasureData.endSession(this.cordova.getActivity().getApplicationContext());
    }

    private void getGlobalSessionId(CallbackContext callback) {
        callback.success(TreasureData.getSessionId(this.cordova.getActivity().getApplicationContext()));
    }

    private void resetGlobalSessionId(CallbackContext callback) {
        TreasureData.resetSessionId(this.cordova.getActivity().getApplicationContext());
    }

    private void startSession(String table, String database) {
        if (table == null || table.isEmpty()) {
            throw new IllegalArgumentException("Table name must be specified");
        }

        if (database == null || database.isEmpty()) {
            TreasureData.sharedInstance().startSession(table);
        } else {
            TreasureData.sharedInstance().startSession(database, table);
        }
    }

    private void endSession(String table, String database) {
        if (table == null || table.isEmpty()) {
            throw new IllegalArgumentException("Table name must be specified");
        }

        if (database == null || database.isEmpty()) {
            TreasureData.sharedInstance().endSession(table);
        } else {
            TreasureData.sharedInstance().endSession(database, table);
        }
    }

    private void enableCustomEvent() {
        TreasureData.sharedInstance().enableCustomEvent();
    }

    private void disableCustomEvent() {
        TreasureData.sharedInstance().disableCustomEvent();
    }

    private void isCustomEventEnabled(CallbackContext callback) {
        final int enabled = TreasureData.sharedInstance().isCustomEventEnabled() ? 1 : 0;
        callback.success(enabled);
    }

    private void enableInAppPurchaseEvent() {
        TreasureData.sharedInstance().enableInAppPurchaseEvent();
    }

    private void disableInAppPurchaseEvent() {
        TreasureData.sharedInstance().disableInAppPurchaseEvent();
    }

    private void isInAppPurchaseEventEnabled(CallbackContext callback) {
        final int enabled = TreasureData.sharedInstance().isInAppPurchaseEventEnabled() ? 1 : 0;
        callback.success(enabled);
    }

    private void disableAppInstalledEvent() {
        TreasureData.sharedInstance().disableAppInstalledEvent();
    }

    private void disableAppOpenEvent() {
        TreasureData.sharedInstance().disableAppOpenEvent();
    }

    private void disableAppUpdatedEvent() {
        TreasureData.sharedInstance().disableAppUpdatedEvent();
    }

    private void enableRetryUploading() {
        TreasureData.sharedInstance().enableAutoRetryUploading();
    }

    private void disableRetryUploading() {
        TreasureData.sharedInstance().disableAutoRetryUploading();
    }

    private void enableEventCompression() {
        TreasureData.enableEventCompression();
    }

    private void disableEventCompression() {
        TreasureData.disableEventCompression();
    }

    private void enableLogging() {
        TreasureData.enableLogging();
    }

    private void disableLogging() {
        TreasureData.disableLogging();
    }

    private void isFirstRun(CallbackContext callback) {
        final int isFirstRun = TreasureData.sharedInstance().isFirstRun(this.cordova.getActivity().getApplicationContext()) ? 1 : 0;
        callback.success(isFirstRun);
    }

    private void clearFirstRun() {
        TreasureData.sharedInstance().clearFirstRun(this.cordova.getActivity().getApplicationContext());
    }

    private void getUUID(CallbackContext callback) {
        callback.success(TreasureData.sharedInstance().getUUID());
    }

    private Map<String, Object> toMap(JSONObject object) throws JSONException {
        Map<String, Object> map = new HashMap();
        Iterator keys = object.keys();
        while (keys.hasNext()) {
            String key = (String) keys.next();
            map.put(key, this.fromJson(object.get(key)));
        }
        return map;
    }

    private Object fromJson(Object json) throws JSONException {
        if (json == JSONObject.NULL) {
            return null;
        } else if (json instanceof JSONObject) {
            return this.toMap((JSONObject) json);
        } else if (json instanceof JSONArray) {
            return this.toList((JSONArray) json);
        } else {
            return json;
        }
    }

    private List toList(JSONArray array) throws JSONException {
        List list = new ArrayList();
        for (int i = 0; i < array.length(); i++) {
            list.add(this.fromJson(array.get(i)));
        }
        return list;
    }

    class DefaultCallback implements TDCallback {
        String eventName;
        CallbackContext callbackContext;

        DefaultCallback(String eventName) {
            this.eventName = eventName;
        }

        DefaultCallback(String eventName, CallbackContext callbackContext) {
            this.eventName = eventName;
            this.callbackContext = callbackContext;
        }

        @Override
        public void onSuccess() {
            String message = "TreasureData:onSuccess[" + eventName + "]";
            if (this.callbackContext != null) {
                this.callbackContext.success(message);
            } else {
                Log.d(TAG, message);
            }
        }

        @Override
        public void onError(String errorCode, Exception e) {
            String message = "TreasureData:onError[" + eventName + ": errorCode=" + errorCode + ", ex=" + e + "]";
            if (this.callbackContext != null) {
                this.callbackContext.error(message);
            } else {
                Log.e(TAG, message);
            }
        }
    }
}
