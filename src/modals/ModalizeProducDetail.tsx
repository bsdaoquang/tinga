import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  ButtonComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../components';
import {appColors} from '../constants/appColors';

interface Props {
  visible: boolean;
  onClose: () => void;
  code?: string;
}

const ModalizeProducDetail = (props: Props) => {
  const {visible, onClose, code} = props;

  useEffect(() => {
    visible ? modalRef.current?.open() : modalRef.current?.close();
  }, [visible]);

  const modalRef = useRef<Modalize>();

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
          <RowComponent justify="flex-start" onPress={onClose}>
            <AntDesign name="close" color={appColors.gray} size={22} />
          </RowComponent>

          <TitleComponent text="Oops! Product Not Found " size={24} />
          <TextComponent text={`barcode scanded: ${code ?? ''}`} />
          <SpaceComponent height={16} />
          <ButtonComponent text="Scan Something Else" onPress={onClose} />
        </View>
      </Modalize>
    </Portal>
  );
};

export default ModalizeProducDetail;
