import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Button,
  ButtonComponent,
  Container,
  LoadingComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {fontFamilys} from '../../constants/fontFamily';
import {global} from '../../styles/global';
import {UserChoose} from '../../Models/UserChoose';
import handleGetData from '../../apis/productAPI';
import ModalUpdatePhoto from '../../modals/ModalUpdatePhoto';
import {Image, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ModalLookup from '../../modals/ModalLookup';
import {LoadingModal} from '../../modals';

const AddNewProduct = ({navigation}: any) => {
  const [product, setProduct] = useState<{
    front_image: any;
    ingredient_image: any;
    nutrition_image: any;
    barcode_image: any;
  }>({
    front_image: undefined,
    ingredient_image: undefined,
    nutrition_image: undefined,
    barcode_image: undefined,
  });
  const [shops, setShops] = useState<UserChoose[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tagetImgage, setTagetImgage] = useState<
    | 'front_image'
    | 'ingredient_image'
    | 'nutrition_image'
    | 'barcode_image'
    | undefined
  >('front_image');
  const [isVisibleModalUploadImage, setIsVisibleModalUploadImage] = useState(
    false,
  );
  const [shopSelected, setShopSelected] = useState<UserChoose>();
  const [isVisibleModalChoiceStore, setIsVisibleModalChoiceStore] = useState(
    false,
  );
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    handleGetAllShops();
  }, []);

  const handleGetAllShops = async () => {
    const api = `/shops`;

    try {
      setIsLoading(true);
      await handleGetData.handleProduct(api).then((res: any) => {
        if (res) {
          setShops(res);
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadFile = (
    key:
      | 'front_image'
      | 'ingredient_image'
      | 'nutrition_image'
      | 'barcode_image',
  ) => {
    setTagetImgage(key);

    setIsVisibleModalUploadImage(true);
  };

  const handleSelectedFile = (file: any) => {
    // console.log(file, tagetImgage);
    const items: any = {...product};
    items[`${tagetImgage}`] = file;

    setProduct(items);
    setTagetImgage(undefined);
  };

  const menuUpload: {
    key:
      | 'front_image'
      | 'ingredient_image'
      | 'nutrition_image'
      | 'barcode_image';
    label: string;
  }[] = [
    {
      key: 'front_image',
      label: 'Product Front',
    },
    {
      key: 'ingredient_image',
      label: 'Product Ingredient',
    },
    {
      key: 'nutrition_image',
      label: 'Product Nutritionals',
    },
    {
      key: 'barcode_image',
      label: 'Barcode',
    },
  ];

  const handleCreateNewProduct = async () => {
    const data = new FormData();

    const itemSelected: any = product;
    for (const i in product) {
      data.append(i, itemSelected[i] ? itemSelected[i] : '');
    }

    data.append('shop_id', shopSelected?.id ?? '');

    const api = `/addProduct`;
    setIsCreating(true);

    try {
      await handleGetData.handleUser(api, data, 'post', true).then(res => {
        console.log(res);
        setIsCreating(false);
      });
    } catch (error) {
      console.log(error);
      setIsCreating(false);
    }
  };

  const renderButton = (item: {
    key:
      | 'front_image'
      | 'ingredient_image'
      | 'nutrition_image'
      | 'barcode_image';
    label: string;
  }) => {
    const itemsProduct: any = product;
    const itemProduct =
      itemsProduct && item.key ? itemsProduct[`${item.key}`] : undefined;

    return itemProduct && itemProduct.uri ? (
      <View
        key={item.key}
        style={{
          marginBottom: 20,
        }}
      >
        <View style={{width: 150}}>
          <Image
            source={{uri: itemProduct.uri}}
            style={{
              width: 150,
              height: 150,
              borderRadius: 8,
              resizeMode: 'cover',
            }}
          />
          <Button
            styles={{
              position: 'absolute',
              top: 2,
              right: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: 100,
              padding: 4,
            }}
            icon={<AntDesign name="close" color={appColors.error} size={22} />}
            onPress={() => {
              itemsProduct[`${item.key}`] = '';
              setProduct({...itemsProduct});
            }}
          />
        </View>

        <TitleComponent size={16} text={item.label} flex={0} />
        <TextComponent text={`Name: ${itemProduct.name}`} />
        <TextComponent text={`Size: ${itemProduct.size} byte`} />
      </View>
    ) : (
      <RowComponent
        key={item.key}
        onPress={() => {
          handleUploadFile(item.key);
        }}
        styles={[
          global.tag,
          global.shadow,
          {
            width: '100%',
            justifyContent: 'flex-start',
            shadowColor: 'rgba(0, 0, 0, 0.15)',
            paddingVertical: 14,
            marginBottom: 20,
            paddingHorizontal: 12,
          },
        ]}
      >
        <TextComponent
          styles={{textAlign: 'center'}}
          text={item.label}
          color={appColors.text2}
          size={16}
          font={fontFamilys.medium}
        />
        <Ionicons name="camera" size={22} color={appColors.gray} />
      </RowComponent>
    );
  };

  return (
    <>
      <Container back isScroll>
        <SectionComponent>
          <TitleComponent text="Create Product" flex={0} size={22} />
          <TextComponent
            text="Please take pictures of the following"
            flex={0}
            color={appColors.gray}
          />
        </SectionComponent>
        {setShops.length > 0 ? (
          <>
            <SectionComponent styles={{flex: 1}}>
              {menuUpload.map(item => renderButton(item))}
              <RowComponent
                onPress={() => {
                  setIsVisibleModalChoiceStore(true);
                  // handleUploadFile(item.key);
                }}
                styles={[
                  global.tag,
                  global.shadow,
                  {
                    width: '100%',
                    justifyContent: 'flex-start',
                    shadowColor: 'rgba(0, 0, 0, 0.15)',
                    paddingVertical: 14,
                    marginBottom: 20,
                    paddingHorizontal: 12,
                  },
                ]}
              >
                <TextComponent
                  text={shopSelected ? shopSelected.name : 'Store'}
                  styles={{textAlign: 'center'}}
                  color={appColors.text2}
                  size={16}
                  font={fontFamilys.medium}
                />
              </RowComponent>
            </SectionComponent>
          </>
        ) : (
          <LoadingComponent isLoading={isLoading} value={shops.length} />
        )}

        <ModalUpdatePhoto
          isVisible={isVisibleModalUploadImage}
          onClose={() => {
            setIsVisibleModalUploadImage(false);
          }}
          onSelectedFile={file => handleSelectedFile(file)}
        />

        <ModalLookup
          values={shops}
          selected={shopSelected}
          visible={isVisibleModalChoiceStore}
          onClose={() => {
            setIsVisibleModalChoiceStore(false);
          }}
          onSelected={(val: UserChoose) => {
            setShopSelected(val);
            setIsVisibleModalChoiceStore(false);
          }}
        />
      </Container>
      <SectionComponent>
        <ButtonComponent
          text="Continue"
          onPress={handleCreateNewProduct}
          iconRight
          fontStyles={{textAlign: 'center'}}
        />
      </SectionComponent>

      <LoadingModal visible={isCreating} />
    </>
  );
};

export default AddNewProduct;
