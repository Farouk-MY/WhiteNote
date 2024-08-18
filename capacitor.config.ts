import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.devfm.whitenote',
  appName: 'White Note',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      launchFadeOutDuration: 3000,
      backgroundColor: "#000",
      androidSplashResourceName: "White Note",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#ffff",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "White Note",
      useDialog: true,
    },
  },
};

export default config;
