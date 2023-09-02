import {CloudFog, Sms} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  Container,
  InputComponent,
  SectionComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {fontFamilys} from '../../constants/fontFamily';
import useAuth from '../../hooks/useAuth';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TermsText from './components/TermsText';
import authenticationAPI from '../../apis/authAPI';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appInfos} from '../../constants/appInfos';

const SignUpScreen = ({navigation}: any) => {
  const [isShowPass, setIsShowPass] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleCheckFirstname,
    handleCheckLastname,
    handleCheckEmail,
    handleCheckPass,
    helpText,
  } = useAuth(navigation);

  useEffect(() => {
    if (
      email &&
      password &&
      firstname &&
      lastname &&
      !helpText?.email &&
      !helpText?.paddword
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [email, password, firstname, lastname, helpText]);

  const dispatch = useDispatch();

  const handleSignIn = async () => {
    setIsLoading(true);
    const api = `/register`;
    try {
      const data = {
        email,
        password,
        first_name: firstname,
        last_name: lastname,
      };

      await authenticationAPI
        .HandleAuth(api, data, 'post')
        .then(async (res: any) => {
          navigation.navigate('VerifyEmail', {email});
          dispatch(addAuth(res.data));
          await AsyncStorage.setItem(
            appInfos.localDataName.accessToken,
            JSON.stringify(res.data.access_token),
          );
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <Container back isScroll>
      <SectionComponent>
        <TitleComponent text="Welcome to Tinga" size={26} />
        <TextComponent
          text="Create an account to start learning how to shop smarter for your dietary needs."
          font={fontFamilys.medium}
        />
      </SectionComponent>
      <SectionComponent>
        <InputComponent
          value={firstname}
          placeholder="First name*"
          onChange={val => setFirstname(val)}
          onEnd={() => handleCheckFirstname(firstname)}
          helpText={helpText?.firstname}
        />
        <InputComponent
          value={lastname}
          placeholder="Last name*"
          onChange={val => setLastname(val)}
          onEnd={() => handleCheckLastname(lastname)}
          helpText={helpText?.lastname}
        />
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
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          disable={isLoading ? isLoading : disable}
          textColor={appColors.text}
          color={appColors.success1}
          fontStyles={{textAlign: 'center'}}
          text="Continue"
          styles={{opacity: disable ? 0.5 : 1, paddingVertical: 18}}
          onPress={handleSignIn}
          iconRight
          icon={
            <AntDesign name="arrowright" size={20} color={appColors.text} />
          }
        />
      </SectionComponent>
      <SectionComponent>
        <TermsText text="By continuing you agree with our " />
      </SectionComponent>
    </Container>
  );
};

export default SignUpScreen;
