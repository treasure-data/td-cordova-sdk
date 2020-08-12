cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-dialogs.notification",
      "file": "plugins/cordova-plugin-dialogs/www/notification.js",
      "pluginId": "cordova-plugin-dialogs",
      "merges": [
        "navigator.notification"
      ]
    },
    {
      "id": "cordova-plugin-dialogs.notification_android",
      "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
      "pluginId": "cordova-plugin-dialogs",
      "merges": [
        "navigator.notification"
      ]
    },
    {
      "id": "com.treasuredata.cordova.TreasureDataPlugin",
      "file": "plugins/com.treasuredata.cordova/www/TreasureDataPlugin.js",
      "pluginId": "com.treasuredata.cordova",
      "clobbers": [
        "cordova.plugins.TreasureDataPlugin"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-dialogs": "2.0.2",
    "com.treasuredata.cordova": "0.0.1"
  };
});