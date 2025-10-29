# Table of Content
+ [About the Repo](#lift)
+ [Installation and Tech-stack](#installation)
+ [Build Process](#build)

# Lift 

<img src="assets/splash-icon.png" alt="Lift App Icon" width="60"/>

Lift is a ride sharing app, which offers users to add their ride details besides viewing all available rides. 

User A can offer rides to the other users going from one place to another. User B can view all the available rides as per their needs and contact the person to avail the ride.

# Installation 
This mobile app is developed using [React-Native](https://reactnative.dev/) and [Expo](https://docs.expo.dev/more/create-expo/).

The entire code-base is available on [GitHub](https://github.com/rajputkamal/lift_fe).

```bash
git clone https://github.com/rajputkamal/lift_fe
```

Use the node package manager [NPM](https://www.npmjs.com/) to install all dependencies.

```bash
npm install
```

To run the mobile app in simulators or real device.
```bash
npm start
```

# Build
+ Check all neccessary permissions; such as Location, Camera etc
+ Add App Name & identifier in `app.json`.
+ Add environment variables.
+ Add icons & Splah screen.
+ Always update version numbers, buildNumber in iOS config and versionCode in android config in `app.json` file.
+ [EAS](https://expo.dev/eas) is used to build android and iOS `.apk` build types.
+ Steps to build refer Expo docs [link](https://docs.expo.dev/build/setup/).
+ To install EAS CLI globally.
```bash
npm install -g eas-cli
```
+ To login in EAS CLI (Assumed you already have a account on Expo)
```bash
eas login
```
+ To run build config commands
```bash
eas build:configure
eas build -p android --profile preview
eas build -p ios --profile preview
```