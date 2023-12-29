import React, {useState} from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {Recipe} from '../Models/Recipe';
import {CheftHatSuccess} from '../assets/svg';
import {appColors} from '../constants/appColors';
import {appSize} from '../constants/appSize';
import ModalizeRecipeDetail from '../modals/ModalizeRecipeDetail';
import {global} from '../styles/global';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import TitleComponent from './TitleComponent';

interface Props {
  item: Recipe;
  styles?: StyleProp<ViewStyle>;
  onReload?: () => void;
}

const RecipeItemComponent = (props: Props) => {
  const {item, styles, onReload} = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsVisibleModal(true)}
        style={[
          global.shadow,
          {
            width: (appSize.width - (32 + 12)) / 2,
            marginBottom: 16,
            padding: 0,
            backgroundColor: appColors.white,
            borderRadius: 10,
            height: 180,
          },
          styles,
        ]}>
        <View
          style={{
            flex: 1.5,
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
            text={item.meal_title}
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
            text={`${item.cook_time}min · Serves ${item.noservings}`}
            size={10}
          />
          <RowComponent justify="space-between">
            <TextComponent
              text={`${item.type}`}
              color={`#41393E99`}
              size={10}
              flex={0}
            />
          </RowComponent>
        </View>
      </TouchableOpacity>
      <ModalizeRecipeDetail
        item={item}
        visible={isVisibleModal}
        onClose={() => setIsVisibleModal(false)}
        onReload={onReload}
      />
    </>
  );
};

export default RecipeItemComponent;
