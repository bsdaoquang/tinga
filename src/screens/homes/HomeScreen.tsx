import React from 'react';
import {
  Container,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {StatusBar} from 'react-native';
import {TingaLogo} from '../../assets/icons';

const HomeScreen = () => {
  return (
    <Container backgroundColor={appColors.primary}>
      <StatusBar barStyle={'light-content'} />
      <SectionComponent>
        <RowComponent>
          <TingaLogo width={27} height={27} />
          <TextComponent text="fsafssf" />
        </RowComponent>
      </SectionComponent>
    </Container>
  );
};

export default HomeScreen;
