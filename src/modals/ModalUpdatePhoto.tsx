import React from 'react';
import {Modal, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Button, RowComponent} from '../components';
import {appColors} from '../constants/appColors';
import {global} from '../styles/global';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const ModalUpdatePhoto = (props: Props) => {
  const {isVisible, onClose} = props;

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
              icon={<AntDesign name="close" size={22} color={appColors.gray} />}
            />
          </RowComponent>
        </View>
      </View>
    </Modal>
  );
};

export default ModalUpdatePhoto;
