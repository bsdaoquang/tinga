import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {TabbarComponent, TextComponent} from '../../../components';
import RecipeItemComponent from '../../../components/RecipeItemComponent';
import {appColors} from '../../../constants/appColors';
import {appSize} from '../../../constants/appSize';
import {recipesData} from '../../../demoData/recipes';
import handleMealApi from '../../../apis/mealplannerAPI';
import {Recipe} from '../../../Models/Recipe';

const RecipesList = () => {
  const [indexItem, setIndexItem] = useState(0);
  const [favouritedRecipes, setFavouritedRecipes] = useState<Recipe[]>([]);
  const navigation: any = useNavigation();

  useEffect(() => {
    getFavouritedRecipes();
  }, []);

  const getFavouritedRecipes = async () => {
    const api = `listofFavouriteRecipe`;
    try {
      const res: any = await handleMealApi.handleMealPlanner(api);
      setFavouritedRecipes(res);
    } catch (error) {
      console.log(`can not get list of favourited reciptes: ${error}`);
    }
  };

  const renderDotsView = (array: any[], position: any) => (
    <View style={{flexDirection: 'row'}}>
      {favouritedRecipes.length > 1 &&
        favouritedRecipes.map((_item, i: any) => (
          <View
            key={i}
            style={{
              height: 6,
              width: position === i ? 24 : 6,
              backgroundColor:
                position === i ? appColors.primary : 'rgba(50, 100, 91, 0.20);',
              marginHorizontal: 4,
              borderRadius: 5,
            }}
          />
        ))}
    </View>
  );

  return favouritedRecipes.length > 0 ? (
    <View style={{marginBottom: 24}}>
      <View style={{paddingHorizontal: 16, marginBottom: 6}}>
        <TabbarComponent
          styles={{marginBottom: 0}}
          title={'Recipes for you'}
          seemore
          onPress={() =>
            navigation.navigate('Recipes', {
              screen: 'recipeScreen',
            })
          }
          textMore="More Recipes"
        />
      </View>
      {favouritedRecipes.length > 0 ? (
        <>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={favouritedRecipes}
            onScroll={event => {
              const index = Math.floor(
                event.nativeEvent.contentOffset.x /
                  ((appSize.width - (32 + 12)) / 2),
              );
              setIndexItem(index);
            }}
            style={{paddingHorizontal: 8}}
            renderItem={({item}) => (
              <View style={{padding: 8}}>
                <RecipeItemComponent
                  item={item}
                  onReload={getFavouritedRecipes}
                />
              </View>
            )}
            horizontal
          />
          <View
            style={{
              flex: 1,
              marginTop: 4,
              alignItems: 'center',
            }}>
            {renderDotsView(recipesData, indexItem)}
          </View>
        </>
      ) : (
        <TextComponent
          text={`recipes not found`}
          flex={0}
          styles={{textAlign: 'center', marginTop: 8}}
        />
      )}
    </View>
  ) : (
    <></>
  );
};

export default RecipesList;
