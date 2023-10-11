import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {
  ButtonComponent,
  Container,
  ProductItemComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {useSelector} from 'react-redux';
import {favouritesSelector} from '../../redux/reducers/favouritReducer';

const MyFavourites = ({navigation}: any) => {
  const favouritesList = useSelector(favouritesSelector);

  return (
    <Container back>
      <SectionComponent>
        <TitleComponent text="Favourites" flex={0} height={32} size={32} />
      </SectionComponent>
      {favouritesList.length > 0 ? (
        <>
          <RowComponent
            justify="flex-start"
            styles={{marginVertical: 12, paddingHorizontal: 16}}
          >
            <ButtonComponent
              text="Products"
              onPress={() => {}}
              styles={{
                paddingVertical: 9,
                paddingHorizontal: 12,
                borderRadius: 100,
              }}
            />
          </RowComponent>
          <FlatList
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
        <TextComponent text="Favourites list items not found" />
      )}
    </Container>
  );
};

export default MyFavourites;
