import {Sms, User} from 'iconsax-react-native';
import React, {useState} from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
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
import dashboardAPI from '../../apis/dashboardAPI';
import {Alert, KeyboardAvoidingView} from 'react-native';
import {showToast} from '../../utils/showToast';
import {AlertDetail} from '../../Models/AlertDetail';
import ModalAlert from '../../modals/ModalAlert';
import {LoadingModal} from '../../modals';

const ContactDietitian = ({navigation}: any) => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isVisibleModalCustom, setIsVisibleModalCustom] = useState(false);
  const [alertDetail, setAlertDetail] = useState<AlertDetail>();

  const handleSendSupport = async () => {
    const data = {
      name: firstName,
      email,
      description: content,
    };

    const api = `/contactDietitian`;
    setIsSending(true);
    try {
      await dashboardAPI.HandleAPI(api, data, 'post').then((res: any) => {
        setIsSending(false);

        if (res.success) {
          setAlertDetail({
            title: 'Hi there!',
            mess: `Thank you for getting in touch. We're working on your inquiry, and we will try to get back to you within 1-2 bussiness days. \n\nThanks!\nYour friendly Dietitian`,
            onOK: () => navigation.goBack(),
          });
          setIsVisibleModalCustom(true);
          // Alert.alert(
          //   'Hi there!',
          //   `Thank you for getting in touch. We're working on your inquiry, and we will try to get back to you within 1-2 bussiness days. \n\nThanks!\nYour friendly Dietitian`,
          //   [
          //     {
          //       text: 'OK',
          //       onPress: () => navigation.goBack(),
          //       style: 'default',
          //     },
          //   ],
          // );
        }
      });
    } catch (error) {
      setIsSending(false);
      console.log(error);
      showToast(JSON.stringify(error));
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <Container back isScroll>
        <SectionComponent>
          <TitleComponent
            text="Contact Dietitian"
            size={32}
            color={appColors.primary}
          />

          <SpaceComponent height={50} />

          <InputComponent
            value={firstName}
            onChange={val => setFirstName(val)}
            affix={<User size={18} color={appColors.gray} />}
            placeholder="First name"
          />

          <InputComponent
            type="email-address"
            placeholder="Your email address"
            affix={<Sms size={18} color={appColors.gray} />}
            value={email}
            onChange={val => setEmail(val)}
            isCapitalize="none"
          />
          <InputComponent
            value={content}
            onChange={val => setContent(val)}
            placeholder="How can we help"
            isMultible
            rows={5}
          />

          <TextComponent
            text="*Please note standard fees may apply for dietitian support"
            color={appColors.gray}
          />
        </SectionComponent>
        <SectionComponent>
          <ButtonComponent
            disable={!firstName && !email && !content}
            text={'Send'}
            iconRight
            icon={
              <Octicons name="arrow-right" size={20} color={appColors.text} />
            }
            fontStyles={{textAlign: 'center'}}
            onPress={handleSendSupport}
            styles={{
              paddingVertical: 16,
              borderRadius: 14,
            }}
            textColor={appColors.text}
          />
        </SectionComponent>
        {isVisibleModalCustom && alertDetail && (
          <ModalAlert
            title={alertDetail.title}
            mess={alertDetail.mess}
            onOK={alertDetail.onOK}
            isVisible={isVisibleModalCustom}
            onClose={() => {
              setIsVisibleModalCustom(false);
              setAlertDetail(undefined);
            }}
          />
        )}
        <LoadingModal visible={isSending} />
      </Container>
    </KeyboardAvoidingView>
  );
};

export default ContactDietitian;
