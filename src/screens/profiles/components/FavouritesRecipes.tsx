import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Recipe} from '../../../Models/Recipe';
import handleMealApi from '../../../apis/mealplannerAPI';
import {
  LoadingComponent,
  RowComponent,
  SectionComponent,
  TitleComponent,
} from '../../../components';
import RecipeItemComponent from '../../../components/RecipeItemComponent';
import {fontFamilys} from '../../../constants/fontFamily';

const FavouritesRecipes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [favouritesList, setFavouritesList] = useState<Recipe[]>([]);

  useEffect(() => {
    getFavouritesRecipe();
  }, []);

  const getFavouritesRecipe = async () => {
    const api = `listofFavouriteRecipe`;

    setIsLoading(true);
    try {
      const res: any = await handleMealApi.handleMealPlanner(api);

      if (res && res.length > 0) {
        setFavouritesList(res);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      {favouritesList.length > 0 ? (
        <SectionComponent
          styles={{
            marginHorizontal: 16,
            paddingHorizontal: 0,
          }}>
          {favouritesList.filter(element => element.recent_added === 1).length >
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
                {favouritesList
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
            {favouritesList
              .filter(element => element.recent_added === 0)
              .map((item, index) => (
                <RecipeItemComponent
                  item={item}
                  key={`item${item.id}${index}`}
                  onReload={getFavouritesRecipe}
                />
              ))}
          </RowComponent>
        </SectionComponent>
      ) : (
        <LoadingComponent
          isLoading={isLoading}
          value={favouritesList.length}
          message={`Opps.. You don't have any shopping history. Start you first shopping trip now!`}
        />
      )}
    </ScrollView>
  );
};

export default FavouritesRecipes;
