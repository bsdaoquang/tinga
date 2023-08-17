import {View, Text, StatusBar, ImageBackground} from 'react-native';
import React from 'react';
import {appSize} from '../../constants/appSize';
import {
  Button,
  ButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {fontFamilys} from '../../constants/fontFamily';

const LoginScreen = () => {
  return (
    <>
      <StatusBar translucent barStyle={'dark-content'} />
      <ImageBackground
        source={require('../../assets/images/BGLogin.png')}
        style={{
          flex: 1,
          width: appSize.width,
        }}
        imageStyle={{resizeMode: 'cover'}}>
        <SectionComponent
          styles={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingVertical: 20,
            width: '100%',
          }}>
          <TitleComponent text="Welcome to Tinga" size={32} flex={0} />
          <TextComponent
            flex={0}
            styles={{textAlign: 'center'}}
            text="Create an account to change the way you shop with Tinga – your personalised nutrition assistant"
          />

          <ButtonComponent
            text="Continue to Sign Up"
            onPress={() => {}}
            color={appColors.white}
            styles={{
              marginVertical: 16,
              width: '90%',
              borderWidth: 1,
              borderColor: 'rgba(238, 243, 220, 1)',
            }}
            textColor={appColors.text}
          />

          <RowComponent>
            <TextComponent text="Already have an account? " flex={0} />
            <Button
              text="Login"
              onPress={() => {}}
              textColor={appColors.primary}
              fontStyles={{fontFamily: fontFamilys.bold}}
            />
          </RowComponent>
          <SpaceComponent height={16} />
          <RowComponent>
            <TextComponent
              text="By continuing you agree with our "
              flex={0}
              size={12}
            />
            <Button
              text="Terms"
              onPress={() => {}}
              textColor={appColors.primary}
              textSize={12}
            />
            <TextComponent text=" and " flex={0} size={12} />
            <Button
              text="Privacy Policy."
              onPress={() => {}}
              textColor={appColors.primary}
              textSize={12}
            />
          </RowComponent>
        </SectionComponent>
      </ImageBackground>
    </>
  );
};

export default LoginScreen;
