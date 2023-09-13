import React, {useEffect, useState} from 'react';
import {Alert, PermissionsAndroid, Platform, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {appSize} from '../../../constants/appSize';
import {
  Button,
  ButtonComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
  TitleComponent,
} from '../../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {appColors} from '../../../constants/appColors';
import LinearGradient from 'react-native-linear-gradient';
import ModalizeProducDetail from '../../../modals/ModalizeProducDetail';
import {ModalProduct} from '../../../modals';
import {Product} from '../../../Models/Product';

const demoProduc = {
  count: 1,
  description: '',
  id: '3',
  imageUrl:
    'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1695600000&Signature=Lg1zOVGWIh-PObTZ~1emXensFTTJhm4mMd-MEaUH9Uzm3WkG~D46kmA6Q6OqdarLpSTtfLOy1gqdgja40gXnsWHqhABJpIWh6oLvlwHw5s3j~FylcAxldq6RyclYck-yzX0jHNzpMDPwl2t--2G11Ns9fGyAfVrE1~x5S85d1acRYh9i-6uCS1Na5DADtO0HN2eDJ5Had7g05llBicXHzuRlin0Hd8kKDWCI-vH9UWHVjG42fS63Z-zr1~rrHx~l8CdUHQBZWYbnN8DlZ8qAGr0VSKFu0Yvzo1GNFYIYYkUgSCegvTmj9CIuqASlRx2s5NtDymYai4uqfuDEMqemLQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  mart: 'Walmart',
  price: 3.99,
  rating: 4.5,
  title: 'Dempsters Smooth Multigrains Bread',
};

const BarCodeScreen = ({navigation}: any) => {
  const [codeDetail, setCodeDetail] = useState('');
  const [showProduct, setShowProduct] = useState(false);
  const [product, setProduct] = useState<Product | undefined>();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    requestPermision();
  }, []);

  useEffect(() => {
    codeDetail &&
      Alert.alert(
        'BarCode',
        `Barcode is ${codeDetail}, try check code is produc or not and show detail`,
        [
          {
            text: 'Not product',
            onPress: () => {
              setShowError(true);
            },
          },
          {
            text: 'Is Product',
            onPress: () => {
              setShowProduct(true);
              setProduct(demoProduc);
            },
          },
        ],
      );
  }, [codeDetail]);

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
    <View style={{flex: 1}}>
      <QRCodeScanner
        cameraStyle={{
          width: appSize.width,
          height: appSize.height,
          position: 'absolute',
        }}
        onRead={val => setCodeDetail(val.data)}
        cameraType="back"
        showMarker
        markerStyle={{
          borderColor: appColors.white,
          borderRadius: 12,
          width: appSize.width - 64,
        }}
        cameraProps={{
          captureAudio: false,
          ratio: '1:1',
        }}
      />
      <LinearGradient
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}
        colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']}>
        <RowComponent
          styles={{
            paddingVertical: 42,
            paddingHorizontal: 16,
          }}>
          <Button
            icon={<AntDesign name="close" size={22} color={appColors.white} />}
            onPress={() => navigation.goBack()}
          />
          <TitleComponent
            text="Scan at least 5 pantry items"
            color={appColors.white}
            size={18}
            styles={{textAlign: 'center'}}
          />
          <TitleComponent
            text={`3/5`}
            styles={{
              backgroundColor: appColors.white,
              paddingVertical: 4,
              borderRadius: 100,
              flex: 0,
              paddingHorizontal: 12,
            }}
            size={20}
          />
        </RowComponent>
      </LinearGradient>

      <SectionComponent
        styles={{
          position: 'absolute',
          bottom: 24,
          right: 0,
          left: 0,
        }}>
        <RowComponent styles={{marginBottom: 24}}>
          <TextComponent
            text="Scanning for barcodes..."
            flex={0}
            color={appColors.white}
          />
        </RowComponent>
        <ButtonComponent text="Finish Pantry Reset" onPress={() => {}} />
      </SectionComponent>

      <ModalizeProducDetail
        visible={showError}
        onClose={() => {
          setShowError(false);
          setCodeDetail('');
        }}
      />

      <ModalProduct
        visible={showProduct}
        onClose={() => {
          setCodeDetail('');
          setProduct(undefined);
        }}
        product={product}
      />
    </View>
  );
};

export default BarCodeScreen;
