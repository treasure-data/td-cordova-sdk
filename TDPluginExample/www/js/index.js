/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

  app.onDeviceReady();
}

var app = {
    onDeviceReady: function () {
        this.setupEventListeners();

        demo.actions.start();
    },

    query: function query(selector) {
        return document.querySelector(selector);
    },

    registerClickEvent: function registerClickEvent(element, handler) {
        element.addEventListener("click", handler);
    },

    setupEventListeners: function setupEventListeners() {
        var handlers = demo.actions;

        var addEventBtn = this.query(constants.ADD_EVENT_CLASS),
            addEventWithCbBtn = this.query(constants.ADD_EVENT_WITH_CB_CLASS),
            uploadEventsBtn = this.query(constants.UPLOAD_EVENTS_CLASS),
            uploadEventsWithCbBtn = this.query(
                constants.UPLOAD_EVENTS_WITH_CB_CLASS
            );

        var enableLifecycleBtn = this.query(constants.ENABLE_LIFECYCLE_CLASS),
            disableLifecycleBtn = this.query(constants.DISABLE_LIFECYCLE_CLASS),
            lifecycleStatusBtn = this.query(constants.LIFECYCLE_STATUS_CLASS);

        var enableUniqIdBtn = this.query(constants.ENABLE_UNIQID_CLASS),
            disableUniqIdBtn = this.query(constants.DISABLE_UNIQID_CLASS),
            resetUniqIdBtn = this.query(constants.RESET_UNIQID_CLASS);

        var enableAppInfoBtn = this.query(constants.ENABLE_APPINFO_CLASS),
            disableAppInfoBtn = this.query(constants.DISABLE_APPINFO_CLASS);

        var enableModelInfoBtn = this.query(constants.ENABLE_MODELINFO_CLASS),
            disableModelInfoBtn = this.query(constants.DISABLE_MODELINFO_CLASS);

        var enableLocaleInfoBtn = this.query(constants.ENABLE_LOCALEINFO_CLASS),
            disableLocaleInfoBtn = this.query(
                constants.DISABLE_LOCALEINFO_CLASS
            );

        var enableRecordUUIDBtn = this.query(constants.ENABLE_RECORDUUID_CLASS),
            disableRecordUUIDBtn = this.query(
                constants.DISABLE_RECORDUUID_CLASS
            );

        var enableAdsidBtn = this.query(constants.ENABLE_ADSID_CLASS),
            disableAdsidBtn = this.query(constants.DISABLE_ADSID_CLASS);

        var enableGlobalSessionBtn = this.query(
                constants.ENABLE_GLOBALSESSION_CLASS
            ),
            disableGlobalSessionBtn = this.query(
                constants.DISABLE_GLOBALSESSION_CLASS
            ),
            getGlobalSessionBtn = this.query(constants.GET_GLOBALSESSION_CLASS),
            resetGlobalSessionBtn = this.query(constants.RESET_GLOBALSESSION_CLASS);

        var enableSessionBtn = this.query(constants.ENABLE_SESSION_CLASS),
            disableSessionBtn = this.query(constants.DISABLE_SESSION_CLASS),
            getSessionBtn = this.query(constants.GET_SESSION_CLASS);

        var enableCustomEventBtn = this.query(
                constants.ENABLE_CUSTOMEVENT_CLASS
            ),
            disableCustomEventBtn = this.query(
                constants.DISABLE_CUSTOMEVENT_CLASS
            );

        var enableInAppBtn = this.query(constants.ENABLE_INAPP_CLASS),
            disableInAppBtn = this.query(constants.DISABLE_INAPP_CLASS),
            inappStatusBtn = this.query(constants.INAPP_STATUS_CLASS);

        var disableAppInstalledBtn = this.query(
                constants.DISABLE_APPINSTALLED_CLASS
            ),
            disableAppOpenBtn = this.query(constants.DISABLE_APPOPEN_CLASS),
            disableAppUpdatedBtn = this.query(
                constants.DISABLE_APPUPDATED_CLASS
            );

        var enableRetryBtn = this.query(constants.ENABLE_RETRY_CLASS),
            disableRetryBtn = this.query(constants.DISABLE_RETRY_CLASS);

        var enableEventCompressionBtn = this.query(
                constants.ENABLE_EVENTCOMPRESSION_CLASS
            ),
            disableEventCompressionBtn = this.query(
                constants.DISABLE_EVENTCOMPRESSION_CLASS
            );

        var enableLoggingBtn = this.query(constants.ENABLE_LOGGING_CLASS),
            disableLoggingBtn = this.query(constants.DISABLE_LOGGING_CLASS);

        var isFirstRunBtn = this.query(constants.IS_FIRSTRUN_CLASS),
            clearFirstRunBtn = this.query(constants.CLEAR_FIRSTRUN_CLASS);

        var getUUIDBtn = this.query(constants.GET_UUID_CLASS);
        var fetchUserSegmentsBtn = this.query(constants.FETCH_USERSEGMENTS_CLASS);

        var setDefaultValueBtn = this.query(constants.SET_DEFAULT_VALUE_CLASS);
        var getDefaultValueBtn = this.query(constants.GET_DEFAULT_VALUE_CLASS);
        var removeDefaultValueBtn = this.query(constants.REMOVE_DEFAULT_VALUE_CLASS);

        var updateConfigBtn = this.query(constants.UPDATE_CONFIG_CLASS)
        var iapBtn = this.query(constants.IAP_CLASS)

        this.registerClickEvent(addEventBtn, handlers.addEvent);
        this.registerClickEvent(
            addEventWithCbBtn,
            handlers.addEventWithCallback
        );
        this.registerClickEvent(uploadEventsBtn, handlers.uploadEvents);
        this.registerClickEvent(
            uploadEventsWithCbBtn,
            handlers.uploadEventsWithCallback
        );
        this.registerClickEvent(
            enableLifecycleBtn,
            handlers.enableAppLifecycleEvent
        );
        this.registerClickEvent(
            disableLifecycleBtn,
            handlers.disableAppLifecycleEvent
        );
        this.registerClickEvent(
            lifecycleStatusBtn,
            handlers.isAppLifecycleEventEnabled
        );
        this.registerClickEvent(
            enableUniqIdBtn,
            handlers.enableAutoAppendUniqId
        );
        this.registerClickEvent(
            disableUniqIdBtn,
            handlers.disableAutoAppendUniqId
        );
        this.registerClickEvent(resetUniqIdBtn, handlers.resetUniqId);

        this.registerClickEvent(
            enableAppInfoBtn,
            handlers.enableAutoAppendAppInformation
        );
        this.registerClickEvent(
            disableAppInfoBtn,
            handlers.disableAutoAppendAppInformation
        );
        this.registerClickEvent(
            enableModelInfoBtn,
            handlers.enableAutoAppendModelInformation
        );
        this.registerClickEvent(
            disableModelInfoBtn,
            handlers.disableAutoAppendModelInformation
        );

        this.registerClickEvent(
            enableLocaleInfoBtn,
            handlers.enableAutoAppendLocaleInformation
        );
        this.registerClickEvent(
            disableLocaleInfoBtn,
            handlers.disableAutoAppendLocaleInformation
        );
        this.registerClickEvent(
            enableRecordUUIDBtn,
            handlers.enableAutoAppendRecordUUID
        );
        this.registerClickEvent(
            disableRecordUUIDBtn,
            handlers.disableAutoAppendRecordUUID
        );
        this.registerClickEvent(
            enableAdsidBtn,
            handlers.enableAutoAppendAdvertisingIdentifier
        );
        this.registerClickEvent(
            disableAdsidBtn,
            handlers.disableAutoAppendAdvertisingIdentifier
        );
        this.registerClickEvent(
            enableGlobalSessionBtn,
            handlers.startGlobalSession
        );
        this.registerClickEvent(
            disableGlobalSessionBtn,
            handlers.endGlobalSession
        );
        this.registerClickEvent(
            getGlobalSessionBtn,
            handlers.getGlobalSessionId
        );
        this.registerClickEvent(
            resetGlobalSessionBtn,
            handlers.resetGlobalSessionId
        );

        this.registerClickEvent(enableSessionBtn, handlers.startSession);
        this.registerClickEvent(disableSessionBtn, handlers.endSession);
        this.registerClickEvent(getSessionBtn, handlers.getSessionId);
        this.registerClickEvent(
            enableCustomEventBtn,
            handlers.enableCustomEvent
        );
        this.registerClickEvent(
            disableCustomEventBtn,
            handlers.disableCustomEvent
        );
        this.registerClickEvent(
            enableInAppBtn,
            handlers.enableInAppPurchaseEvent
        );
        this.registerClickEvent(
            disableInAppBtn,
            handlers.disableInAppPurchaseEvent
        );
        this.registerClickEvent(
            inappStatusBtn,
            handlers.isInAppPurchaseEventEnabled
        );

        this.registerClickEvent(
            disableAppInstalledBtn,
            handlers.disableAppInstalledEvent
        );
        this.registerClickEvent(
            disableAppOpenBtn,
            handlers.disableAppOpenEvent
        );
        this.registerClickEvent(
            disableAppUpdatedBtn,
            handlers.disableAppUpdatedEvent
        );
        this.registerClickEvent(enableRetryBtn, handlers.enableRetryUploading);
        this.registerClickEvent(
            disableRetryBtn,
            handlers.disableRetryUploading
        );
        this.registerClickEvent(
            enableEventCompressionBtn,
            handlers.enableEventCompression
        );
        this.registerClickEvent(
            disableEventCompressionBtn,
            handlers.disableEventCompression
        );
        this.registerClickEvent(enableLoggingBtn, handlers.enableLogging);
        this.registerClickEvent(disableLoggingBtn, handlers.disableLogging);
        this.registerClickEvent(isFirstRunBtn, handlers.isFirstRun);
        this.registerClickEvent(clearFirstRunBtn, handlers.clearFirstRun);
        this.registerClickEvent(getUUIDBtn, handlers.getUUID);
        this.registerClickEvent(fetchUserSegmentsBtn, handlers.fetchUserSegments);
        
        this.registerClickEvent(setDefaultValueBtn, handlers.setDefaultValue);
        this.registerClickEvent(getDefaultValueBtn, handlers.getDefaultValue);
        this.registerClickEvent(removeDefaultValueBtn, handlers.removeDefaultValue);

        this.registerClickEvent(updateConfigBtn, function (evt) {
            evt.preventDefault()

            function getInputElement(name) {
                return document.querySelector('input[name="' + name + '"]')
            }

            var apiEndpointEl = getInputElement('apiEndpoint')
            var apiKeyEl = getInputElement('apiKey')
            var databaseEl = getInputElement('database')
            var tableEl = getInputElement('table')
            var cdpEndpointEl = getInputElement('cdpEndpoint')
            var audienceTokensEl = getInputElement('audienceTokens')
            var segmentKeysEl = getInputElement('segmentKeys')

            handlers.updateConfigs({
                apiEndpoint: apiEndpointEl.value,
                apiKey: apiKeyEl.value,
                database: databaseEl.value,
                table: tableEl.value,
                cdpEndpoint: cdpEndpointEl.value,
                audienceTokens: audienceTokensEl.value,
                segmentKeys: segmentKeysEl.value
            })
        })

        this.registerClickEvent(iapBtn, handlers.purchase)
    },
};
