import React, {useEffect, useRef} from 'react';
import {Modalize} from 'react-native-modalize';
import {RowComponent, TextComponent} from '../components';
import {Portal} from 'react-native-portalize';
import {View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {appColors} from '../constants/appColors';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const ModalInfoScore = (props: Props) => {
  const {visible, onClose} = props;

  useEffect(() => {
    visible && modalRef.current?.open();
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
        handlePosition="inside">
        <View
          style={{
            padding: 20,
            paddingBottom: 40,
          }}>
          <RowComponent justify="flex-end" onPress={handleCloseModal}>
            <AntDesign name="close" color={appColors.gray} size={22} />
          </RowComponent>
        </View>
      </Modalize>
    </Portal>
  );
};

export default ModalInfoScore;
