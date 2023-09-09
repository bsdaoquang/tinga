import React, {useEffect, useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  ButtonComponent,
  Container,
  InputComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {appSize} from '../../constants/appSize';
import {fontFamilys} from '../../constants/fontFamily';
import {global} from '../../styles/global';
import authenticationAPI from '../../apis/authAPI';

const VerifyEmail = ({navigation, route}: any) => {
  const {email}: {email: string} = route.params;

  const [code, setCode] = useState('');
  const [numsCode, setNumsCode] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState('');

  const [disable, setDisable] = useState(true);

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
    const api = `/verifyemail`;

    const data = {
      email,
      code,
    };

    try {
      setIsLoading(true);
      await authenticationAPI.HandleAuth(api, data, 'post').then((res: any) => {
        if (res.status === 200 && res.data && res.data.success) {
          navigation.navigate('ChooseAllergy');
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
        <TitleComponent text="Verify your email" size={26} />
        <TextComponent
          text={`Check your email. We’ve sent a code to ${email}`}
          font={fontFamilys.medium}
        />
      </SectionComponent>

      <SectionComponent styles={{marginTop: 20}}>
        <RowComponent justify="space-between">
          {Array.from({length: 5}).map((_item, index) => (
            <View
              key={`input${index}`}
              style={{width: (appSize.width - 80) / 5}}>
              <InputComponent
                value={numsCode[index]}
                type="number-pad"
                onChange={val => handleSetNumCode(val, index)}
                placeholder="-"
                inputStyles={{
                  textAlign: 'center',
                  fontFamily: fontFamilys.bold,
                  fontSize: 22,
                }}
                styles={{marginBottom: 0}}
              />
            </View>
          ))}
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
    </Container>
  );
};

export default VerifyEmail;
