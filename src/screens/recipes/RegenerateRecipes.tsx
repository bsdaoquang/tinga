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
import {Recipe} from '../../Models/Recipe';
import handleMealApi from '../../apis/mealplannerAPI';
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
import {global} from '../../styles/global';
import ModalWatingGenerateRecipe from '../../modals/ModalWatingGenerateRecipe';

const RegenerateRecipes = ({navigation, route}: any) => {
  const {recipe, data}: {recipe: Recipe; data: any} = route.params;

  const [generating, setGenerating] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getGeneratedRecipe();
  }, []);

  const handleGenerating = async () => {
    const api = `regenerateRecipe`;
    setGenerating(true);
    try {
      const res: any = await handleMealApi.handleMealPlanner(api, data, 'post');
      if (res && res.length > 0) {
        getGeneratedRecipe();
      }
      setGenerating(false);
    } catch (error) {
      console.log(`Can not generater recipe`);
      setGenerating(false);
    }
  };

  const getGeneratedRecipe = async () => {
    const api = `generatedRecipe`;

    setIsLoading(true);

    try {
      const res: any = await handleMealApi.handleMealPlanner(api);

      res && res.length > 0 && setRecipes(res);
      setIsLoading(false);
    } catch (error) {
      console.log('Can not get recipe', error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <ImageBackground
        source={require('../../assets/images/bg-recipe-generate.png')}
        style={{flex: 1}}
        imageStyle={{flex: 1}}>
        <SectionComponent styles={{marginTop: 48}}>
          <RowComponent>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={22} color={'#41393E'} />
            </TouchableOpacity>
            <RowComponent styles={{flex: 1}} onPress={handleGenerating}>
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
                <TitleComponent
                  height={14}
                  text="Regenerate Recipes"
                  flex={0}
                />
              </View>
            </RowComponent>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MyFavourites', {tab: 'recipes'})
              }>
              <Heart size={24} color={appColors.white} />
            </TouchableOpacity>
          </RowComponent>
        </SectionComponent>
        {isLoading ? (
          <ActivityIndicator />
        ) : recipes.length > 0 ? (
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
              <RecipeItemComponent item={recipes[0]} />
            </RowComponent>
            <SectionComponent styles={{marginTop: 22}}>
              <TitleComponent
                text="MORE OPTIONS"
                flex={0}
                font={fontFamilys.regular}
                size={14}
              />

              <RowComponent justify="flex-start">
                {recipes.map(
                  (item, index) =>
                    index > 0 && (
                      <RecipeItemComponent
                        styles={{marginRight: index % 2 === 0 ? 0 : 12}}
                        key={item.id}
                        item={item}
                        onReload={getGeneratedRecipe}
                      />
                    ),
                )}
              </RowComponent>
            </SectionComponent>
          </ScrollView>
        ) : (
          <SectionComponent>
            <TitleComponent text="Data not found" />
          </SectionComponent>
        )}
      </ImageBackground>
      <ModalWatingGenerateRecipe visible={generating} />
    </>
  );
};

export default RegenerateRecipes;
