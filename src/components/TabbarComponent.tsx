import React from 'react';
import {TouchableOpacity} from 'react-native';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import TitleComponent from './TitleComponent';
import {appColors} from '../constants/appColors';
import {fontFamilys} from '../constants/fontFamily';

interface Props {
  title: string;
  seemore?: boolean;
  onPress?: () => void;
}

const TabbarComponent = (props: Props) => {
  const {title, seemore, onPress} = props;

  return (
    <RowComponent
      justify="space-between"
      styles={{
        marginBottom: 12,
      }}>
      <TitleComponent text={title} flex={1} size={20} />
      {seemore && onPress && (
        <TouchableOpacity onPress={onPress}>
          <TextComponent
            text="View All"
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
