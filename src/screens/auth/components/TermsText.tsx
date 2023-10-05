import React from 'react';
import {Button, RowComponent, TextComponent} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {useNavigation} from '@react-navigation/native';
import {Linking} from 'react-native';

const TermsText = ({text, isBreak}: {text: string; isBreak?: boolean}) => {
  const navigation: any = useNavigation();
  return (
    <>
      <RowComponent>
        <TextComponent text={text} flex={0} size={12} />
        <Button
          text="Terms"
          onPress={() => Linking.openURL('https://tinga.ca/terms.html')}
          textColor={appColors.primary}
          textSize={12}
        />
        <TextComponent text={` and `} flex={0} size={12} />
        {!isBreak && (
          <Button
            text="Privacy Policy."
            onPress={() => Linking.openURL('https://tinga.ca/privacy.html')}
            textColor={appColors.primary}
            textSize={12}
          />
        )}
      </RowComponent>
      {isBreak && (
        <Button
          text="Privacy Policy."
          onPress={() => Linking.openURL('https://tinga.ca/privacy.html')}
          textColor={appColors.primary}
          textSize={12}
        />
      )}
    </>
  );
};

export default TermsText;
