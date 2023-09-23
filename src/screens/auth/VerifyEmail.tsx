import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, Text, TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import authenticationAPI from '../../apis/authAPI';
import {
  ButtonComponent,
  Container,
  RowComponent,
  SectionComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {appInfos} from '../../constants/appInfos';
import {appSize} from '../../constants/appSize';
import {fontFamilys} from '../../constants/fontFamily';
import {LoadingModal} from '../../modals';
import {global} from '../../styles/global';

const VerifyEmail = ({navigation, route}: any) => {
  const {email, type}: {email: string; type: 'confirm' | 'resetPass'} =
    route.params;

  const [code, setCode] = useState('');
  const [numsCode, setNumsCode] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState('');

  const [disable, setDisable] = useState(true);
  const ref1 = useRef<TextInput>(null);
  const ref2 = useRef<TextInput>(null);
  const ref3 = useRef<TextInput>(null);
  const ref4 = useRef<TextInput>(null);
  const ref5 = useRef<TextInput>(null);

  useEffect(() => {
    ref1.current?.focus();
  }, []);

  useEffect(() => {
    setDisable(code.length === 5 ? false : true);
  }, [code]);

  useEffect(() => {
    let val = ``;

    numsCode.length > 0 ? numsCode.forEach(num => (val += num)) : setCode('');

    setCode(val);
  }, [numsCode]);

  const handleSetNumCode = (val: string, index: number) => {
    const items = [...numsCode];

    items[index] = val;

    setNumsCode(items);
  };

  const handleVerifyCode = async () => {
    const api = type === 'confirm' ? `/verifyemail` : `/verifyPasswordResetOTP`;

    const data = {
      email,
      code,
    };

    try {
      setIsLoading(true);
      await authenticationAPI
        .HandleAuth(api, data, 'post')
        .then(async (res: any) => {
          if (res.code === 200 && res.success && res.data) {
            if (type === 'confirm') {
              navigation.navigate('ChooseDiet');
            } else {
              navigation.navigate('ChangePassword', {
                code: res.data.reset_token,
                currentEmail: email,
              });
            }

            await AsyncStorage.setItem(
              appInfos.localDataName.userData,
              JSON.stringify(res.data),
            );
          } else {
            setMessageError(res.data.message);
          }

          setIsLoading(false);
        });
    } catch (error: any) {
      console.log('error: ', error.data.message);
    }
  };

  const resendEmailVeryfied = async () => {
    const api = `/resend_otp_code`;

    try {
      await authenticationAPI
        .HandleAuth(api, {email}, 'post')
        .then((res: any) => {
          if (res.success) {
            Alert.alert('Email verify code sended', res.message);
          } else {
            Alert.alert('Error', 'Can not send email for you!');
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container back isScroll>
      <SectionComponent>
        <TitleComponent
          text={
            type === 'confirm' ? 'Verify your email' : 'Reset your password'
          }
          size={26}
        />
        <TextComponent
          text={
            type === 'confirm'
              ? `Check your email. We’ve sent a code to ${email}`
              : `Check your email.  We’ve sent a code to ${email}.  To reset your password please enter the code`
          }
          font={fontFamilys.medium}
        />
      </SectionComponent>

      <SectionComponent styles={{marginTop: 20}}>
        <RowComponent justify="space-between">
          <TextInput
            placeholder="-"
            style={{
              textAlign: 'center',
              fontFamily: fontFamilys.bold,
              fontSize: 22,
              borderRadius: 8,
              borderWidth: 2,
              borderColor: ref1.current?.isFocused() ? '#ABC43F' : '#EEF3DC',
              width: (appSize.width - 80) / 5,
            }}
            ref={ref1}
            returnKeyLabel="Next"
            returnKeyType="next"
            value={numsCode[0]}
            onChangeText={val => {
              handleSetNumCode(val, 0);
              val && ref2.current?.focus();
            }}
            maxLength={1}
            keyboardType="number-pad"
          />
          <TextInput
            placeholder="-"
            style={{
              textAlign: 'center',
              fontFamily: fontFamilys.bold,
              fontSize: 22,
              borderRadius: 8,
              borderWidth: 2,
              borderColor: ref2.current?.isFocused() ? '#ABC43F' : '#EEF3DC',
              width: (appSize.width - 80) / 5,
            }}
            ref={ref2}
            value={numsCode[1]}
            maxLength={1}
            onChangeText={val => {
              handleSetNumCode(val, 1);
              val && ref3.current?.focus();
            }}
            keyboardType="number-pad"
          />
          <TextInput
            placeholder="-"
            style={{
              textAlign: 'center',
              fontFamily: fontFamilys.bold,
              fontSize: 22,
              borderRadius: 8,
              borderWidth: 2,
              borderColor: ref3.current?.isFocused() ? '#ABC43F' : '#EEF3DC',
              width: (appSize.width - 80) / 5,
            }}
            maxLength={1}
            ref={ref3}
            value={numsCode[2]}
            onChangeText={val => {
              handleSetNumCode(val, 2);
              val && ref4.current?.focus();
            }}
            keyboardType="number-pad"
          />
          <TextInput
            placeholder="-"
            style={{
              textAlign: 'center',
              fontFamily: fontFamilys.bold,
              fontSize: 22,
              borderRadius: 8,
              borderWidth: 2,
              borderColor: ref4.current?.isFocused() ? '#ABC43F' : '#EEF3DC',
              width: (appSize.width - 80) / 5,
            }}
            ref={ref4}
            maxLength={1}
            value={numsCode[3]}
            onChangeText={val => {
              handleSetNumCode(val, 3);
              val && ref5.current?.focus();
            }}
            keyboardType="number-pad"
          />
          <TextInput
            placeholder="-"
            style={{
              textAlign: 'center',
              fontFamily: fontFamilys.bold,
              fontSize: 22,
              borderRadius: 8,
              borderWidth: 2,
              borderColor: ref5.current?.isFocused() ? '#ABC43F' : '#EEF3DC',
              width: (appSize.width - 80) / 5,
            }}
            ref={ref5}
            maxLength={1}
            value={numsCode[4]}
            onChangeText={val => handleSetNumCode(val, 4)}
            keyboardType="number-pad"
          />
        </RowComponent>
      </SectionComponent>

      {messageError && (
        <SectionComponent>
          <TextComponent text={messageError} color={appColors.error} flex={0} />
        </SectionComponent>
      )}
      <SectionComponent>
        <ButtonComponent
          disable={disable}
          textColor={appColors.text}
          color={appColors.success1}
          fontStyles={{textAlign: 'center'}}
          text={isLoading ? 'Loading...' : 'Continue'}
          styles={{opacity: disable ? 0.5 : 1, paddingVertical: 18}}
          onPress={handleVerifyCode}
          iconRight
          icon={
            <AntDesign name="arrowright" size={20} color={appColors.text} />
          }
        />
      </SectionComponent>
      <SectionComponent>
        <Text
          style={[
            global.text,
            {
              fontFamily: fontFamilys.medium,
              textAlign: 'center',
            },
          ]}>
          If you don’t receive a code within 5 minutes, check your spam or{' '}
          <Text
            onPress={resendEmailVeryfied}
            style={{
              fontFamily: fontFamilys.bold,
              color: appColors.primary,
            }}>
            request to resend code
          </Text>
        </Text>
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </Container>
  );
};

export default VerifyEmail;
