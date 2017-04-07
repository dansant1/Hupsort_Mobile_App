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
  'android_xxxhdpi': 'public/res/drawable-xxxhdpi/ic_launcher.png',
  'android_ldpi_portrait': 'public/res/splash/200x320px.png',
  'android_mdpi_landscape': 'public/res/splash/480x320px.png',
  'android_hdpi_portrait': 'public/res/splash/480x800px.png',
  'android_hdpi_landscape': 'public/res/splash/800x480px.png',
  'android_xhdpi_portrait': 'public/res/splash/1280x720.png',

});

App.accessRule('*')

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('Orientation', 'portrait');
App.setPreference('SplashScreen', 'CDVSplashScreen');
App.setPreference('AutoHideSplashScreen', false);
App.setPreference('SplashScreenDelay', '2000');
