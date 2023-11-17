import React from 'react';
import CardContent from './CardContent';
import TitleComponent from './TitleComponent';
import {appSize} from '../constants/appSize';
import {appColors} from '../constants/appColors';
import {View} from 'react-native';
import {fontFamilys} from '../constants/fontFamily';
import TextComponent from './TextComponent';
import RowComponent from './RowComponent';
import {CheftHatSuccess, UnionSelected} from '../assets/svg';
import SpaceComponent from './SpaceComponent';

interface Props {
  item: any;
}

const RecipeItemComponent = (props: Props) => {
  const {item} = props;

  return (
    <View
      style={{
        width: (appSize.width - (32 + 12)) / 2,

        marginBottom: 16,
        padding: 0,
        backgroundColor: appColors.white,
        borderRadius: 10,
        height: 180,
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: appColors.success2,
          padding: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          alignItems: 'stretch',
        }}>
        <View style={{flex: 1}}>
          <CheftHatSuccess />
        </View>
        <TitleComponent
          text={item.title}
          line={3}
          size={12}
          flex={0}
          color={appColors.white}
          height={16}
        />
      </View>
      <View
        style={{
          flex: 1,
          padding: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}>
        <TextComponent
          text={`${item.times}min · Serves ${item.serves}`}
          size={10}
        />
        <RowComponent justify="space-between">
          <TextComponent
            text={`${item.type}`}
            color={`#41393E99`}
            size={10}
            flex={0}
          />
          <View
            style={{
              width: 18,
              height: 18,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#E6EECC',
              borderRadius: 100,
            }}>
            <TextComponent text="👍" flex={0} size={9} />
          </View>
        </RowComponent>
      </View>
    </View>
  );
};

export default RecipeItemComponent;
