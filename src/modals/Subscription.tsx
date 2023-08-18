import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Modal, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Button, ButtonIcon, RowComponent} from '../components';
import {appColors} from '../constants/appColors';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const Subscription = (props: Props) => {
  const navigation: any = useNavigation();
  const {isVisible, onClose} = props;
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      style={{
        flex: 1,
        backgroundColor: appColors.white,
      }}>
      <View
        style={[
          {
            flex: 1,
            paddingVertical: 20,
            paddingHorizontal: 16,
          },
        ]}>
        <RowComponent justify="flex-end">
          <Button
            onPress={onClose}
            icon={<AntDesign name="close" size={22} color={appColors.gray2} />}
          />
          {/* <ButtonIcon
            
          /> */}
        </RowComponent>
      </View>
    </Modal>
  );
};

export default Subscription;
