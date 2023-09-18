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

const ContactDietitian = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');

  return (
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
        />
        <InputComponent
          value={content}
          onChange={val => setContent(val)}
          placeholder="Descript your problem"
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
          text={'Send'}
          iconRight
          icon={
            <Octicons name="arrow-right" size={20} color={appColors.text} />
          }
          fontStyles={{textAlign: 'center'}}
          onPress={() => {}}
          styles={{
            paddingVertical: 16,
            borderRadius: 14,
          }}
          textColor={appColors.text}
        />
      </SectionComponent>
    </Container>
  );
};

export default ContactDietitian;
