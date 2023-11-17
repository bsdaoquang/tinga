import {ArrowDown2, ArrowUp2, Heart} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Recipe} from '../Models/Recipe';
import {
  Button,
  ButtonComponent,
  RowComponent,
  TextComponent,
  TitleComponent,
} from '../components';
import {appColors} from '../constants/appColors';
import {fontFamilys} from '../constants/fontFamily';
import {global} from '../styles/global';

interface Props {
  visible: boolean;
  onClose: () => void;
  item?: Recipe;
}

const ModalizeRecipeDetail = (props: Props) => {
  const {visible, onClose, item} = props;

  const [isVisibleIngredients, setIsVisibleIngredients] = useState(false);

  useEffect(() => {
    if (visible) {
      modalRef.current?.open();
    } else {
      modalRef.current?.close();
    }
  }, [visible]);

  const modalRef = useRef<Modalize>();

  const handleCloseModal = () => {
    modalRef.current?.close();
  };

  return (
    <Portal>
      <Modalize
        onClose={onClose}
        ref={modalRef}
        adjustToContentHeight
        handlePosition="inside"
        modalStyle={{
          backgroundColor: appColors.success2,
        }}
        handleStyle={{backgroundColor: appColors.gray}}>
        {item && (
          <View>
            <View
              style={{
                backgroundColor: appColors.success2,
                padding: 20,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <RowComponent justify="space-between" styles={{marginBottom: 30}}>
                <TouchableOpacity onPress={() => handleCloseModal()}>
                  <AntDesign name="close" color={appColors.white} size={22} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCloseModal()}>
                  <Heart color={appColors.white} size={24} />
                </TouchableOpacity>
              </RowComponent>
              <TitleComponent
                text={item.title}
                flex={1}
                size={24}
                color={appColors.white}
                line={2}
              />

              <TextComponent
                styles={{paddingVertical: 8}}
                color={appColors.white}
                text={`${item.times}min · Serves ${item.serves} · ${item.type}`}
                line={22}
                flex={0}
              />
            </View>
            <View
              style={{
                padding: 20,
                backgroundColor: appColors.bgColor,
                flex: 1,
              }}>
              <RowComponent justify="flex-start">
                <View
                  style={{
                    width: 56,
                    height: 56,
                    backgroundColor: '#E6EECC',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                    marginRight: 6,
                  }}>
                  <TextComponent text="👍" size={20} flex={0} />
                  <Button
                    styles={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                    }}
                    onPress={() => {}}
                    icon={
                      <MaterialIcons name="info" size={20} color={'#9F9F9F'} />
                    }
                  />
                </View>

                <ButtonComponent
                  styles={[
                    global.shadow,
                    {
                      borderRadius: 100,
                      height: 40,
                      paddingVertical: 0,
                    },
                  ]}
                  fontStyles={{
                    color: appColors.primary,
                    fontFamily: fontFamilys.regular,
                    fontSize: 14,
                    lineHeight: 14,
                  }}
                  color={appColors.white}
                  text="Gluten Free"
                  onPress={() => {}}
                />
              </RowComponent>
              <View style={{paddingTop: 16}}>
                <TextComponent text="Transport your taste buds to the Mediterranean with these delightful grilled shrimp and vegetable skewers. The combination of succulent shrimp, colorful vegetables, and fragrant herbs will have you craving more. This gluten-free, low-carb dinner is a perfect blend of simplicity and freshness." />
              </View>
              <View style={{paddingTop: 16}}>
                <RowComponent styles={{marginBottom: 8}}>
                  <TitleComponent text="Ingredients" size={20} />
                  <TouchableOpacity
                    onPress={() =>
                      setIsVisibleIngredients(!isVisibleIngredients)
                    }>
                    {isVisibleIngredients ? (
                      <ArrowUp2 size={24} color={appColors.text2} />
                    ) : (
                      <ArrowDown2 size={24} color={appColors.text2} />
                    )}
                  </TouchableOpacity>
                </RowComponent>
                {isVisibleIngredients && (
                  <>
                    <TextComponent
                      text="Note: Check ingredient quantities before adding to your list."
                      size={12}
                    />
                  </>
                )}
              </View>
            </View>
          </View>
        )}
      </Modalize>
    </Portal>
  );
};

export default ModalizeRecipeDetail;
