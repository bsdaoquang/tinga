import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Product} from '../../Models/Product';
import handleGetData from '../../apis/productAPI';
import {
  ButtonComponent,
  Container,
  LoadingComponent,
  ProductItemComponent,
  RowComponent,
  SectionComponent,
  TitleComponent,
} from '../../components';

const MyFavourites = ({navigation}: any) => {
  const [favouritesList, setFavouritesList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getFavouritesList();
  }, [navigation]);

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

  return (
    <Container back>
      <SectionComponent>
        <TitleComponent text="Favourites" flex={0} height={32} size={32} />
      </SectionComponent>
      {favouritesList.length > 0 ? (
        <>
          <FlatList
            ListHeaderComponent={
              <RowComponent
                justify="flex-start"
                styles={{marginVertical: 12, paddingHorizontal: 16}}>
                <ButtonComponent
                  text={`Products ${favouritesList.length}`}
                  onPress={() => {}}
                  styles={{
                    paddingVertical: 9,
                    paddingHorizontal: 12,
                    borderRadius: 100,
                  }}
                />
              </RowComponent>
            }
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
      )}
    </Container>
  );
};

export default MyFavourites;
