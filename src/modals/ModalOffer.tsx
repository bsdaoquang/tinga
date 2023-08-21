import React from 'react';
import {Image, Modal, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Button,
  ButtonComponent,
  RowComponent,
  TitleComponent,
} from '../components';
import {appColors} from '../constants/appColors';
import {global} from '../styles/global';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const ModalOffer = (props: Props) => {
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
          <View>
            <TitleComponent
              text="You have an offer waiting!"
              flex={0}
              size={22}
            />
            <RowComponent>
              <Image
                source={require('../assets/images/ImageOffer.png')}
                style={[
                  {
                    marginVertical: 12,
                    width: 130,
                    height: 130,
                    resizeMode: 'contain',
                  },
                ]}
              />
            </RowComponent>
            <ButtonComponent text="View Offer" onPress={handleClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalOffer;
