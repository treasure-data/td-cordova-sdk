# TD Mobile SDK - Cordova Demo App

## Installation
### Install plugins
You must install TreasureDataPlugin and Diaglog plugin
Add plugin
```
$ cordova plugin add --link ..
```

Dialog plugin
```
$ cordova plugin add cordova-plugin-dialogs
```

### Android
Build
```
$ cordova build android
```

Run with emulator
```
$ cordova emulate android
```

### iOS
Prepare
```
$ cordova prepare ios
```
If you encounter error while preparing iOS. Just re-add the platform
```
$ cordova platforms remove ios
$ cordova platforms add ios
```

Then open TDPluginExample/platforms/ios/TDPluginExample.xcworkspace in Xcode and run.
