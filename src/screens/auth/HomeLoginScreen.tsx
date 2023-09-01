import React from 'react';
import {ImageBackground, StatusBar, TouchableOpacity, View} from 'react-native';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {GoogleIcon} from '../../assets/svg';
import {Sms} from 'iconsax-react-native';

const HomeLoginScreen = ({navigation}: any) => {
  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <ImageBackground
        source={require('../../assets/images/BGLogin.png')}
        style={{flex: 1}}
        imageStyle={{
          height: '100%',
          resizeMode: 'stretch',
          width: appSize.width,
        }}>
        <SectionComponent styles={{paddingTop: 32, position: 'absolute'}}>
          <TouchableOpacity
            style={{padding: 12}}
            onPress={() => navigation.navigate('WelcomeScreen')}>
            <AntDesign name="arrowleft" size={22} color={appColors.text} />
          </TouchableOpacity>
        </SectionComponent>
      </ImageBackground>

      <View>
        <SectionComponent
          styles={{
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
        <SectionComponent styles={{paddingHorizontal: 28}}>
          <ButtonComponent
            icon={<FontAwesome name="apple" size={20} color={appColors.text} />}
            text="Continue to Sign Up"
            onPress={() => {}}
            outline
            styles={{
              paddingVertical: 16,
              borderColor: '#EEF3DC',
              marginVertical: 6,
              borderRadius: 14,
            }}
            textColor={appColors.text}
          />
          <ButtonComponent
            icon={<GoogleIcon width={20} />}
            text="Continue to Sign Up"
            onPress={() => {}}
            outline
            styles={{
              paddingVertical: 16,
              borderColor: '#EEF3DC',
              marginVertical: 6,
              borderRadius: 14,
            }}
            textColor={appColors.text}
          />
          <ButtonComponent
            icon={<Sms size={20} color={appColors.gray} />}
            text="Continue with Email"
            onPress={() => navigation.navigate('SignUpScreen')}
            outline
            styles={{
              paddingVertical: 16,
              borderColor: '#EEF3DC',
              marginVertical: 6,
              borderRadius: 14,
            }}
            textColor={appColors.text}
          />

          <RowComponent styles={{marginTop: 12}}>
            <TextComponent text="Already have an account? " flex={0} />
            <Button
              text="Login"
              onPress={() => navigation.navigate('LoginScreen')}
              textColor={appColors.primary}
              fontStyles={{fontFamily: fontFamilys.bold}}
            />
          </RowComponent>
          <SpaceComponent height={16} />
          <TermsText text="By continuing you agree with our " />
          <SpaceComponent height={16} />
        </SectionComponent>
      </View>
    </>
  );
};

export default HomeLoginScreen;
