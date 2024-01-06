import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  LoadingComponent,
  ProductItemComponent,
  RowComponent,
} from '../../../components';
import {Product} from '../../../Models/Product';
import handleGetData from '../../../apis/productAPI';

const FavouritesProducts = () => {
  const [favouritesList, setFavouritesList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getFavouritesList();
  }, []);

  const getFavouritesList = async () => {
    const api = `/listOfFavourites`;
    setIsLoading(true);
    await handleGetData
      .handleProduct(api, {}, 'post')
      .then((res: any) => {
        setFavouritesList(res);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  };
  return favouritesList.length > 0 ? (
    <>
      <FlatList
        // ListHeaderComponent={
        //   <RowComponent
        //     justify="flex-start"
        //     styles={{marginVertical: 12, paddingHorizontal: 16}}>
        //     <ButtonComponent
        //       text={`Products ${favouritesList.length}`}
        //       onPress={() => {}}
        //       styles={{
        //         paddingVertical: 9,
        //         paddingHorizontal: 12,
        //         borderRadius: 100,
        //       }}
        //     />
        //   </RowComponent>
        // }
        numColumns={2}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        data={favouritesList}
        renderItem={({item, index}) => (
          <ProductItemComponent
            onReload={getFavouritesList}
            item={item}
            styles={{marginLeft: 16}}
          />
        )}
      />
    </>
  ) : (
    <LoadingComponent
      isLoading={isLoading}
      value={favouritesList.length}
      message={`Opps.. You don't have any shopping history. Start you first shopping trip now!`}
    />
  );
};

export default FavouritesProducts;
