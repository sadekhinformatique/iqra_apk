# RADIO IQRA BF - Mobile Application

A cross-platform mobile radio streaming application for Android and iOS, built with React Native and Expo.

## 📱 GitHub Repository

**Repository**: [https://github.com/sadekhinformatique/iqra_apk](https://github.com/sadekhinformatique/iqra_apk)

## Features

- 🎵 Live radio streaming from Caster.fm
- 🎨 Dark, modern UI with audio visualizer
- 🎛️ Playback controls (play/pause, shuffle, repeat)
- 🔊 Volume control
- 📱 Background audio playback
- 🔒 Lock screen controls
- 🌍 Works on both Android and iOS

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo Go app on your mobile device (for testing)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sadekhinformatique/iqra_apk.git
   cd iqra_apk
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Run on your device:**
   - Scan the QR code with Expo Go app (Android)
   - Scan the QR code with Camera app (iOS)

## Project Structure

```
application/
├── App.js                          # Main entry point
├── app.json                        # Expo configuration
├── package.json                    # Dependencies
├── babel.config.js                 # Babel configuration
├── assets/                         # App assets
│   ├── icon.png                    # App icon
│   ├── splash.png                  # Splash screen
│   └── logo.png                    # IQRA logo
└── src/
    ├── components/                 # Reusable components
    │   ├── AudioVisualizer.js      # Animated audio bars
    │   └── PlayerControls.js       # Playback control buttons
    ├── screens/                    # App screens
    │   └── PlayerScreen.js         # Main player screen
    ├── services/                   # Business logic
    │   └── RadioService.js         # Audio streaming service
    └── constants/                  # App constants
        └── theme.js                # Design system (colors, spacing, etc.)
```

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start and open on Android emulator/device
- `npm run ios` - Start and open on iOS simulator/device
- `npm run web` - Start and open in web browser

## Building for Production

### Android (APK)

1. **Install EAS CLI:**
   ```bash
   npm install -g eas-cli
   ```

2. **Configure EAS:**
   ```bash
   eas build:configure
   ```

3. **Build APK:**
   ```bash
   eas build --platform android --profile preview
   ```

### iOS (IPA)

> **Note:** Building for iOS requires a Mac and Apple Developer account ($99/year)

1. **Build IPA:**
   ```bash
   eas build --platform ios --profile preview
   ```

## Radio Stream Configuration

The app streams from Caster.fm using the channel ID: `a092f64f-8e5f-4a70-ae42-0347517df896`

To change the stream URL, edit `src/services/RadioService.js`:

```javascript
this.streamUrl = 'YOUR_STREAM_URL_HERE';
```

## Customization

### Colors

Edit `src/constants/theme.js` to customize the color scheme:

```javascript
colors: {
  primary: '#e81e4d',      // Primary accent color
  background: '#000000',   // Background color
  surface: '#1a1a1a',      // Surface color
  text: '#ffffff',         // Text color
  // ...
}
```

### Logo

Replace `assets/logo.png` with your own logo image.

## Troubleshooting

### Error: The required package `expo-asset` cannot be found

**Solution**: Run `npm install` to install all required dependencies.

### Audio not playing

- Ensure you have a stable internet connection
- Check that the stream URL is correct and accessible
- Verify audio permissions are granted on your device

### App crashes on startup

- Clear Expo cache: `expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## Technologies Used

- **React Native** - Mobile framework
- **Expo** - Development platform
- **expo-av** - Audio/video playback
- **expo-linear-gradient** - Gradient backgrounds
- **@react-native-community/slider** - Volume slider

## License

This project is created for RADIO IQRA BF.

## Support

For issues or questions, please open an issue on [GitHub](https://github.com/sadekhinformatique/iqra_apk/issues).
