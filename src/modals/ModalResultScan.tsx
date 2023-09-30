import React from 'react';
import {FlatList, Image, Modal, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Button,
  ButtonComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../components';
import {appColors} from '../constants/appColors';
import {global} from '../styles/global';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {groceriesSelector} from '../redux/reducers/groceryReducer';
import {Product} from '../Models/Product';
import FastImage from 'react-native-fast-image';
import {handleSaveUser} from '../utils/handleSaveUser';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  count: number;
}

const ModalResultScan = (props: Props) => {
  const {isVisible, onClose, count} = props;
  const navigation: any = useNavigation();

  const groceriesList = useSelector(groceriesSelector);

  const handleClose = () => {
    onClose();
  };

  const renderItemSelected = (item: Product, index: number) => (
    <RowComponent
      key={`item${item.id}${index}`}
      styles={{
        paddingVertical: 8,
      }}>
      <FastImage
        source={{
          uri: item.image,
        }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 100,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 12,
        }}>
        <RowComponent justify="flex-start">
          <TextComponent text={item.name} flex={0} />
        </RowComponent>
        <RowComponent justify="flex-start">
          <RowComponent
            styles={[
              global.tag,
              {
                backgroundColor: '#E6EECC',
                borderRadius: 100,
                paddingHorizontal: 8,
                paddingVertical: 4,
              },
            ]}>
            <TextComponent text="Added To My List" flex={0} size={12} />
            <SpaceComponent width={4} />
            <AntDesign name="check" size={16} color={appColors.text} />
          </RowComponent>
        </RowComponent>
      </View>
    </RowComponent>
  );

  const renderResultCount = () => {
    let title = ``;
    let text = ``;

    switch (true) {
      case count < 5:
        title = 'Sure you’re finished?';
        text = 'Keep up the great work, you’re almost there!';
        break;
      case count === 5:
        title = 'Great Work!';
        text =
          'You’re already putting in the work towards meeting your dietary goals';
        break;
      case count < 5:
        title = 'Excellent!';
        text = 'That’s a big head-start towards your dietary goals';
        break;
    }

    return (
      <>
        <TitleComponent
          text={`${count}/5 - ${title}`}
          flex={0}
          size={20}
          styles={{textAlign: 'center'}}
        />
        <TextComponent text={text} flex={0} styles={{textAlign: 'center'}} />
      </>
    );
  };

  const handleCloseModalAndSaveUser = () => {
    console.log('Close');
    // onClose();
    // navigation.navigate('HomeCarousels');
  };

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={[global.modalContainer]}>
        <View style={[global.modalContent]}>
          {renderResultCount()}
          <View
            style={{
              borderBottomColor: '#d9d9d9',
              borderBottomWidth: 0.5,
              paddingVertical: 12,
            }}>
            <ButtonComponent
              text="I’m Done "
              onPress={handleCloseModalAndSaveUser}
              styles={{marginVertical: 8}}
            />
            <ButtonComponent
              text="Keep Scanning"
              onPress={handleClose}
              color={'#13917B'}
              textColor={appColors.white}
              styles={{marginVertical: 8}}
            />
          </View>

          <FlatList
            style={{height: 250}}
            data={groceriesList ?? []}
            renderItem={({item, index}) => renderItemSelected(item, index)}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalResultScan;
