# TD Mobile SDK - Cordova Demo App

## Installation
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
