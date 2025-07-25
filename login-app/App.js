import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as BarCodeScanner from 'expo-barcode-scanner';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [qrData, setQrData] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Generate QR code with user data
    const userData = {
      email: email,
      timestamp: new Date().toISOString(),
      action: 'login'
    };
    setQrData(JSON.stringify(userData));
    setShowQR(true);
    
    // Here you would normally make an API call to authenticate
    Alert.alert('Success', 'Login credentials validated. QR code generated for verification.');
  };

  const handleQRLogin = () => {
    setShowScanner(true);
    setScanned(false);
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    try {
      const parsedData = JSON.parse(data);
      Alert.alert(
        'QR Code Scanned',
        `Email: ${parsedData.email}\nTime: ${new Date(parsedData.timestamp).toLocaleString()}`,
        [{ text: 'OK', onPress: () => setShowScanner(false) }]
      );
    } catch (error) {
      Alert.alert('Error', 'Invalid QR code format');
    }
  };

  const generateNewQR = () => {
    const newData = {
      email: email || 'guest@example.com',
      timestamp: new Date().toISOString(),
      random: Math.random().toString(36).substring(7)
    };
    setQrData(JSON.stringify(newData));
    setShowQR(true);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#999"
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.qrButton} onPress={handleQRLogin}>
            <Text style={styles.qrButtonText}>Scan QR Code to Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.qrButton} onPress={generateNewQR}>
            <Text style={styles.qrButtonText}>Generate Login QR Code</Text>
          </TouchableOpacity>
        </View>

        {showQR && (
          <View style={styles.qrContainer}>
            <Text style={styles.qrTitle}>Your Login QR Code</Text>
            <QRCode
              value={qrData}
              size={200}
              color="#000"
              backgroundColor="#fff"
            />
            <TouchableOpacity onPress={() => setShowQR(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        )}

        {showScanner && (
          <View style={styles.scannerContainer}>
            <BarCodeScanner.BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
            <TouchableOpacity 
              style={styles.closeScannerButton} 
              onPress={() => setShowScanner(false)}
            >
              <Text style={styles.closeButton}>Close Scanner</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? Sign up</Text>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  qrButton: {
    backgroundColor: '#34C759',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  qrButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 30,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  qrTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  closeButton: {
    color: '#007AFF',
    fontSize: 16,
    marginTop: 15,
    fontWeight: '600',
  },
  scannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeScannerButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 10,
    borderRadius: 5,
  },
  footer: {
    alignItems: 'center',
    marginTop: 30,
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
});
