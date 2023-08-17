import {ArrowRight} from 'iconsax-react-native';
import React from 'react';
import {
  Button,
  ButtonComponent,
  Container,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Welcome = () => {
  return (
    <Container backgroundColor={appColors.text} barStyle="light-content">
      <RowComponent justify="flex-end" styles={{paddingHorizontal: 16}}>
        <Button
          text="Skip"
          onPress={() => {}}
          textColor={appColors.white6}
          textSize={16}
        />
      </RowComponent>
      <SectionComponent flex={1} styles={{backgroundColor: 'coral'}}>
        <TextComponent text="fafs" />
      </SectionComponent>
      <SectionComponent styles={{marginBottom: 30}}>
        <ButtonComponent
          text="Next"
          onPress={() => {}}
          fontStyles={{fontSize: 16, textAlign: 'center'}}
          color={appColors.success1}
          textColor={appColors.text}
          height={56}
          icon={
            <Ionicons
              name="arrow-forward-outline"
              color={appColors.text}
              size={20}
            />
          }
          iconRight
        />
      </SectionComponent>
    </Container>
  );
};

export default Welcome;
