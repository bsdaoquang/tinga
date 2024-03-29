import React from 'react';
import {ImageProps, Modal, View} from 'react-native';
import ImageCropPicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Button,
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
  onSelectedFile: (file: any) => void;
}

interface AvatarProps extends ImageProps {
  onChange?: (image: ImageOrVideo) => void;
}

const ModalUpdatePhoto = (props: Props, avatarProps: AvatarProps) => {
  const {isVisible, onClose, onSelectedFile} = props;

  const handleClose = () => {
    onClose();
  };

  const handlePickerImage = async (target: 'camera' | 'library') => {
    onClose();
    if (target === 'camera') {
      //request permision
      ImageCropPicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
        useFrontCamera: false,
      })
        .then((image: ImageOrVideo) => {
          const file = {
            uri: image.path,
            name: 'image-' + image.modificationDate,
            type: image.mime,
            size: image.size,
          };

          // handleUploadFile(file);
          onSelectedFile(file);
          onClose();
          avatarProps.onChange?.(image);
        })
        .catch(error => console.log('Lỗi', error.toString()));
    } else {
      await launchImageLibrary({mediaType: 'photo'}, result => {
        if (result && result.assets) {
          const file = result.assets[0];
          if (file && file.uri) {
            const newFile = {
              uri: file.uri,
              name: file.fileName,
              type: file.type,
              size: file.fileSize,
            };

            onSelectedFile(newFile);
            onClose();
          }
        }
      });
    }
  };
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      statusBarTranslucent>
      <View style={[global.modalContainer]}>
        <View style={[global.modalContent]}>
          <RowComponent justify="flex-end">
            <TitleComponent text="Upload Photo profile" size={18} />
            <Button
              onPress={handleClose}
              icon={<AntDesign name="close" size={22} color={appColors.gray} />}
            />
          </RowComponent>

          <View style={{marginVertical: 20}}>
            <RowComponent
              styles={{paddingVertical: 12}}
              onPress={() => handlePickerImage('camera')}>
              <Ionicons name="camera" size={20} color={appColors.text} />
              <SpaceComponent width={8} />
              <TextComponent text="Camera" size={14} />
            </RowComponent>
            <RowComponent
              styles={{paddingVertical: 12}}
              onPress={() => handlePickerImage('library')}>
              <Ionicons name="image" size={20} color={appColors.text} />
              <SpaceComponent width={8} />
              <TextComponent text="Image library" size={14} />
            </RowComponent>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalUpdatePhoto;
