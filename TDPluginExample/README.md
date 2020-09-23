# TD Mobile SDK - Cordova Demo App

## Usage

### Add plugin
```
$ cordova plugin add td-cordova-sdk
```

### Add/Remove platforms

Add a platform if you don't have one
```
$ cordova platform add android

$ cordova platform add ios
```

### Other plugins

We are using some other plugins in this example

Dialog

```
$ cordova plugin add cordova-plugin-dialogs
```

Device
```
$ cordova plugin add cordova-plugin-device
```

### Build

```
$ cordova build android

$ cordova build ios
```

Run with emulator

```
$ cordova emulate android
```

### Remove plugin
```
$ cordova plugin remove com.treasuredata.cordova
```

### Troubleshoot

- If you have a problem with building project, consider to `remove`/`add` platforms again and rebuild it.

- More information about the commands can be found here: [Cordova Command-line-interface (CLI)](https://cordova.apache.org/docs/en/latest/reference/cordova-cli/index.html)

