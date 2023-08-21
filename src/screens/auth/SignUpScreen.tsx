import {Sms} from 'iconsax-react-native';
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

const SignUpScreen = ({navigation}: any) => {
  const [isShowPass, setIsShowPass] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (email && password && firstname && lastname) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [email, password, firstname, lastname]);

  const {
    handleCheckFirstname,
    handleCheckLastname,
    handleCheckEmail,
    handleCheckPass,
    helpText,
    isLoading,
    handleLogin,
  } = useAuth(navigation);

  return (
    <Container back isScroll barStyle="dark-content">
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
          disable={disable}
          textColor={appColors.text}
          color={appColors.success1}
          fontStyles={{textAlign: 'center'}}
          text="Continue"
          styles={{opacity: disable ? 0.5 : 1, paddingVertical: 18}}
          onPress={() => handleLogin({firstname, lastname, email, password})}
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
