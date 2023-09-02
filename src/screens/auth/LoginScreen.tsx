import AsyncStorage from '@react-native-async-storage/async-storage';
import {Sms} from 'iconsax-react-native';
import React, {useState} from 'react';
import {Image} from 'react-native';
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
import {appSize} from '../../constants/appSize';
import {fontFamilys} from '../../constants/fontFamily';
import useAuth from '../../hooks/useAuth';
import {addAuth} from '../../redux/reducers/authReducer';
import TermsText from './components/TermsText';

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
              dispatch(addAuth(res.data));
              await AsyncStorage.setItem(
                appInfos.localDataName.accessToken,
                JSON.stringify(res.data),
              );
              setIsLoading(false);
            } else {
              setIsLoading(false);
              setErrorMessage('Email/Password is not correct!');
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
    <Container isScroll back>
      <SectionComponent
        styles={{
          marginBottom: 20,
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Image
          source={require('../../assets/images/TingaLogo.png')}
          style={{width: appSize.width * 0.5, resizeMode: 'contain'}}
        />
        <TitleComponent
          text="Sign In"
          size={32}
          flex={0}
          styles={{textAlign: 'center'}}
        />
      </SectionComponent>
      <SectionComponent>
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
          placeholder="Password*"
          onChange={val => setPassword(val)}
          isSecure
          show={isShowPass}
          isCapitalize="none"
          setIsShowPass={() => setIsShowPass(!isShowPass)}
          onEnd={() => handleCheckPass(password)}
          helpText={helpText?.paddword}
        />
        {errorMessage && (
          <TextComponent
            text={errorMessage}
            size={12}
            color={appColors.danger}
            flex={0}
          />
        )}
      </SectionComponent>

      <SectionComponent>
        <ButtonComponent
          text={isLoading ? 'Loading...' : 'Continue'}
          disable={isLoading}
          onPress={handleLogin}
          styles={{
            paddingVertical: 16,
            borderColor: '#EEF3DC',
            marginVertical: 16,
            borderRadius: 14,
          }}
          textColor={appColors.text}
        />

        <RowComponent>
          <TextComponent text="You have not an account? " flex={0} />
          <Button
            text="Sign up"
            onPress={() => navigation.navigate('SignUpScreen')}
            textColor={appColors.primary}
            fontStyles={{fontFamily: fontFamilys.bold}}
          />
        </RowComponent>
        <SpaceComponent height={16} />
        <TermsText text="By continuing you agree with our " />
      </SectionComponent>
    </Container>
  );
};

export default LoginScreen;
