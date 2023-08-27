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
import TermsText from './components/TermsText';

const LoginScreen = ({navigation}: any) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
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
            width: '100%',
          }}>
          <TitleComponent text="Welcome to Tinga" size={32} flex={0} />
          <TextComponent
            flex={0}
            styles={{textAlign: 'center'}}
            text="Create an account to change the way you shop with Tinga – your personalised nutrition assistant"
          />
        </SectionComponent>
        <SectionComponent styles={{marginBottom: 20}}>
          <ButtonComponent
            text="Continue to Sign Up"
            onPress={() => navigation.navigate('SignUpScreen')}
            outline
            styles={{
              paddingVertical: 16,
              borderColor: '#EEF3DC',
              marginVertical: 16,
              borderRadius: 14,
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
