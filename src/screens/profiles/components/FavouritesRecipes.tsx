import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView} from 'react-native';
import RecipeItemComponent from '../../../components/RecipeItemComponent';
import {recipesData} from '../../../demoData/recipes';
import {
  LoadingComponent,
  RowComponent,
  SectionComponent,
  TitleComponent,
} from '../../../components';
import {fontFamilys} from '../../../constants/fontFamily';
import {appColors} from '../../../constants/appColors';
import handleMealApi from '../../../apis/mealplannerAPI';
import {CloudFog} from 'iconsax-react-native';
import {Recipe} from '../../../Models/Recipe';

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
      <SectionComponent
        styles={{
          marginHorizontal: 16,
          paddingHorizontal: 0,
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
        <RecipeItemComponent item={favouritesList[0]} />
      </SectionComponent>

      {favouritesList.length > 0 ? (
        <RowComponent justify="space-evenly">
          {favouritesList.map((item, index) => (
            <RecipeItemComponent item={item} key={`item${item.id}${index}`} />
          ))}
        </RowComponent>
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
