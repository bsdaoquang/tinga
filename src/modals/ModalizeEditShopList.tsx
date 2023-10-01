import React, {useEffect, useRef} from 'react';
import {Modalize} from 'react-native-modalize';
import {RowComponent, TextComponent} from '../components';
import {Portal} from 'react-native-portalize';
import {ActionSheetIOS, Platform, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {appColors} from '../constants/appColors';

interface Props {
  visible: boolean;
  onClose: () => void;
  onPress: (id: string) => void;
}

const menuUpdateShopListIos = ['Cancel', 'Edit List', 'Swap Items'];
const menuUpdateShopListAndroid = [
  {
    id: 'edit',
    tilte: 'Edit List',
  },
  {
    id: 'swap',
    tilte: 'Swap Items',
  },
  {
    id: 'cancel',
    tilte: 'Cancel',
    isDanger: true,
  },
];

const ModalizeEditShopList = (props: Props) => {
  const {visible, onClose, onPress} = props;
  const modalize = useRef<Modalize>();

  useEffect(() => {
    if (visible) {
      modalize.current?.open();
      // Platform.OS === 'android'
      //   ? modalize.current?.open()
      //   : ActionSheetIOS.showActionSheetWithOptions(
      //       {
      //         options: menuUpdateShopListIos,
      //         cancelButtonIndex: 0,
      //         userInterfaceStyle: 'light',
      //         title: 'Cập nhật ảnh đại diện',
      //       },

      //       buttonIndex => console.log(buttonIndex),
      //     );
    } else {
      Platform.OS === 'android' && modalize.current?.close();
    }
  }, [visible]);

  const handleCloseModal = () => {
    Platform.OS === 'android' && modalize.current?.close();
  };

  return (
    <Portal>
      <Modalize
        onClose={onClose}
        ref={modalize}
        adjustToContentHeight
        handlePosition="inside">
        <View style={{paddingBottom: 40, paddingHorizontal: 20}}>
          <RowComponent
            justify="flex-end"
            styles={{paddingTop: 20}}
            onPress={handleCloseModal}>
            <AntDesign name="close" color={appColors.gray} size={22} />
          </RowComponent>
          {menuUpdateShopListAndroid.map((item, index) => (
            <RowComponent
              onPress={() => {
                item.id === 'cancel' ? handleCloseModal() : onPress(item.id);
              }}
              styles={{
                paddingVertical: 14,
                borderBottomColor: appColors.gray1,
                borderBottomWidth:
                  index < menuUpdateShopListAndroid.length ? 1 : 0,
              }}
              key={item.id}>
              <TextComponent
                text={item.tilte}
                color={item.isDanger ? appColors.error : appColors.text}
                flex={0}
              />
            </RowComponent>
          ))}
        </View>
      </Modalize>
    </Portal>
  );
};

export default ModalizeEditShopList;
