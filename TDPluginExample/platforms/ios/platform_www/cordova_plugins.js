cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "com.treasuredata.cordova.TreasureDataPlugin",
      "file": "plugins/com.treasuredata.cordova/www/TreasureDataPlugin.js",
      "pluginId": "com.treasuredata.cordova",
      "clobbers": [
        "cordova.plugins.TreasureDataPlugin"
      ]
    },
    {
      "id": "cordova-plugin-dialogs.notification",
      "file": "plugins/cordova-plugin-dialogs/www/notification.js",
      "pluginId": "cordova-plugin-dialogs",
      "merges": [
        "navigator.notification"
      ]
    }
  ];
  module.exports.metadata = {
    "com.treasuredata.cordova": "0.0.1",
    "cordova-plugin-dialogs": "2.0.2",
    "cordova-plugin-whitelist": "1.3.4"
  };
});