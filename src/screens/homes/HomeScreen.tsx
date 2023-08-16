import React from 'react';
import {
  ButtonIcon,
  CardContent,
  Container,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {StatusBar, View} from 'react-native';
import {TingaLogo} from '../../assets/svg';
import {Gift} from 'iconsax-react-native';
import {fontFamilys} from '../../constants/fontFamily';

const HomeScreen = () => {
  return (
    <Container isScroll backgroundColor={appColors.primary}>
      <StatusBar barStyle={'light-content'} />
      <SectionComponent>
        <RowComponent>
          <TingaLogo width={28} height={28} />

          <SpaceComponent width={8} />
          <TitleComponent
            text="Hi, Jenna"
            flex={1}
            size={28}
            color={appColors.white}
            height={28}
          />
          <ButtonIcon
            styles={{
              backgroundColor: appColors.white,
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            icon={<Gift color={appColors.error} size={20} variant="Bold" />}
            onPress={() => {}}
          />
        </RowComponent>
      </SectionComponent>
      <SectionComponent
        styles={{
          flex: 1,
          backgroundColor: appColors.white,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          marginTop: 12,
        }}>
        <CardContent>
          <TitleComponent
            text={`Start your Gluten/-free /!@#$%^&* shopping experience`}
            size={20}
          />
        </CardContent>
      </SectionComponent>
    </Container>
  );
};

export default HomeScreen;
