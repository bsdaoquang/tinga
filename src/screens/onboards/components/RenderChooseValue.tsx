import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {global} from '../../../styles/global';
import {appColors} from '../../../constants/appColors';
import {TextComponent} from '../../../components';
import {fontFamilys} from '../../../constants/fontFamily';
import {UserChoose} from '../../../Models/UserChoose';

interface Props {
  item: UserChoose;
  onPress: (val: UserChoose) => void;
  selected?: number[];
}

const RenderChooseValue = (props: Props) => {
  const {item, onPress, selected} = props;

  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      key={`item${item}`}
      style={[
        global.tag,
        global.shadow,
        {
          shadowColor: 'rgba(0, 0, 0, 0.15)',
          borderWidth: 2,
          borderColor:
            selected && selected.includes(item.id)
              ? appColors.success1
              : appColors.white,
        },
      ]}>
      <TextComponent
        text={item.name}
        flex={0}
        color={appColors.text2}
        size={selected && selected.includes(item.id) ? 14 : 14}
        font={
          selected && selected.includes(item.id)
            ? fontFamilys.bold
            : fontFamilys.medium
        }
      />
    </TouchableOpacity>
  );
};

export default RenderChooseValue;
