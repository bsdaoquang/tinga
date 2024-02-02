import appleAuth from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Sms} from 'iconsax-react-native';
import React, {useState} from 'react';
import {
  ImageBackground,
  Platform,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {AlertDetail} from '../../Models/AlertDetail';
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
import {appInfos} from '../../constants/appInfos';
import {appSize} from '../../constants/appSize';
import {fontFamilys} from '../../constants/fontFamily';
import {LoadingModal} from '../../modals';
import ModalAlert from '../../modals/ModalAlert';
import {HandleLogin} from '../../utils/HandleLogin';
import {showToast} from '../../utils/showToast';
import TermsText from './components/TermsText';

GoogleSignin.configure({
  webClientId:
    '635678166629-o5ck8v8dg63vmfhtim9nb9vid9ti6ft8.apps.googleusercontent.com',
});

const HomeLoginScreen = ({navigation}: any) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isVisibleModalAlert, setIsVisibleModalAlert] = useState(false);
  const [modalAlertDetail, setModalAlertDetail] = useState<AlertDetail>();

  const dispatch = useDispatch();

  const handleLoginWithAppleAccount = async () => {
    if (Platform.OS === 'android') {
      showToast(
        'Apple login is not supported on your device, please try it with Google login',
      );
    } else {
      console.log('fafa');
      showToast('Comming soon!!!');
      // try {
      //   // performs login request
      //   const appleAuthRequestResponse = await appleAuth.performRequest({
      //     requestedOperation: appleAuth.Operation.LOGIN,
      //     // Note: it appears putting FULL_NAME first is important, see issue #293
      //     requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      //   });

      //   // get current authentication state for user
      //   // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      //   const credentialState = await appleAuth.getCredentialStateForUser(
      //     appleAuthRequestResponse.user,
      //   );

      //   // use credentialState response to ensure the user is authenticated
      //   if (credentialState === appleAuth.State.AUTHORIZED) {
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    }
  };

  const handleLoginWithGooleAccount = async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      // console.log(userInfo);

      handleSaveToDatabase(userInfo.user);
    } catch (error) {
      console.log(error);
      showToast(JSON.stringify(error));
    }
  };

  const handleSaveToDatabase = async (profile: any) => {
    const api = `/loginWithGoogle`;
    const data = {
      google_id: profile.id,
      email: profile.email,
      first_name: profile.givenName ?? '',
      last_name: profile.familyName ?? '',
    };

    setIsLogin(true);

    try {
      await authenticationAPI
        .HandleAuth(api, data, 'post')
        .then(async (res: any) => {
          if (res.success && res.data) {
            await AsyncStorage.setItem(
              appInfos.localDataName.userData,
              JSON.stringify(res.data),
            ).then(() =>
              HandleLogin.handleCheckUserLoginAgain(navigation, dispatch),
            );
            setIsLogin(false);
          } else {
            setModalAlertDetail({
              title: 'Error',
              mess: JSON.stringify(res),
              onOK: async () => await GoogleSignin.signOut(),
            });
            setIsVisibleModalAlert(true);

            setIsLogin(false);
          }
        });
    } catch (error) {
      console.log(error);
      setIsLogin(false);
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
          maxHeight: appSize.height * 0.8,
          resizeMode: 'cover',
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
          <TitleComponent
            text="Welcome to Tinga"
            size={32}
            height={44}
            flex={0}
          />
          <TextComponent
            flex={0}
            styles={{textAlign: 'center'}}
            text={`Create an account to change the way you shop\nwith Tinga – your personalised nutrition assistant`}
          />
        </SectionComponent>

        <SectionComponent styles={{paddingHorizontal: 28}}>
          <ButtonComponent
            icon={<FontAwesome name="apple" size={20} color={appColors.text} />}
            text="Continue with Apple"
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
            text="Continue with Google"
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
              text="Log in"
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
      <LoadingModal visible={isLogin} />
      {isVisibleModalAlert && modalAlertDetail && (
        <ModalAlert
          title={modalAlertDetail.title}
          mess={modalAlertDetail.mess}
          onOK={modalAlertDetail.onOK}
          isVisible={isVisibleModalAlert}
          onClose={() => {
            setIsVisibleModalAlert(false);
            setModalAlertDetail(undefined);
          }}
        />
      )}
    </>
  );
};

export default HomeLoginScreen;
