App.info({
  id: 'com.pe.hupsort.com',
  name: 'Hupsort',
  description: 'Red Social para Personas con ETS',
  author: 'Grupo DDV - Daniel Delgadillo Huaman ',
  email: 'danieldelgadilloh@gmail.com',
  website: 'http://www.hupsort.com'
});
// Set up resources such as icons and launch screens.
App.icons({
  'android_mdpi': 'public/res/drawable-mdpi/ic_launcher.png',
  'android_hdpi': 'public/res/drawable-hdpi/ic_launcher.png',
  'android_xhdpi': 'public/res/drawable-xhdpi/ic_launcher.png',
  'android_xxhdpi': 'public/res/drawable-xxhdpi/ic_launcher.png',
  'android_xxxhdpi': 'public/res/drawable-xxxhdpi/ic_launcher.png'
});

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('Orientation', 'portrait');
App.setPreference('SplashScreen', 'CDVSplashScreen');
App.setPreference('AutoHideSplashScreen', false);
App.setPreference('SplashScreenDelay', '1000');
