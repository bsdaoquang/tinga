import React from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';
import {TextComponent} from '../components';
import {appColors} from '../constants/appColors';
import {appSize} from '../constants/appSize';
import {global} from '../styles/global';

interface Props {
  visible: boolean;
  mess?: string;
}

const LoadingModal = (props: Props) => {
  const {visible, mess} = props;
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent>
      <View
        style={[
          global.container,
          {
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center',
            height: appSize.height,
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
