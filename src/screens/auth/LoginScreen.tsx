import React from 'react';
import {ImageBackground, StatusBar, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Button,
  ButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {appSize} from '../../constants/appSize';
import {fontFamilys} from '../../constants/fontFamily';
import TermsText from './components/termsText';

const LoginScreen = ({navigation}: any) => {
  return (
    <>
      <StatusBar translucent barStyle={'dark-content'} />
      <ImageBackground
        source={require('../../assets/images/BGLogin.png')}
        style={{
          flex: 1,
          width: appSize.width,
        }}
        imageStyle={{resizeMode: 'cover'}}>
        <SectionComponent styles={{paddingTop: 32}}>
          <TouchableOpacity
            style={{padding: 12}}
            onPress={() => navigation.navigate('WelcomeScreen')}>
            <AntDesign name="arrowleft" size={22} color={appColors.text} />
          </TouchableOpacity>
        </SectionComponent>

        <SectionComponent
          styles={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingVertical: 20,
            width: '100%',
          }}>
          <TitleComponent text="Welcome to Tinga" size={32} flex={0} />
          <TextComponent
            flex={0}
            styles={{textAlign: 'center'}}
            text="Create an account to change the way you shop with Tinga – your personalised nutrition assistant"
          />

          <ButtonComponent
            text="Continue to Sign Up"
            onPress={() => navigation.navigate('SignUpScreen')}
            color={appColors.white}
            styles={{
              marginVertical: 16,
              width: '90%',
              borderWidth: 1,
              borderColor: 'rgba(238, 243, 220, 1)',
            }}
            textColor={appColors.text}
          />

          <RowComponent>
            <TextComponent text="Already have an account? " flex={0} />
            <Button
              text="Login"
              onPress={() => navigation.navigate('SignUpScreen')}
              textColor={appColors.primary}
              fontStyles={{fontFamily: fontFamilys.bold}}
            />
          </RowComponent>
          <SpaceComponent height={16} />
          <TermsText text="By continuing you agree with our " />
        </SectionComponent>
      </ImageBackground>
    </>
  );
};

export default LoginScreen;
