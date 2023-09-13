import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  ButtonComponent,
  RowComponent,
  SpaceComponent,
  TitleComponent,
} from '../components';
import {appColors} from '../constants/appColors';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const ModalizeProducDetail = (props: Props) => {
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
          <RowComponent justify="flex-start" onPress={handleCloseModal}>
            <AntDesign name="close" color={appColors.gray} size={22} />
          </RowComponent>

          <TitleComponent text="Oops! Product Not Found" size={24} />
          <SpaceComponent height={16} />
          <ButtonComponent text="Scan Something Else" onPress={onClose} />
        </View>
      </Modalize>
    </Portal>
  );
};

export default ModalizeProducDetail;
