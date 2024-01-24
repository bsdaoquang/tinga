import React from 'react';
import {Modal, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Button,
  ButtonComponent,
  RowComponent,
  SpaceComponent,
  TitleComponent,
} from '../components';
import {appColors} from '../constants/appColors';
import {global} from '../styles/global';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onRating: () => void;
  onFeedback: () => void;
}

const ModalRating = (props: Props) => {
  const {isVisible, onClose, onRating, onFeedback} = props;

  const handleClose = () => {
    onClose();
  };
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      statusBarTranslucent>
      <View style={[global.modalContainer]}>
        <View style={[global.modalContent]}>
          <RowComponent justify="flex-end">
            <Button
              onPress={handleClose}
              icon={<AntDesign name="close" size={22} color={appColors.gray} />}
            />
          </RowComponent>

          <TitleComponent
            text={`How are you liking\nTinga so far?`}
            size={22}
            styles={{textAlign: 'center'}}
            flex={0}
          />
          <SpaceComponent height={18} />
          <ButtonComponent text="Love it!" onPress={onRating} />
          <SpaceComponent height={18} />
          <ButtonComponent text="It’s alright" onPress={onFeedback} outline />
        </View>
      </View>
    </Modal>
  );
};

export default ModalRating;
