import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {useSelector} from 'react-redux';
import {
  Button,
  ButtonComponent,
  Container,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {appSize} from '../../constants/appSize';
import {ModalizeEditShopList} from '../../modals';
import ModalizeInfoGrocery from '../../modals/ModalizeInfoGrocery';
import {groceriesSelector} from '../../redux/reducers/groceryReducer';
import AddToList from './component/AddToList';
import {useIsFocused} from '@react-navigation/native';

const GroceryScreen = ({navigation}: any) => {
  const [isVisibleModalInfo, setIsVisibleModalInfo] = useState(false);
  const [isVisibleModalEditList, setIsVisibleModalEditList] = useState(false);
  const [isEditList, setIsEditList] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && isEditList && setIsEditList(false);
  }, [isFocused]);

  const productList = useSelector(groceriesSelector);

  const handleModalId = (id: string) => {
    if (id === 'edit') {
      setIsEditList(!isEditList);
    } else if (id === 'swap') {
      navigation.navigate('ImproveScore');
    }

    setIsVisibleModalEditList(false);
  };

  return (
    <Container>
      <SectionComponent>
        <RowComponent styles={{marginTop: 20}} justify="flex-end">
          <Button
            icon={
              <Feather name="more-vertical" size={24} color={appColors.gray5} />
            }
            onPress={() => setIsVisibleModalEditList(true)}
          />
        </RowComponent>
        <RowComponent justify="flex-start">
          <TitleComponent
            text="Your Grocery List"
            size={32}
            height={32}
            flex={0}
          />
          <SpaceComponent width={8} />
          <Button
            icon={
              <MaterialIcons name="info-outline" size={24} color={'#9F9F9F'} />
            }
            onPress={() => {
              setIsVisibleModalInfo(true);
            }}
          />
        </RowComponent>
      </SectionComponent>
      {productList.length > 0 ? (
        <AddToList isEdit={isEditList} />
      ) : (
        <>
          <SectionComponent
            styles={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextComponent
              text="Your grocery list is currently empty."
              size={16}
              color={appColors.gray5}
              height={28}
              flex={0}
            />
            <TextComponent
              height={28}
              text="Add items to your list from the Explore tab."
              size={16}
              color={appColors.gray5}
              flex={0}
            />

            <ButtonComponent
              text="ADD TO LIST"
              width={appSize.width - 32}
              styles={{marginVertical: 20, paddingVertical: 10}}
              textColor={appColors.white}
              icon={
                <View
                  style={{
                    backgroundColor: 'rgba(65, 57, 62, 0.50);',
                    // width: 24,
                    // height: 24,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 60,
                    padding: 4,
                  }}>
                  <Ionicons name="add" size={22} color={appColors.white} />
                </View>
              }
              color={appColors.success}
              onPress={() =>
                navigation.navigate('Explore', {screen: 'ExploreScreen'})
              }
            />
            <RowComponent onPress={() => navigation.navigate('ShopingHistory')}>
              <Octicons color={appColors.success} size={22} name="history" />
              <SpaceComponent width={8} />
              <TitleComponent
                text="VIEW HISTORY"
                color={appColors.success}
                flex={0}
              />
            </RowComponent>
          </SectionComponent>
        </>
      )}

      <ModalizeInfoGrocery
        visible={isVisibleModalInfo}
        onClose={() => setIsVisibleModalInfo(false)}
      />
      <ModalizeEditShopList
        visible={isVisibleModalEditList}
        onClose={() => setIsVisibleModalEditList(false)}
        onPress={id => handleModalId(id)}
        isEdit={isEditList}
      />
    </Container>
  );
};

export default GroceryScreen;
