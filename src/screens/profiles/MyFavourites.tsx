import React, {useState} from 'react';
import {
  ButtonComponent,
  Container,
  RowComponent,
  SectionComponent,
  TitleComponent,
} from '../../components';
import FavouritesProducts from './components/FavouritesProducts';
import {global} from '../../styles/global';
import {appColors} from '../../constants/appColors';
import FavouritesRecipes from './components/FavouritesRecipes';

const MyFavourites = ({navigation}: any) => {
  const [tabSelectd, setTabSelectd] = useState('products');

  const tabFavourites = [
    {
      title: 'Products',
      key: 'products',
    },
    {
      title: 'Recipes',
      key: 'recipes',
    },
  ];

  return (
    <Container back paddingBottom={0}>
      <SectionComponent>
        <TitleComponent text="Favourites" flex={0} height={32} size={32} />
      </SectionComponent>
      <SectionComponent>
        <RowComponent justify="flex-start">
          {tabFavourites.map(item => (
            <ButtonComponent
              styles={[
                global.button,
                {
                  borderRadius: 100,
                  marginRight: 12,
                  paddingVertical: 9,
                  paddingHorizontal: 12,
                  backgroundColor:
                    item.key === tabSelectd
                      ? appColors.success1
                      : appColors.white,
                },
              ]}
              textColor={
                item.key === tabSelectd ? appColors.text : appColors.gray
              }
              text={item.title}
              key={item.key}
              onPress={() => setTabSelectd(item.key)}
            />
          ))}
        </RowComponent>
      </SectionComponent>
      {tabSelectd === 'products' ? (
        <FavouritesProducts />
      ) : (
        <FavouritesRecipes />
      )}
    </Container>
  );
};

export default MyFavourites;
