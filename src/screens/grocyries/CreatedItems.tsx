import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AddProduct} from '../../Models/Product';
import handleGetData from '../../apis/productAPI';
import {
  Button,
  Container,
  LoadingComponent,
  SectionComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {appSize} from '../../constants/appSize';
import {showToast} from '../../utils/showToast';

const CreatedItems = ({navigation}: any) => {
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
    <Container back>
      <SectionComponent>
        <TitleComponent text="Created Items" size={22} flex={0} />
      </SectionComponent>
      <View style={{flex: 1}}>
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
          <LoadingComponent isLoading={isLoading} value={products.length} />
        )}
      </View>
    </Container>
  );
};

export default CreatedItems;
