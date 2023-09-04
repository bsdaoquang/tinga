import appleAuth from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Sms} from 'iconsax-react-native';
import React from 'react';
import {
  Alert,
  ImageBackground,
  Platform,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import authenticationAPI from '../../apis/authAPI';
import {GoogleIcon} from '../../assets/svg';
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
import {showToast} from '../../utils/showToast';
import TermsText from './components/TermsText';

GoogleSignin.configure({
  webClientId:
    '648702036593-v9dafgoh2f0v861pcjcqudfookhjdsnl.apps.googleusercontent.com',
});

const HomeLoginScreen = ({navigation}: any) => {
  const handleLoginWithAppleAccount = async () => {
    if (Platform.OS === 'android') {
      showToast(
        'Apple login is not supported on your device, please try it with Google login',
      );
    } else {
      try {
        // performs login request
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          // Note: it appears putting FULL_NAME first is important, see issue #293
          requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        });

        // get current authentication state for user
        // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
        const credentialState = await appleAuth.getCredentialStateForUser(
          appleAuthRequestResponse.user,
        );

        // use credentialState response to ensure the user is authenticated
        if (credentialState === appleAuth.State.AUTHORIZED) {
          // user is authenticated
          console.log(credentialState);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLoginWithGooleAccount = async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      handleSaveToDatabase(userInfo.user);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const handleSaveToDatabase = async (profile: any) => {
    const api = `/loginWithGoogle`;
    const data = {
      google_id: profile.id,
      email: profile.email,
      first_name: profile.givenName,
      last_name: profile.familyName,
    };

    try {
      await authenticationAPI.HandleAuth(api, data, 'post').then((res: any) => {
        if (res.success && res.data) {
          console.log(res.data);
        } else {
          Alert.alert('Error', res.message);
        }
      });
    } catch (error: any) {
      console.log(error);
    }
  };

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
            onPress={handleLoginWithAppleAccount}
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
            onPress={handleLoginWithGooleAccount}
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
