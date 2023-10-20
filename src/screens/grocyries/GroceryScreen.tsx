import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {AddProduct, Product} from '../../Models/Product';
import handleGetData from '../../apis/productAPI';
import {
  Button,
  ButtonComponent,
  Container,
  LoadingComponent,
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
import {showToast} from '../../utils/showToast';

const GroceryScreen = ({navigation}: any) => {
  const [isVisibleModalInfo, setIsVisibleModalInfo] = useState(false);
  const [isVisibleModalEdit, setIsVisibleModalEdit] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [productsSelected, setProductsSelected] = useState<Product[]>([]);

  const [products, setProducts] = useState<AddProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllCreatedItems();
  }, []);

  const getAllCreatedItems = async () => {
    const api = `/getProduct`;
    setIsLoading(true);
    await handleGetData
      .handleUser(api)
      .then((res: any) => {
        setProducts(res);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        showToast(JSON.stringify(error));
      });
  };

  const onPressModal = (id: string) => {
    switch (id) {
      case 'swap':
        navigation.navigate('ImproveScore', {products: productsSelected});
        break;

      case 'edit':
        setIsEdit(!isEdit);
        break;
    }

    setIsVisibleModalEdit(false);
  };

  const handleRemoveProduct = async (id: number) => {
    const api = `/deleteProduct`;
    const data = {
      id,
    };

    await handleGetData
      .handleUser(api, data, 'post')
      .then((res: any) => {
        if (res.success) {
          showToast(res.message);
          getAllCreatedItems();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Container>
      {isLoading ? (
        <LoadingComponent isLoading={isLoading} value={0} />
      ) : (
        <>
          <SectionComponent>
            <RowComponent styles={{marginTop: 20}} justify="flex-end">
              <Button
                icon={
                  <Feather
                    name="more-vertical"
                    size={22}
                    color={appColors.gray5}
                  />
                }
                onPress={() => {
                  setIsVisibleModalEdit(true);
                }}
              />
            </RowComponent>
            <RowComponent justify="flex-start">
              <TitleComponent
                text="My Added Products"
                size={32}
                height={32}
                flex={0}
              />
              <SpaceComponent width={8} />
              <Button
                icon={
                  <MaterialIcons
                    name="info-outline"
                    size={24}
                    color={'#9F9F9F'}
                  />
                }
                onPress={() => {
                  setIsVisibleModalInfo(true);
                }}
              />
            </RowComponent>
          </SectionComponent>
          {products.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{paddingTop: 16}}
              numColumns={2}
              data={products}
              renderItem={({item}) => (
                <View
                  key={item.id}
                  style={{
                    width: appSize.width / 2,
                    marginBottom: 20,
                    paddingHorizontal: 12,
                    alignItems: 'center',
                  }}
                >
                  {item.front_image ||
                  item.ingredient_image ||
                  item.nutrition_image ? (
                    <FastImage
                      source={{
                        uri:
                          item.front_image ??
                          item.ingredient_image ??
                          item.nutrition_image ??
                          '',
                      }}
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 12,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  ) : (
                    <View
                      style={{
                        width: 120,
                        height: 120,
                        backgroundColor: appColors.gray,
                        borderRadius: 12,
                      }}
                    />
                  )}

                  <TitleComponent
                    text={item.display_name}
                    flex={1}
                    styles={{textAlign: 'left', marginTop: 8}}
                  />

                  <Button
                    styles={{
                      position: 'absolute',
                      right: 30,
                      top: 0,
                      backgroundColor: appColors.gray,
                      borderRadius: 100,
                      padding: 4,
                    }}
                    icon={
                      <Ionicons name="trash" size={18} color={appColors.text} />
                    }
                    onPress={() => handleRemoveProduct(item.id)}
                  />
                </View>
              )}
            />
          ) : (
            <>
              <SectionComponent
                styles={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <TextComponent
                  text="You are not added any product to your list."
                  size={16}
                  color={appColors.gray5}
                  height={28}
                  flex={0}
                />

                <ButtonComponent
                  text="ADD NEW"
                  width={appSize.width - 32}
                  styles={{marginVertical: 20, paddingVertical: 10}}
                  textColor={appColors.white}
                  icon={
                    <View
                      style={{
                        backgroundColor: 'rgba(65, 57, 62, 0.50);',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 60,
                        padding: 4,
                      }}
                    >
                      <Ionicons name="add" size={22} color={appColors.white} />
                    </View>
                  }
                  color={appColors.primary1}
                  onPress={() => navigation.navigate('AddNewScreen')}
                />
                <RowComponent
                  onPress={() => navigation.navigate('CreatedItems')}
                >
                  <Octicons
                    color={appColors.primary1}
                    size={22}
                    name="history"
                  />
                  <SpaceComponent width={8} />
                  <TitleComponent
                    text="VIEW LIST"
                    color={appColors.primary1}
                    flex={0}
                  />
                </RowComponent>
              </SectionComponent>
            </>
          )}
        </>
      )}

      <ModalizeInfoGrocery
        visible={isVisibleModalInfo}
        onClose={() => setIsVisibleModalInfo(false)}
      />
      <ModalizeEditShopList
        visible={isVisibleModalEdit}
        onClose={() => setIsVisibleModalEdit(false)}
        onPress={(id: string) => onPressModal(id)}
      />
    </Container>
  );
};

export default GroceryScreen;
