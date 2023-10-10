import React from 'react';
import {Modal, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Button,
  ButtonComponent,
  RowComponent,
  TitleComponent,
} from '../components';
import {appColors} from '../constants/appColors';
import {global} from '../styles/global';
import {fontFamilys} from '../constants/fontFamily';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  permiumItem: any;
}

const ModalRegisterPermium = (props: Props) => {
  const {isVisible, onClose, permiumItem} = props;

  const handleClose = () => {
    onClose();
  };
  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={[global.modalContainer]}>
        <View style={[global.modalContent]}>
          <RowComponent justify="flex-end">
            <Button
              onPress={handleClose}
              icon={<AntDesign name="close" size={24} color={appColors.gray} />}
            />
          </RowComponent>

          <RowComponent>
            <TitleComponent
              text={permiumItem ? permiumItem.name : ''}
              size={28}
              flex={0}
            />
            <TitleComponent
              text={' Subscription'}
              font={fontFamilys.regular}
              size={28}
              flex={0}
            />
          </RowComponent>
          <View
            style={{
              // paddingHorizontal: 20,
              marginVertical: 20,
            }}
          >
            <ButtonComponent
              text="Successful Transaction"
              onPress={() => {}}
              fontStyles={{fontSize: 22}}
              styles={{
                paddingVertical: 12,
              }}
            />
            <ButtonComponent
              outline
              text="Failed Transaction"
              onPress={() => {}}
              fontStyles={{fontSize: 22}}
              styles={{
                paddingVertical: 12,
                marginTop: 12,
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalRegisterPermium;
