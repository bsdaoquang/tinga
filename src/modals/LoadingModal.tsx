import {View, Text, Modal, ActivityIndicator} from 'react-native';
import React from 'react';
import {appColors} from '../constants/appColors';
import {global} from '../styles/global';
import {TextComponent} from '../components';

interface Props {
  visible: boolean;
  mess?: string;
}

const LoadingModal = (props: Props) => {
  const {visible, mess} = props;
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
        <ActivityIndicator color={appColors.white} size={32} />
        <TextComponent
          text={mess ?? 'Loading...'}
          flex={0}
          color={appColors.white}
        />
      </View>
    </Modal>
  );
};

export default LoadingModal;
