import {Heart} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RecipesGenerate} from '../../assets/svg';
import {
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TitleComponent,
} from '../../components';
import RecipeItemComponent from '../../components/RecipeItemComponent';
import {appColors} from '../../constants/appColors';
import {fontFamilys} from '../../constants/fontFamily';
import {recipesData} from '../../demoData/recipes';
import ModalizeRecipeDetail from '../../modals/ModalizeRecipeDetail';
import {global} from '../../styles/global';
import {Recipe} from '../../Models/Recipe';
import handleMealApi from '../../apis/mealplannerAPI';
import {LoadingModal} from '../../modals';

const RegenerateRecipes = () => {
  const [isVisibleModalRecipeDetail, setIsVisibleModalRecipeDetail] =
    useState(false);
  const [recipeItem, setRecipeItem] = useState<Recipe>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getGeneratedRecipe();
  }, []);

  const getGeneratedRecipe = async () => {
    const api = `generatedRecipe`;

    setIsLoading(true);

    try {
      const res = await handleMealApi.handleMealPlanner(api);
      console.log(res);
      setIsLoading(false);
    } catch (error) {
      console.log('Can not get recipe', error);
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg-recipe-generate.png')}
      style={{flex: 1}}
      imageStyle={{flex: 1}}>
      <SectionComponent styles={{marginTop: 48}}>
        <RowComponent>
          <TouchableOpacity>
            <AntDesign name="arrowleft" size={22} color={'#41393E'} />
          </TouchableOpacity>
          <RowComponent styles={{flex: 1}}>
            <View
              style={[
                global.rowCenter,
                global.button,
                {
                  backgroundColor: appColors.white,
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                },
              ]}>
              <RecipesGenerate />
              <SpaceComponent width={10} />
              <TitleComponent height={14} text="Generate Recipes" flex={0} />
            </View>
          </RowComponent>

          <TouchableOpacity>
            <Heart size={24} color={appColors.white} />
          </TouchableOpacity>
        </RowComponent>
      </SectionComponent>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView style={{flex: 1, marginBottom: 60}}>
          <RowComponent styles={{paddingTop: 20}}>
            <TitleComponent
              flex={0}
              line={1}
              text="You should cook..."
              size={24}
              height={20}
            />
          </RowComponent>
          <RowComponent>
            <RecipeItemComponent
              onPress={() => {
                setIsVisibleModalRecipeDetail(true);
                setRecipeItem(recipesData[0]);
              }}
              item={recipesData[0]}
            />
          </RowComponent>
          <SectionComponent styles={{marginTop: 22}}>
            <TitleComponent
              text="MORE OPTIONS"
              flex={0}
              font={fontFamilys.regular}
              size={14}
            />

            <RowComponent justify="flex-start">
              {recipesData.map(
                (item, index) =>
                  index < 3 && (
                    <RecipeItemComponent
                      onPress={() => {
                        setRecipeItem(item);
                        setIsVisibleModalRecipeDetail(true);
                      }}
                      styles={{marginRight: index % 2 ? 0 : 12}}
                      key={item.key}
                      item={item}
                    />
                  ),
              )}
            </RowComponent>
          </SectionComponent>
        </ScrollView>
      )}

      <ModalizeRecipeDetail
        visible={isVisibleModalRecipeDetail}
        onClose={() => {
          setRecipeItem(undefined);
          setIsVisibleModalRecipeDetail(false);
        }}
        item={recipeItem}
      />
    </ImageBackground>
  );
};

export default RegenerateRecipes;
