import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Button,
  ButtonComponent,
  Container,
  InputComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {fontFamilys} from '../../constants/fontFamily';
import TermsText from './components/termsText';
import {Alert, Text, View} from 'react-native';
import {global} from '../../styles/global';
import {appSize} from '../../constants/appSize';

const VerifyEmail = ({navigation, route}: any) => {
  const {email}: {email: string} = route.params;

  const [disable, setDisable] = useState(false);

  return (
    <Container back isScroll barStyle="dark-content">
      <SectionComponent>
        <TitleComponent text="Verify your email" size={26} />
        <TextComponent
          text={`Check your email. We’ve sent a code to ${email}`}
          font={fontFamilys.medium}
        />
      </SectionComponent>

      <SectionComponent styles={{marginVertical: 16}}>
        <RowComponent justify="space-between">
          <View style={{width: (appSize.width - 80) / 5}}>
            <InputComponent
              value="3"
              type="number-pad"
              onChange={val => console.log(val)}
              placeholder="-"
              inputStyles={{textAlign: 'center'}}
              styles={{marginBottom: 0}}
            />
          </View>
          <View style={{width: (appSize.width - 80) / 5}}>
            <InputComponent
              value="2"
              type="number-pad"
              onChange={val => console.log(val)}
              placeholder="-"
              inputStyles={{textAlign: 'center'}}
              styles={{marginBottom: 0}}
            />
          </View>
          <View style={{width: (appSize.width - 80) / 5}}>
            <InputComponent
              value="4"
              type="number-pad"
              onChange={val => console.log(val)}
              placeholder="-"
              inputStyles={{textAlign: 'center'}}
              styles={{marginBottom: 0}}
            />
          </View>
          <View style={{width: (appSize.width - 80) / 5}}>
            <InputComponent
              value="9"
              type="number-pad"
              onChange={val => console.log(val)}
              placeholder="-"
              inputStyles={{textAlign: 'center'}}
              styles={{marginBottom: 0}}
            />
          </View>
          <View style={{width: (appSize.width - 80) / 5}}>
            <InputComponent
              value="6"
              type="number-pad"
              onChange={val => console.log(val)}
              placeholder="-"
              inputStyles={{textAlign: 'center'}}
              styles={{marginBottom: 0}}
            />
          </View>
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          disable={disable}
          textColor={appColors.text}
          color={appColors.success1}
          fontStyles={{textAlign: 'center'}}
          text="Continue"
          styles={{opacity: disable ? 0.5 : 1, paddingVertical: 18}}
          onPress={() => navigation.navigate('ChooseAllergy')}
          iconRight
          icon={
            <AntDesign name="arrowright" size={20} color={appColors.text} />
          }
        />
      </SectionComponent>
      <SectionComponent>
        <Text
          style={[
            global.text,
            {
              fontFamily: fontFamilys.medium,
              textAlign: 'center',
            },
          ]}>
          If you don’t receive a code within 5 minutes, check your spam or{' '}
          <Text
            onPress={() => Alert.alert('Resend email')}
            style={{fontFamily: fontFamilys.bold, color: appColors.primary}}>
            request to resend code
          </Text>
        </Text>
      </SectionComponent>
    </Container>
  );
};

export default VerifyEmail;
