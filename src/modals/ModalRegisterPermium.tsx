import React, {useState} from 'react';
import {Modal, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Subscription} from '../Models/Subscription';
import {
  Button,
  ButtonComponent,
  RowComponent,
  TitleComponent,
} from '../components';
import {appColors} from '../constants/appColors';
import {fontFamilys} from '../constants/fontFamily';
import {global} from '../styles/global';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  permiumItem?: Subscription;
  onSubcription: (isFree: boolean) => void;
}

const date = new Date();
const timeInDay = 24 * 60 * 60 * 1000;

const ModalRegisterPermium = (props: Props) => {
  const {isVisible, onClose, permiumItem, onSubcription} = props;

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
              text={permiumItem ? permiumItem.title : ''}
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
              onPress={() => onSubcription(false)}
              fontStyles={{fontSize: 22}}
              styles={{
                paddingVertical: 14,
              }}
            />
            <ButtonComponent
              outline
              text="Failed Transaction"
              onPress={() => onSubcription(true)}
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
