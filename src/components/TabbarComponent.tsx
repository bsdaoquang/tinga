import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import TitleComponent from './TitleComponent';
import {appColors} from '../constants/appColors';
import {fontFamilys} from '../constants/fontFamily';

interface Props {
  title: string;
  seemore?: boolean;
  onPress?: () => void;
  styles?: StyleProp<ViewStyle>;
  textMore?: string;
}

const TabbarComponent = (props: Props) => {
  const {title, seemore, onPress, styles, textMore} = props;

  return (
    <RowComponent
      justify="space-between"
      styles={[
        {
          marginBottom: 12,
        },
        styles,
      ]}>
      <TitleComponent text={title} flex={1} size={20} />
      {seemore && onPress && (
        <TouchableOpacity onPress={onPress}>
          <TextComponent
            text={textMore ?? 'View All'}
            flex={0}
            color={appColors.success2}
            size={14}
            font={fontFamilys.medium}
          />
        </TouchableOpacity>
      )}
    </RowComponent>
  );
};

export default TabbarComponent;
