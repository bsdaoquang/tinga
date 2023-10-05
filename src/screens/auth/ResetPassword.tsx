import {Sms} from 'iconsax-react-native';
import React, {useState} from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import {useDispatch} from 'react-redux';
import authenticationAPI from '../../apis/authAPI';
import {
  ButtonComponent,
  Container,
  InputComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import useAuth from '../../hooks/useAuth';
import {LoadingModal} from '../../modals';
import {Image, View} from 'react-native';
import {showToast} from '../../utils/showToast';
import {appSize} from '../../constants/appSize';

const ResetPassword = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {handleCheckEmail, helpText} = useAuth(navigation);
  const dispatch = useDispatch();

  const handleResetPassword = async () => {
    if (email) {
      setIsLoading(true);

      const api = `/requestResetPassword`;

      try {
        await authenticationAPI
          .HandleAuth(api, {email}, 'post')
          .then(async (res: any) => {
            if (res.success && res.code === 200) {
              navigation.navigate('VerifyEmail', {type: 'resetPass', email});
            } else {
              setErrorMessage(
                'Can not recover your password, please check your email again',
              );
            }
            setIsLoading(false);
          });
      } catch (error) {
        console.log(error);
        showToast(JSON.stringify(error));
        setIsLoading(false);
      }
    } else {
      setErrorMessage('Please enter your email!');
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
      <SectionComponent styles={{paddingTop: '25%'}}>
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
            styles={{marginBottom: 12}}
          />
        )}

        <ButtonComponent
          text={isLoading ? 'Loading...' : 'Recover'}
          iconRight
          icon={
            <Octicons name="arrow-right" size={20} color={appColors.text2} />
          }
          disable={!email || isLoading}
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
