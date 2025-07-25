# Expo React Native Login App with QR Code

A modern login page built with Expo React Native featuring QR code generation and scanning capabilities.

## Features

- **Secure Login Form**: Email and password input with validation
- **QR Code Generation**: Generate QR codes for secure login verification
- **QR Code Scanner**: Scan QR codes to authenticate users
- **Responsive Design**: Works on both iOS and Android
- **Camera Permissions**: Properly handles camera access for QR scanning

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Install required packages**:
   ```bash
   npm install expo-barcode-scanner react-native-svg react-native-qrcode-svg
   ```

## Running the App

### Start the development server:
```bash
npm start
```

### Run on specific platforms:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Usage

1. **Traditional Login**: Enter email and password, then tap "Sign In"
2. **QR Code Login**: 
   - Tap "Generate Login QR Code" to create a QR code
   - Tap "Scan QR Code to Login" to open the camera scanner
3. **QR Code Scanner**: Point the camera at a valid QR code to authenticate

## Permissions

The app requires camera access for QR code scanning. Permissions are automatically requested on first use.

## Project Structure

```
login-app/
├── App.js                 # Main login component
├── app.json              # Expo configuration
├── assets/               # App icons and images
├── package.json          # Dependencies
└── README.md            # This file
```

## Technologies Used

- **React Native** with **Expo**
- **expo-barcode-scanner** for QR code scanning
- **react-native-qrcode-svg** for QR code generation
- **react-native-svg** for SVG support

## Development

To modify the app:
1. Edit `App.js` for UI changes
2. Update `app.json` for configuration changes
3. Add new dependencies with `npm install [package-name]`
