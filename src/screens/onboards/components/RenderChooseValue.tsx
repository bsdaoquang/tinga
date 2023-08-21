import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {global} from '../../../styles/global';
import {appColors} from '../../../constants/appColors';
import {TextComponent} from '../../../components';
import {fontFamilys} from '../../../constants/fontFamily';

interface Props {
  value: string;
  onPress: (val: string) => void;
  selected?: string[];
}

const RenderChooseValue = (props: Props) => {
  const {value, onPress, selected} = props;

  return (
    <TouchableOpacity
      onPress={() => onPress(value)}
      key={`item${value}`}
      style={[
        global.tag,
        global.shadow,
        {
          shadowColor: 'rgba(0, 0, 0, 0.15)',
          borderWidth: selected && selected.includes(value) ? 2 : 0,
          borderColor: appColors.success1,
        },
      ]}>
      <TextComponent
        text={value}
        flex={0}
        color={appColors.text2}
        font={
          selected && selected.includes(value)
            ? fontFamilys.bold
            : fontFamilys.medium
        }
      />
    </TouchableOpacity>
  );
};

export default RenderChooseValue;
