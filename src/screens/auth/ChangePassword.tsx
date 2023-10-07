import {Sms} from 'iconsax-react-native';
import React, {useState} from 'react';
import {Image} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import authenticationAPI from '../../apis/authAPI';
import {
  ButtonComponent,
  Container,
  InputComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import useAuth from '../../hooks/useAuth';
import {LoadingModal} from '../../modals';
import {showToast} from '../../utils/showToast';
import {ChangePassword} from '..';

const LoginScreen = ({route, navigation}: any) => {
  const {code, currentEmail} = route.params;

  const [isShowPass, setIsShowPass] = useState(false);
  const [email, setEmail] = useState(currentEmail);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {handleCheckEmail, handleCheckPass, helpText} = useAuth(navigation);

  const handleLogin = async () => {
    if (email && password) {
      setIsLoading(true);

      const api = `/resetPassword`;

      try {
        await authenticationAPI
          .HandleAuth(api, {email, reset_token: code, password}, 'post')
          .then(async (res: any) => {
            if (res.success) {
              showToast('Change password successfully!');
              setIsLoading(false);
              navigation.navigate('LoginScreen');
            } else {
              setErrorMessage(res.message);
              setIsLoading(false);
            }
          });
      } catch (error: any) {
        showToast(`${'Can not change password'}${error.message}`);
        console.log(error);
        setIsLoading(false);
      }
    } else {
      setErrorMessage('Please enter your email and password!');
    }
  };

  return (
    <Container back isScroll>
      <SectionComponent
        styles={{
          marginTop: 40,
        }}>
        <Image
          source={require('../../assets/images/TingaLogo.png')}
          style={{width: 175, height: 68, resizeMode: 'contain'}}
        />
      </SectionComponent>

      <SectionComponent flex={1} styles={{justifyContent: 'center'}}>
        <TitleComponent text="Enter a new  password" size={26} flex={0} />
        <SpaceComponent height={22} />
        <InputComponent
          value={email}
          placeholder="Email address"
          affix={<Sms size={20} color={appColors.gray} />}
          onChange={val => setEmail(val)}
          type="email-address"
          autoComplete="email"
          isCapitalize="none"
          onEnd={() => handleCheckEmail(email)}
          helpText={helpText?.email}
          readOnly
        />
        <InputComponent
          value={password}
          placeholder="Password*"
          onChange={val => {
            setPassword(val);
            handleCheckPass(val);
          }}
          isSecure
          show={isShowPass}
          isCapitalize="none"
          setIsShowPass={() => setIsShowPass(!isShowPass)}
          onEnd={() => handleCheckPass(password)}
          helpText={helpText?.paddword}
          max={8}
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
          text={isLoading ? 'Loading...' : 'Recover'}
          iconRight
          icon={
            <Octicons name="arrow-right" size={20} color={appColors.text} />
          }
          disable={!email || !password || isLoading}
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

      <LoadingModal visible={isLoading} />
    </Container>
  );
};

export default LoginScreen;
