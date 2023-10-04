import React from 'react';
import {ListMenuItem} from '../Models/ListMenuItem';
import {appColors} from '../constants/appColors';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import {ArrowRight, ArrowRight2, Icon} from 'iconsax-react-native';
import {fontFamilys} from '../constants/fontFamily';
import {View} from 'react-native';
interface Props {
  item: ListMenuItem;
  onPress: () => void;
  isHideBorder?: boolean;
}

const ListItemComponent = (props: Props) => {
  const {item, onPress, isHideBorder} = props;

  return (
    <RowComponent
      onPress={onPress}
      styles={{
        borderBottomColor: appColors.gray3,
        borderBottomWidth: isHideBorder ? 0 : 0.5,
        padding: 18,
      }}>
      {item.icon && (
        <View
          style={{
            // backgroundColor: 'coral',
            width: 20,
            height: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {item.icon}
        </View>
      )}

      <TextComponent
        text={item.title}
        font={item.isPrimary ? fontFamilys.bold : fontFamilys.medium}
        color={item.isPrimary ? appColors.danger : appColors.text3}
        styles={{marginLeft: item.icon ? 12 : 0}}
      />
      <ArrowRight2 size={18} color={appColors.gray} />
    </RowComponent>
  );
};

export default ListItemComponent;
