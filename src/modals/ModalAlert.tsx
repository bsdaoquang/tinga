import React from 'react';
import {Modal, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Button,
  ButtonComponent,
  RowComponent,
  TextComponent,
  TitleComponent,
} from '../components';
import {appColors} from '../constants/appColors';
import {global} from '../styles/global';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  mess?: string;
  onOK: () => void;
}

const ModalAlert = (props: Props) => {
  const {isVisible, onClose, title, mess, onOK} = props;

  const handleClose = () => {
    onClose();
  };
  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={[global.modalContainer]}>
        <View style={[global.modalContent]}>
          <RowComponent justify="flex-end">
            <TitleComponent text={title ?? ''} size={22} />
            <Button
              onPress={handleClose}
              icon={<AntDesign name="close" size={22} color={appColors.gray} />}
            />
          </RowComponent>
          <View style={{paddingVertical: 20}}>
            <TextComponent text={mess ?? ''} flex={0} size={16} />
          </View>
          <ButtonComponent onPress={onOK} text="OK" height={32} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalAlert;
