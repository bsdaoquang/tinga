import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Product} from '../../Models/Product';
import handleGetData from '../../apis/productAPI';
import {
  ButtonComponent,
  Container,
  ProductItemComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';

const MyFavourites = ({navigation}: any) => {
  const [favouritesList, setFavouritesList] = useState<Product[]>([]);

  useEffect(() => {
    getFavouritesList();
  }, []);

  const getFavouritesList = async () => {
    const api = `/listOfFavourites`;

    await handleGetData
      .handleProduct(api, {}, 'post')
      .then((res: any) => {
        setFavouritesList(res);
      })
      .catch(error => {
        console.log(error);
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
              <ProductItemComponent item={item} styles={{marginLeft: 16}} />
            )}
          />
        </>
      ) : (
        <SectionComponent>
          <TextComponent
            flex={0}
            color={appColors.text2}
            text="Opps.. You don't have any shopping history. Start you first shopping trip now!"
          />
        </SectionComponent>
      )}
    </Container>
  );
};

export default MyFavourites;
