import {View, Text, Image} from 'react-native';
import React from 'react';
import {
  Button,
  ButtonComponent,
  Container,
  SectionComponent,
  TextComponent,
  TitleComponent,
} from '../../../components';
import {ArrowLeft, Barcode} from 'iconsax-react-native';
import {appColors} from '../../../constants/appColors';
import {fontFamilys} from '../../../constants/fontFamily';
import {appSize} from '../../../constants/appSize';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScan = ({navigation}: any) => {
  return (
    <>
      <Container
        backgroundColor="#263238"
        left={<ArrowLeft size={20} color={appColors.white} />}
        right={
          <Button
            text="Skip"
            onPress={() =>
              navigation.navigate('Home', {
                screen: 'HomeScreen',
                params: {
                  isResultScan: false,
                },
              })
            }
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
          onPress={() => navigation.navigate('BarCodeScreen')}
        />
      </SectionComponent>
    </>
  );
};

export default HomeScan;
