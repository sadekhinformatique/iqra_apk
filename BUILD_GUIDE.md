# Building RADIO IQRA BF Mobile Apps

This guide explains how to build the mobile application for Android and iOS.

## ⚠️ Important: This is NOT a Web Application

RADIO IQRA BF is a **mobile application** designed for Android and iOS devices. It cannot be deployed to Netlify or similar web hosting platforms.

## 📱 Building for Mobile Platforms

### Option 1: Build APK for Android (Recommended)

1. **Install EAS CLI:**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo:**
   ```bash
   eas login
   ```
   Create a free account at https://expo.dev if you don't have one.

3. **Configure EAS Build:**
   ```bash
   cd c:\Users\dsp\Desktop\IQRA\application
   eas build:configure
   ```

4. **Build APK:**
   ```bash
   eas build --platform android --profile preview
   ```

5. **Download APK:**
   - The build will take 10-20 minutes
   - You'll receive a link to download the APK file
   - Install the APK on any Android device

### Option 2: Build for iOS

> **Requirements:**
> - Mac computer with Xcode
> - Apple Developer account ($99/year)

```bash
eas build --platform ios --profile preview
```

### Option 3: Test with Expo Go (No Build Required)

For quick testing without building:

1. **Install Expo Go** on your phone:
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent
   - iOS: https://apps.apple.com/app/expo-go/id982107779

2. **Start development server:**
   ```bash
   npm start
   ```

3. **Scan QR code** with Expo Go app

## 🌐 If You Want a Web Version

If you want to create a web version of this radio player, you would need to:

1. Add web dependencies:
   ```bash
   npx expo install react-dom react-native-web @expo/metro-runtime
   ```

2. Build for web:
   ```bash
   npx expo export -p web
   ```

However, note that:
- Some mobile features won't work on web (lock screen controls, etc.)
- The UI is optimized for mobile devices
- A dedicated web player would be better for web deployment

## 📦 Distribution Options

### For Android:
- **Direct APK**: Share the APK file directly with users
- **Google Play Store**: Submit the app bundle (.aab) to Google Play Console

### For iOS:
- **TestFlight**: Distribute to beta testers
- **App Store**: Submit to Apple App Store

## 🔗 Useful Links

- **Expo EAS Build Docs**: https://docs.expo.dev/build/introduction/
- **Google Play Console**: https://play.google.com/console
- **Apple App Store Connect**: https://appstoreconnect.apple.com

## ❓ Need Help?

If you want to:
- Build the APK file → Use EAS Build (instructions above)
- Test on your phone → Use Expo Go (instructions above)
- Create a web version → Let me know and I'll help convert it
