import {View, Text, Modal, ActivityIndicator} from 'react-native';
import React from 'react';
import {appColors} from '../constants/appColors';
import {global} from '../styles/global';

interface Props {
  visible: boolean;
}

const LoadingModal = (props: Props) => {
  const {visible} = props;
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View
        style={[
          global.container,
          {
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <ActivityIndicator color={appColors.gray} size={32} />
      </View>
    </Modal>
  );
};

export default LoadingModal;
