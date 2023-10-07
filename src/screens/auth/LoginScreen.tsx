import AsyncStorage from '@react-native-async-storage/async-storage';
import {Sms} from 'iconsax-react-native';
import React, {useState} from 'react';
import {Image, KeyboardAvoidingView} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import {useDispatch} from 'react-redux';
import authenticationAPI from '../../apis/authAPI';
import {
  Button,
  ButtonComponent,
  Container,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {appInfos} from '../../constants/appInfos';
import {fontFamilys} from '../../constants/fontFamily';
import useAuth from '../../hooks/useAuth';
import {LoadingModal} from '../../modals';
import {HandleLogin} from '../../utils/HandleLogin';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {appSize} from '../../constants/appSize';

const LoginScreen = ({navigation}: any) => {
  const [isShowPass, setIsShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {handleCheckEmail, handleCheckPass, helpText} = useAuth(navigation);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (email && password) {
      setIsLoading(true);

      const api = `/login`;

      try {
        await authenticationAPI
          .HandleAuth(api, {email, password}, 'post')
          .then(async (res: any) => {
            if (res.data) {
              await AsyncStorage.setItem(
                appInfos.localDataName.userData,
                JSON.stringify(res.data),
              ).then(() => {
                HandleLogin.handleCheckUserLoginAgain(
                  res.data,
                  navigation,
                  dispatch,
                );
              });
              setIsLoading(false);
            } else {
              setErrorMessage(res.message);
              setIsLoading(false);
            }
          });
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    } else {
      setErrorMessage('Please enter your email and password!');
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <Container back isFlex isScroll>
        <SectionComponent
          styles={{
            marginTop: 40,
          }}>
          <Image
            source={require('../../assets/images/TingaLogo.png')}
            style={{width: 175, height: 68, resizeMode: 'contain'}}
          />
        </SectionComponent>

        <SectionComponent
          styles={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <TitleComponent text="Login" size={26} flex={0} />
          <SpaceComponent height={22} />
          <InputComponent
            value={email}
            placeholder="Email address*"
            affix={<Sms size={20} color={appColors.gray} />}
            onChange={val => setEmail(val)}
            type="email-address"
            autoComplete="email"
            isCapitalize="none"
            onEnd={() => handleCheckEmail(email)}
            helpText={helpText?.email}
          />

          <InputComponent
            value={password}
            max={8}
            placeholder="Password*"
            onChange={val => {
              setPassword(val);
              handleCheckPass(password);
            }}
            isSecure
            show={isShowPass}
            isCapitalize="none"
            setIsShowPass={() => setIsShowPass(!isShowPass)}
            helpText={helpText?.paddword}
          />
          {errorMessage && (
            <TextComponent
              text={errorMessage}
              size={12}
              color={appColors.danger}
              flex={0}
              styles={{marginBottom: 12}}
            />
          )}

          <ButtonComponent
            text={isLoading ? 'Loading...' : 'Login'}
            iconRight
            icon={
              <Octicons name="arrow-right" size={20} color={appColors.text} />
            }
            disable={!email || !password || isLoading || password.length < 6}
            fontStyles={{textAlign: 'center'}}
            onPress={handleLogin}
            styles={{
              paddingVertical: 16,
              borderColor: '#EEF3DC',
              borderRadius: 14,
            }}
            textColor={appColors.text}
          />
        </SectionComponent>

        <SectionComponent styles={{marginBottom: 20}}>
          <RowComponent>
            <TextComponent text="Don’t have an account? " flex={0} />
            <Button
              text="Sign up"
              onPress={() => navigation.navigate('SignUpScreen')}
              textColor={appColors.primary}
              fontStyles={{fontFamily: fontFamilys.bold}}
            />
          </RowComponent>
          <RowComponent styles={{marginTop: 8}}>
            <TextComponent text="Forgot your password? " flex={0} />
            <Button
              text="Recover password"
              onPress={() => navigation.navigate('ResetPassword')}
              textColor={appColors.primary}
              fontStyles={{fontFamily: fontFamilys.bold}}
            />
          </RowComponent>
        </SectionComponent>

        <LoadingModal visible={isLoading} />
      </Container>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
