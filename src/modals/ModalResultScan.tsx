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

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const ModalResultScan = (props: Props) => {
  const {isVisible, onClose} = props;
  const navigation: any = useNavigation();
  const handleClose = () => {
    onClose();
  };

  const renderItemSelected = (item: any) => (
    <RowComponent
      styles={{
        paddingVertical: 8,
      }}>
      <Image
        source={{
          uri: 'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1695600000&Signature=Lg1zOVGWIh-PObTZ~1emXensFTTJhm4mMd-MEaUH9Uzm3WkG~D46kmA6Q6OqdarLpSTtfLOy1gqdgja40gXnsWHqhABJpIWh6oLvlwHw5s3j~FylcAxldq6RyclYck-yzX0jHNzpMDPwl2t--2G11Ns9fGyAfVrE1~x5S85d1acRYh9i-6uCS1Na5DADtO0HN2eDJ5Had7g05llBicXHzuRlin0Hd8kKDWCI-vH9UWHVjG42fS63Z-zr1~rrHx~l8CdUHQBZWYbnN8DlZ8qAGr0VSKFu0Yvzo1GNFYIYYkUgSCegvTmj9CIuqASlRx2s5NtDymYai4uqfuDEMqemLQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 100,
        }}
      />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 12,
        }}>
        <RowComponent justify="flex-start">
          <TextComponent text={`Gluten-Free Bread`} flex={0} />
          <AntDesign
            name="swap"
            size={20}
            color={appColors.gray4}
            style={{marginHorizontal: 4}}
          />
          <TextComponent
            text={`White Bread`}
            flex={1}
            line={1}
            styles={{
              textDecorationColor: appColors.text,
              textDecorationLine: 'line-through',
            }}
          />
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

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={[global.modalContainer]}>
        <View style={[global.modalContent]}>
          <TitleComponent
            text={`12/5 - Excellent!`}
            flex={0}
            size={20}
            styles={{textAlign: 'center'}}
          />
          <TextComponent
            text="That’s a big head-start towards your dietary goals"
            flex={0}
            styles={{textAlign: 'center'}}
          />

          <View
            style={{
              borderBottomColor: '#d9d9d9',
              borderBottomWidth: 0.5,
              paddingVertical: 12,
            }}>
            <ButtonComponent
              text="I’m Done "
              onPress={() =>
                navigation.navigate('Home', {
                  screen: 'HomeScreen',
                  params: {
                    isResultScan: true,
                  },
                })
              }
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
            data={Array.from({length: 5})}
            renderItem={({item}) => renderItemSelected(item)}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalResultScan;
