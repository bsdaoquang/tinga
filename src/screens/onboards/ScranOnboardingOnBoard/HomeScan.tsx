import {ArrowLeft} from 'iconsax-react-native';
import React, {useEffect} from 'react';
import {Image, PermissionsAndroid, Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Button,
  ButtonComponent,
  Container,
  SectionComponent,
  TextComponent,
  TitleComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {appSize} from '../../../constants/appSize';
import {fontFamilys} from '../../../constants/fontFamily';
import {useDispatch} from 'react-redux';
import {handleSaveUser} from '../../../utils/handleSaveUser';
import {useNavigation} from '@react-navigation/native';

const HomeScan = () => {
  useEffect(() => {
    requestPermision();
  }, []);

  const navigation: any = useNavigation();

  const dispatch = useDispatch();
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
          handleSaveUser(dispatch);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <Container
        backgroundColor="#263238"
        left={
          <Button
            icon={<ArrowLeft size={20} color={appColors.white} />}
            onPress={() => navigation.goBack()}
          />
        }
        right={
          <Button
            text="Skip"
            // onPress={() => console.log('fafa')}
            onPress={() => handleSaveUser(dispatch)}
            textColor={appColors.white6}
          />
        }
        isScroll>
        <SectionComponent>
          <TextComponent
            text="Reset your pantry"
            flex={1}
            size={12}
            color={`${appColors.white6}`}
          />
          <TitleComponent
            text="In addition, there is no API for the"
            flex={1}
            size={26}
            color={`${appColors.white}`}
          />
          <TextComponent
            text="Scan 5 barcodes in your pantry to learn which foods match your dietary restrictions and discover Tinga swaps."
            flex={1}
            size={18}
            font={fontFamilys.regular}
            color={`${appColors.white6}`}
          />

          <Image
            source={require('../../../assets/images/BarCodeImage.png')}
            style={{
              width: appSize.width - 32,
              resizeMode: 'cover',
              height: appSize.width - 32,
              borderRadius: 12,
              marginVertical: 16,
            }}
          />
        </SectionComponent>
      </Container>
      <SectionComponent styles={{backgroundColor: '#263238'}}>
        <ButtonComponent
          text="Scan Items"
          icon={<Ionicons name="barcode-outline" size={24} color={'#263238'} />}
          onPress={() => navigation.navigate('BarCodeScreenWelcome')}
        />
      </SectionComponent>
    </>
  );
};

export default HomeScan;
