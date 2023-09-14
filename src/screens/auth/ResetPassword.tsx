import {Sms} from 'iconsax-react-native';
import React, {useState} from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import {useDispatch} from 'react-redux';
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

const ResetPassword = ({navigation}: any) => {
  const [email, setEmail] = useState('rfedun@hotmail.com');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {handleCheckEmail, helpText} = useAuth(navigation);
  const dispatch = useDispatch();

  const handleResetPassword = async () => {
    if (email) {
      showToast('Comming soon!');
      // setIsLoading(true);

      // const api = `/login`;

      // try {
      //   await authenticationAPI
      //     .HandleAuth(api, {email}, 'post')
      //     .then(async (res: any) => {
      //       if (res.data) {
      //         console.log(res);
      //         setIsLoading(false);
      //       } else {
      //         setErrorMessage(res.message);
      //         setIsLoading(false);
      //       }
      //     });
      // } catch (error) {
      //   console.log(error);
      //   setIsLoading(false);
      // }
    } else {
      setErrorMessage('Please enter your email!');
    }
  };

  return (
    <Container back isScroll>
      <SectionComponent flex={1} styles={{justifyContent: 'center'}}>
        <TitleComponent text="Reset password" size={26} flex={0} />
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

        {errorMessage && (
          <TextComponent
            text={errorMessage}
            size={12}
            color={appColors.danger}
            flex={0}
          />
        )}

        <ButtonComponent
          text={isLoading ? 'Loading...' : 'Login'}
          iconRight
          icon={
            <Octicons name="arrow-right" size={20} color={appColors.text} />
          }
          disable={isLoading}
          fontStyles={{textAlign: 'center'}}
          onPress={handleResetPassword}
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

export default ResetPassword;
