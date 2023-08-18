import React from 'react';
import {Button, RowComponent, TextComponent} from '../../../components';
import {appColors} from '../../../constants/appColors';

const TermsText = ({text}: {text: string}) => {
  return (
    <RowComponent>
      <TextComponent text={text} flex={0} size={12} />
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
  );
};

export default TermsText;
