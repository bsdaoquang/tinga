import React, {useState} from 'react';
import {ActivityIndicator, Alert, Modal, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Button,
  ButtonComponent,
  InputComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../components';
import {appColors} from '../constants/appColors';
import {global} from '../styles/global';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const ModalFeedback = (props: Props) => {
  const {isVisible, onClose} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [contentFeedback, setContentFeedback] = useState('');
  const [isSeended, setIsSeended] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleSendFeedback = () => {
    if (!contentFeedback) {
      Alert.alert('', 'What is your feedback');
      return;
    } else {
      setIsLoading(true);

      // do something at here
      setIsSeended(true);

      setIsLoading(false);
    }
  };
  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={[global.modalContainer]}>
        <View style={[global.modalContent]}>
          <RowComponent justify="flex-end">
            <Button
              onPress={handleClose}
              icon={<AntDesign name="close" size={22} color={appColors.gray} />}
            />
          </RowComponent>
          {isLoading ? (
            <ActivityIndicator color={appColors.gray} />
          ) : isSeended ? (
            <View style={{paddingVertical: 80}}>
              <TitleComponent
                height={26}
                text={`Thank you for\nyour feedback.`}
                flex={0}
                size={22}
                styles={{textAlign: 'center', marginBottom: 24}}
              />
              <ButtonComponent onPress={handleClose} text="Close" />
            </View>
          ) : (
            <>
              <View style={global.center}>
                <TitleComponent
                  height={26}
                  text="We’d love your feedback."
                  flex={0}
                  size={22}
                />
                <SpaceComponent height={8} />
                <TextComponent text="How can we improve?" flex={0} />
              </View>

              <InputComponent
                styles={{marginTop: 16}}
                placeholder="Message *"
                value={contentFeedback}
                onChange={val => setContentFeedback(val)}
                isMultible
                rows={6}
              />

              <ButtonComponent
                onPress={handleSendFeedback}
                text="Submit to Tinga"
              />
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalFeedback;
