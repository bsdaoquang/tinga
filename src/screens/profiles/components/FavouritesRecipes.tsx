import React from 'react';
import {ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Recipe} from '../../../Models/Recipe';
import {
  RowComponent,
  SectionComponent,
  TitleComponent,
} from '../../../components';
import RecipeItemComponent from '../../../components/RecipeItemComponent';
import {fontFamilys} from '../../../constants/fontFamily';
import {favouritesSelector} from '../../../redux/reducers/favouritesReducer';

const FavouritesRecipes = () => {
  const favourites: Recipe[] = useSelector(favouritesSelector);

  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <SectionComponent
        styles={{
          marginHorizontal: 16,
          paddingHorizontal: 0,
        }}>
        {favourites.filter(element => element.recent_added === 1).length >
          0 && (
          <View
            style={{
              borderBottomColor: '#e2e2e2',
              borderBottomWidth: 1,
              paddingBottom: 0,
              marginBottom: 14,
            }}>
            <TitleComponent
              text="RECENTLY ADDED"
              size={14}
              font={fontFamilys.regular}
              styles={{marginBottom: 14}}
            />
            <RowComponent justify="space-between">
              {favourites
                .filter(element => element.recent_added === 1)
                .map((item, index) => (
                  <RecipeItemComponent
                    item={item}
                    key={`item${item.id}${index}`}
                  />
                ))}
            </RowComponent>
          </View>
        )}

        <RowComponent justify="space-between">
          {favourites.map((item, index) => (
            <RecipeItemComponent item={item} key={`item${item.id}${index}`} />
          ))}
        </RowComponent>
      </SectionComponent>
    </ScrollView>
  );
};

export default FavouritesRecipes;
