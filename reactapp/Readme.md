# Description
This is repository for client side - ReactNative application. It utilizes REST api base on IBM NodeJs runtime, IBM IoT service, IBM Cloudant.

# Prerequisite
1. You have to install `react-native` and all depedencies following [this guide](https://facebook.github.io/react-native/docs/getting-started.html)
2. Install `rnpm`: `npm i -g rnpm`

# Installation
1. Clone this repository 
2. Change to the repository folder
3. Run `npm install` to install dependecies
4. Run `rnpm link` to link icons
5. Run `rnpm link assets` to link fonts
6. Copy `src/config.example.js` to `src/config.js` and update the default variables in `config.js`
7. Connect your device or virual machine. Run `adb devices` to verify that your device is connected.
8. Run `react-native run-android` or `react-native run-ios` depending on your device.
