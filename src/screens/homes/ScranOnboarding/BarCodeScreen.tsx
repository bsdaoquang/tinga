import React, {useEffect} from 'react';
import {PermissionsAndroid, Platform, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

const BarCodeScreen = () => {
  useEffect(() => {
    requestPermision();
  }, []);

  const requestPermision = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'RequestAuth',
            message: 'Please allow camera permission to scan QR code',
            buttonNeutral: 'Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'Agree',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Đã được cấp quyền');
        } else {
          console.log('Yêu cầu bị từ chối');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View>
      <QRCodeScanner onRead={val => console.log(val)} />
    </View>
  );
};

export default BarCodeScreen;
