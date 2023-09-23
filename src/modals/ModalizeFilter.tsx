import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RowComponent, TitleComponent} from '../components';
import {appColors} from '../constants/appColors';
import {showToast} from '../utils/showToast';
import profileAPI from '../apis/userAPI';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const ModalizeFilter = (props: Props) => {
  const {visible, onClose} = props;

  const [userChoices, setuserChoices] = useState();

  useEffect(() => {
    getUserChoices();
  }, []);

  useEffect(() => {
    visible && modalRef.current?.open();
  }, [visible]);

  const modalRef = useRef<Modalize>();

  const handleCloseModal = () => {
    modalRef.current?.close();
  };

  const getUserChoices = async () => {
    const api = `/getUserChoice`;
    try {
      await profileAPI.HandleUser(api).then((res: any) => {
        // console.log(res);
      });
    } catch (error) {
      showToast(`user choice not found`);
      console.log(error);
    }
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

          <TitleComponent text="Filters" size={20} />
        </View>
      </Modalize>
    </Portal>
  );
};

export default ModalizeFilter;
