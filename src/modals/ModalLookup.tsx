import {TickSquare} from 'iconsax-react-native';
import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {UserChoose} from '../Models/UserChoose';
import {RowComponent, TitleComponent} from '../components';
import {appColors} from '../constants/appColors';

interface Props {
  visible: boolean;
  onClose: () => void;
  values: UserChoose[];
  selected?: UserChoose;
  onSelected: (val: UserChoose) => void;
}

const ModalLookup = (props: Props) => {
  const {visible, onClose, values, selected, onSelected} = props;

  useEffect(() => {
    visible ? modalRef.current?.open() : modalRef.current?.close();
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
        handlePosition="inside"
        HeaderComponent={
          <RowComponent
            styles={{padding: 16}}
            justify="flex-end"
            onPress={handleCloseModal}>
            <AntDesign name="close" color={appColors.gray} size={22} />
          </RowComponent>
        }>
        <View
          style={{
            paddingBottom: 40,
            paddingHorizontal: 16,
          }}>
          {values.map(item => (
            <RowComponent
              key={item.id}
              styles={{paddingVertical: 12}}
              onPress={() => onSelected(item)}>
              <TitleComponent text={item.name} />
              {item.id === selected?.id && (
                <TickSquare size={20} color={appColors.primary1} />
              )}
            </RowComponent>
          ))}
        </View>
      </Modalize>
    </Portal>
  );
};

export default ModalLookup;
