var demo = (function () {
    var model = {
        config: {
            apiEndpoint: "https://us01.records.in.treasuredata.com",
            apiKey: "1/xxxxxxxxxx",
            defaultDatabase: "defaultDatabase",
            defaultTable: "defaultTable",
            cdpEndpoint: "https://cdp.in.treasuredata.com",
        },
        customConfig: {
            database: "_sondo",
            table: "cordova_test_2023",

            audienceTokens: [ "xxxx, xxxx", ],
            segmentKeys: {
                user_id: "value",
                td_client_id: "value",
            },
            defaultValueKey: "Key",
            defaultValueValue: "Value"
        },

        storageKey: 'configs',

        present: function present(proposal) {
            this.type = proposal.type || null;

            if (
                this.type === constants.actionTypes.addEvent ||
                this.type === constants.actionTypes.uploadEvents
            ) {
                this.success = proposal.payload.success;
            } else if (this.type === constants.actionTypes.checkStatus) {
                this.enabled = proposal.payload.enabled;
            } else if (this.type === constants.actionTypes.resetCheckStatus) {
                this.enabled = false;
                this.type = null;
            } else if (this.type === constants.actionTypes.showInfo) {
                this.infoValue = proposal.payload.value;
            } else if (this.type === constants.actionTypes.updateConfigs) {
                var configs = proposal.configs || {}

                if (configs.apiEndpoint) {
                    this.config.apiEndpoint = configs.apiEndpoint
                }

                if (configs.apiKey) {
                    this.config.apiKey = configs.apiKey
                }

                if (configs.database) {
                    this.customConfig.database = configs.database
                }

                if (configs.table) {
                    this.customConfig.table = configs.table
                }

                if (configs.cdpEndpoint) {
                    this.config.cdpEndpoint = configs.cdpEndpoint
                }

                if (configs.audienceTokens) {
                    this.customConfig.audienceTokens = configs.audienceTokens.split(',')
                }

                if (configs.segmentKeys) {
                    this.customConfig.segmentKeys = JSON.parse(configs.segmentKeys)
                }

                localStorage.setItem(this.storageKey, JSON.stringify({
                    config: this.config,
                    customConfig: this.customConfig
                }))
            } else if (this.type === constants.actionTypes.init) {
                var configs = JSON.parse(localStorage.getItem(this.storageKey))

                if (configs) {
                    this.config = configs.config
                    this.customConfig = configs.customConfig
                }

                cordova.plugins.TreasureDataPlugin.setup(model.config);
            } else if (this.type === constants.actionTypes.iap) {
                this.success = proposal.success

                if (this.success) {
                    this.purchasedId = proposal.product.id
                }
            }

            state.representation(this);
        },
    };

    // all actions
    var actions = {
        start: function () {
            model.present({
                type: constants.actionTypes.init
            })
        },

        purchase: function () {
            var productId
            if (device.platform === "Android") {
                productId = 'gas'
            } else if (device.platform === "iOS") {
                productId = 'com.treasuredata.iaptest.consumable1'
            }

            inAppPurchase
                .getProducts([ productId ])
                .then(function () {
                    inAppPurchase.buy(productId)
                    .then(function (data) {
                        return inAppPurchase.consume(data.productType, data.receipt, data.signature);
                    })
                    .then(function() {
                        model.present({
                            type: constants.actionTypes.iap,
                            success: true,
                            product: {
                                id: productId
                            }
                        })
                    })
                    .catch(function (err) {
                        model.present({
                            type: constants.actionTypes.iap,
                            success: false
                        })
                    })

                })
        },

        updateConfigs: function (configs) {
            model.present({
                type: constants.actionTypes.updateConfigs,
                configs: configs
            })
        },

        addEvent: function () {
            cordova.plugins.TreasureDataPlugin.addEvent(
                {
                    demo_name: "cordova plugin",
                    event_name: "addEvent",
                    platform: device.platform
                },
                model.customConfig.table,
                model.customConfig.database
            );
        },

        addEventWithCallback: function () {
            cordova.plugins.TreasureDataPlugin.addEventWithCallback(
                {
                    demo_name: "cordova plugin",
                    event_name: "addEvent",
                    platform: device.platform
                },
                model.customConfig.table,
                model.customConfig.database,
                function success() {
                    model.present({
                        type: constants.actionTypes.addEvent,
                        payload: { success: true },
                    });
                },
                function error() {
                    model.present({
                        type: constants.actionTypes.addEvent,
                        payload: { success: false },
                    });
                }
            );
        },

        uploadEvents: function () {
            cordova.plugins.TreasureDataPlugin.uploadEvents();
        },

        uploadEventsWithCallback: function () {
            cordova.plugins.TreasureDataPlugin.uploadEventsWithCallback(
                function success(msg) {
                    model.present({
                        type: constants.actionTypes.uploadEvents,
                        payload: { success: true },
                    });
                },
                function error(err) {
                    model.present({
                        type: constants.actionTypes.uploadEvents,
                        payload: { success: false },
                    });
                }
            );
        },

        fetchUserSegments: function () {
            cordova.plugins.TreasureDataPlugin.fetchUserSegments(
                model.customConfig.audienceTokens,
                model.customConfig.segmentKeys,
                function success(json) {
                    model.present({
                        type: constants.actionTypes.showInfo,
                        payload: { value: json },
                    });
                },
                function error(err) {
                    model.present({
                        type: constants.actionTypes.showInfo,
                        payload: { value: "failed to fetch user segments" },
                    });
                }
            );
        },

        setDefaultValue: function () {
            cordova.plugins.TreasureDataPlugin.setDefaultValue(
                model.customConfig.defaultValueKey,
                model.customConfig.defaultValueValue,
                model.config.defaultDatabase,
                model.config.defaultTable
            );
        },

        getDefaultValue: function () {
            cordova.plugins.TreasureDataPlugin.defaultValue(
                model.customConfig.defaultValueKey,
                model.config.defaultDatabase,
                model.config.defaultTable,
                function success(value) {
                    model.present({
                        type: constants.actionTypes.showInfo,
                        payload: { value: value },
                    });
                }
            );
        },

        removeDefaultValue: function () {
            cordova.plugins.TreasureDataPlugin.removeDefaultValue(
                model.customConfig.defaultValueKey,
                model.config.defaultDatabase,
                model.config.defaultTable
            )
        },

        enableAppLifecycleEvent: function () {
            console.log("enable");
            cordova.plugins.TreasureDataPlugin.enableAppLifecycleEvent();
        },
        disableAppLifecycleEvent: function () {
            console.log("disable");
            cordova.plugins.TreasureDataPlugin.disableAppLifecycleEvent();
        },
        isAppLifecycleEventEnabled: function () {
            cordova.plugins.TreasureDataPlugin.isAppLifecycleEventEnabled(
                function success(enabled) {
                    model.present({
                        type: constants.actionTypes.checkStatus,
                        payload: { enabled: enabled },
                    });
                }
            );
        },

        enableAutoAppendUniqId: function () {
            cordova.plugins.TreasureDataPlugin.enableAutoAppendUniqId();
        },

        disableAutoAppendUniqId: function () {
            cordova.plugins.TreasureDataPlugin.disableAutoAppendUniqId();
        },

        resetUniqId: function () {
            cordova.plugins.TreasureDataPlugin.resetUniqId();
        },

        enableAutoAppendAppInformation: function () {
            cordova.plugins.TreasureDataPlugin.enableAutoAppendAppInformation();
        },

        disableAutoAppendAppInformation: function () {
            cordova.plugins.TreasureDataPlugin.disableAutoAppendAppInformation();
        },

        enableAutoAppendModelInformation: function () {
            cordova.plugins.TreasureDataPlugin.enableAutoAppendModelInformation();
        },

        disableAutoAppendModelInformation: function () {
            cordova.plugins.TreasureDataPlugin.disableAutoAppendModelInformation();
        },

        enableAutoAppendLocaleInformation: function () {
            cordova.plugins.TreasureDataPlugin.enableAutoAppendLocaleInformation();
        },

        disableAutoAppendLocaleInformation: function () {
            cordova.plugins.TreasureDataPlugin.disableAutoAppendLocaleInformation();
        },

        enableAutoAppendRecordUUID: function () {
            cordova.plugins.TreasureDataPlugin.enableAutoAppendRecordUUID()
        },

        disableAutoAppendRecordUUID: function () {
            cordova.plugins.TreasureDataPlugin.disableAutoAppendRecordUUID();
        },

        enableAutoAppendAdvertisingIdentifier: function () {
            cordova.plugins.TreasureDataPlugin.enableAutoAppendAdvertisingIdentifier();
        },

        disableAutoAppendAdvertisingIdentifier: function () {
            cordova.plugins.TreasureDataPlugin.disableAutoAppendAdvertisingIdentifier();
        },

        startGlobalSession: function () {
            cordova.plugins.TreasureDataPlugin.startGlobalSession();
        },

        endGlobalSession: function () {
            cordova.plugins.TreasureDataPlugin.endGlobalSession();
        },

        getGlobalSessionId: function () {
            cordova.plugins.TreasureDataPlugin.getGlobalSessionId(
                function success(sid) {
                    model.present({
                        type: constants.actionTypes.showInfo,
                        payload: {
                            value: sid,
                        },
                    });
                }
            );
        },

        resetGlobalSessionId: function () {
            cordova.plugins.TreasureDataPlugin.resetGlobalSessionId();
        },

        startSession: function () {
            cordova.plugins.TreasureDataPlugin.startSession(
                model.customConfig.table,
                model.customConfig.database
            );
        },

        endSession: function () {
            cordova.plugins.TreasureDataPlugin.endSession(
                model.customConfig.table,
                model.customConfig.database
            );
        },

        getSessionId: function () {
            cordova.plugins.TreasureDataPlugin.getSessionId(function success(
                sid
            ) {
                model.present({
                    type: constants.actionTypes.showInfo,
                    payload: {
                        value: sid,
                    },
                });
            });
        },

        enableCustomEvent: function () {
            cordova.plugins.TreasureDataPlugin.enableCustomEvent();
        },

        disableCustomEvent: function () {
            cordova.plugins.TreasureDataPlugin.disableCustomEvent();
        },

        isCustomEventEnabled: function () {
            cordova.plugins.TreasureDataPlugin.isCustomEventEnabled(
                function success(enabled) {
                    model.present({
                        type: constants.actionTypes.checkStatus,
                        payload: { enabled: enabled },
                    });
                }
            );
        },

        enableInAppPurchaseEvent: function () {
            cordova.plugins.TreasureDataPlugin.enableInAppPurchaseEvent();
        },

        disableInAppPurchaseEvent: function () {
            cordova.plugins.TreasureDataPlugin.disableInAppPurchaseEvent();
        },

        isInAppPurchaseEventEnabled: function () {
            cordova.plugins.TreasureDataPlugin.isInAppPurchaseEventEnabled(
                function success(enabled) {
                    model.present({
                        type: constants.actionTypes.checkStatus,
                        payload: { enabled: enabled },
                    });
                }
            );
        },

        disableAppInstalledEvent: function () {
            cordova.plugins.TreasureDataPlugin.disableAppInstalledEvent();
        },
        disableAppOpenEvent: function () {
            cordova.plugins.TreasureDataPlugin.disableAppOpenEvent();
        },
        disableAppUpdatedEvent: function () {
            cordova.plugins.TreasureDataPlugin.disableAppUpdatedEvent();
        },

        enableRetryUploading: function () {
            cordova.plugins.TreasureDataPlugin.enableRetryUploading();
        },

        disableRetryUploading: function () {
            cordova.plugins.TreasureDataPlugin.disableRetryUploading();
        },
        enableEventCompression: function () {
            cordova.plugins.TreasureDataPlugin.enableEventCompression();
        },

        disableEventCompression: function () {
            cordova.plugins.TreasureDataPlugin.disableEventCompression();
        },
        enableLogging: function () {
            cordova.plugins.TreasureDataPlugin.enableLogging();
        },

        disableLogging: function () {
            cordova.plugins.TreasureDataPlugin.disableLogging();
        },

        isFirstRun: function () {
            cordova.plugins.TreasureDataPlugin.isFirstRun(function success(
                yes
            ) {
                var text = yes ? "Yes" : "No";
                model.present({
                    type: constants.actionTypes.showInfo,
                    payload: { value: text },
                });
            });
        },

        clearFirstRun: function () {
            cordova.plugins.TreasureDataPlugin.clearFirstRun();
        },

        getUUID: function () {
            cordova.plugins.TreasureDataPlugin.getUUID(function success(uuid) {
                model.present({
                    type: constants.actionTypes.showInfo,
                    payload: { value: uuid },
                });
            });
        },

        resetCheckStatus: function () {
            model.present({
                type: constants.actionTypes.resetCheckStatus,
            });
        },
    };

    var state = {
        representation: function representation(m) {
            view.updateConfigs(m.config, m.customConfig)
            if (m.type === constants.actionTypes.addEvent) {
                var text = m.success ? "success" : "failed";
                view.showStatus(text);
            } else if (m.type === constants.actionTypes.uploadEvents) {
                var text = m.success ? "success" : "failed";
                view.showStatus(text);
            } else if (m.type === constants.actionTypes.checkStatus) {
                var text = m.enabled ? "enabled" : "disabled";
                view.showStatus(text);
            } else if (m.type === constants.actionTypes.showInfo) {
                view.showStatus(m.infoValue);
            } else if (m.type === constants.actionTypes.iap) {
                var text = m.success ? ["Purchased product: ", m.purchasedId].join("") : "Purchasing failed";
                view.showStatus(text)
            }

            this.nextAction(m);
        },

        nextAction: function nextAction(m) {
            if (m.type === constants.actionTypes.checkStatus) {
                actions.resetCheckStatus();
            }
        },
    };

    function getInputElement(name) {
        return document.querySelector('input[name="' + name + '"]')
    }

    var view = {
        updateConfigs: function updateConfigs (config, customConfig) {
            var apiEndpointEl = getInputElement('apiEndpoint')
            var apiKeyEl = getInputElement('apiKey')
            var databaseEl = getInputElement('database')
            var tableEl = getInputElement('table')
            var cdpEndpointEl = getInputElement('cdpEndpoint')
            var audienceTokensEl = getInputElement('audienceTokens')
            var segmentKeysEl = getInputElement('segmentKeys')

            apiEndpointEl.value = config.apiEndpoint
            apiKeyEl.value = config.apiKey
            databaseEl.value = customConfig.database
            tableEl.value = customConfig.table
            cdpEndpointEl.value = config.cdpEndpoint
            audienceTokensEl.value = customConfig.audienceTokens.join(',')
            segmentKeysEl.value = JSON.stringify(customConfig.segmentKeys)
        },

        showStatus: function showStatus(text) {
            navigator.notification.alert(text);
        },
    };

    return {
        actions: actions
    };
})();
