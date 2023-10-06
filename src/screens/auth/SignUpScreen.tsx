import {Sms} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import authenticationAPI from '../../apis/authAPI';
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
import TermsText from './components/TermsText';
import {LoadingModal} from '../../modals';

const SignUpScreen = ({navigation}: any) => {
  const [isShowPass, setIsShowPass] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

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
      !helpText?.paddword &&
      password.length >= 6
    ) {
      setDisable(false);
    } else {
      setDisable(true);
      setErrorText('');
    }
  }, [email, password, firstname, lastname, helpText]);

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
          if (res.success) {
            navigation.navigate('VerifyEmail', {email, type: 'confirm'});
            setIsLoading(false);
          } else {
            setIsLoading(false);
            setErrorText(res.message);
          }
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <Container back isScroll>
      <SectionComponent>
        <TitleComponent text="Welcome to Tinga" size={26} height={44} />
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
          onChange={val => {
            setEmail(val);
          }}
          type="email-address"
          autoComplete="email"
          isCapitalize="none"
          onEnd={() => handleCheckEmail(email)}
          helpText={helpText?.email}
        />
        <InputComponent
          value={password}
          placeholder="Password*"
          onChange={val => {
            handleCheckPass(val);
            setPassword(val);
          }}
          isSecure
          show={isShowPass}
          isCapitalize="none"
          setIsShowPass={() => {
            setIsShowPass(!isShowPass);
          }}
          // onEnd={() => handleCheckPass(password)}
          helpText={helpText?.paddword}
        />
        {errorText && (
          <TextComponent text={errorText} color={appColors.error} />
        )}
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

      <LoadingModal visible={isLoading} />
    </Container>
  );
};

export default SignUpScreen;
