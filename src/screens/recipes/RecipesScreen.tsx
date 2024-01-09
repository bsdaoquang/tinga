import {AddSquare, MinusSquare} from 'iconsax-react-native';
import LottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useSelector} from 'react-redux';
import handleMealApi from '../../apis/mealplannerAPI';
import {RecipesGenerate} from '../../assets/svg';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {fontFamilys} from '../../constants/fontFamily';
import ModalizeFilter from '../../modals/ModalizeFilter';
import {authSelector} from '../../redux/reducers/authReducer';
import {global} from '../../styles/global';
import {Quote} from '../../Models/Recipe';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import ModalWatingGenerateRecipe from '../../modals/ModalWatingGenerateRecipe';

const RecipesScreen = ({navigation}: any) => {
  const [isVisibleModalFilter, setIsVisibleModalFilter] = useState(false);
  const [mealOccasion, setMealOccasion] = useState('Dinner');
  const [recipeTime, setRecipeTime] = useState(0);
  const [numberOfServings, setNumberOfServings] = useState(1);
  const [generating, setGenerating] = useState(false);
  const auth = useSelector(authSelector);

  const mealOccasions = [
    {key: 'Breakfast', title: 'Breakfast', isReady: false},
    {key: 'Lunch', title: 'Lunch', isReady: false},
    {key: 'Dinner', title: 'Dinner', isReady: true},
  ];

  const recipeTimes = [
    {key: 0, title: '<35 min'},
    {
      key: 1,
      title: '35min +',
    },
  ];

  const handleGenerating = async () => {
    const api = `generateRecipe`;
    setGenerating(true);

    const data = {
      type: mealOccasion,
      preparationtime: recipeTime,
      numofservings: numberOfServings,
    };

    try {
      const res: any = await handleMealApi.handleMealPlanner(api, data, 'post');
      if (res && res.length > 0) {
        navigation.navigate('RegenerateRecipes', {recipe: res[0], data});
      }
      setGenerating(false);
    } catch (error) {
      console.log(`Can not generater recipe`);
      setGenerating(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg-recipes.png')}
      imageStyle={{
        flex: 1,
      }}
      style={{flex: 1}}>
      <StatusBar translucent barStyle="dark-content" />
      <View style={{flex: 1, paddingTop: 32}}>
        <SectionComponent styles={{flex: 1, justifyContent: 'center'}}>
          <>
            <RowComponent justify="flex-end">
              <ButtonComponent
                styles={{
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  borderRadius: 8,
                }}
                fontStyles={{
                  fontFamily: fontFamilys.medium,
                  lineHeight: 20,
                  fontSize: 12,
                }}
                color={appColors.white}
                text="More filters"
                onPress={() => setIsVisibleModalFilter(true)}
              />
            </RowComponent>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Image
                source={require('../../assets/images/recipe-logo.png')}
                style={{width: 60, height: 33}}
              />
              <TitleComponent
                text={`Recipe\nGenerator`}
                styles={{textAlign: 'center'}}
                size={42}
                height={44}
                color="#32645B"
                flex={0}
              />
            </View>
          </>
        </SectionComponent>

        <SectionComponent
          styles={{
            flex: 2,
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: 100,
            paddingHorizontal: 0,
          }}>
          <>
            <TitleComponent
              text="What should I cook?"
              size={24}
              flex={0}
              color={appColors.white}
            />
            <TextComponent
              text="Select meal occasion/s"
              size={16}
              flex={0}
              color={appColors.white}
              height={24}
            />
            <RowComponent styles={{marginTop: 14}}>
              {mealOccasions.map(item => (
                <TouchableOpacity
                  disabled={!item.isReady}
                  key={item.key}
                  style={[
                    global.button,
                    styles.button,
                    {
                      borderColor:
                        item.key === mealOccasion
                          ? appColors.success1
                          : appColors.white,
                    },
                  ]}>
                  <TitleComponent
                    text={item.title}
                    flex={0}
                    size={16}
                    color={item.isReady ? appColors.text : appColors.gray}
                    font={item.isReady ? fontFamilys.bold : fontFamilys.medium}
                  />
                  {!item.isReady && (
                    <TextComponent
                      text="[Coming soon]"
                      size={12}
                      flex={0}
                      color={appColors.gray}
                      height={16}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </RowComponent>

            <RowComponent styles={{marginTop: 20, marginBottom: 10}}>
              <TextComponent
                font={fontFamilys.medium}
                size={16}
                text="Recipe Time"
                flex={0}
                color={appColors.white}
              />
            </RowComponent>

            <RowComponent>
              {recipeTimes.map((item, index) => (
                <TouchableOpacity
                  disabled={index === 1}
                  onPress={() => setRecipeTime(item.key)}
                  key={item.key}
                  style={[
                    global.button,
                    styles.button,

                    {
                      height: 40,
                      width: 88,
                      borderColor:
                        item.key === recipeTime
                          ? appColors.success1
                          : appColors.white,
                    },
                  ]}>
                  <TitleComponent
                    text={item.title}
                    flex={0}
                    size={16}
                    color={
                      item.key === recipeTime ? appColors.text : appColors.gray
                    }
                    font={
                      item.key === recipeTime
                        ? fontFamilys.bold
                        : fontFamilys.medium
                    }
                  />
                </TouchableOpacity>
              ))}
            </RowComponent>
            <RowComponent styles={{marginTop: 20, marginBottom: 10}}>
              <TextComponent
                font={fontFamilys.medium}
                size={16}
                text="Number of servings"
                flex={0}
                color={appColors.white}
              />
            </RowComponent>
            <RowComponent>
              <TouchableOpacity
                disabled={numberOfServings === 1}
                onPress={() => setNumberOfServings(numberOfServings - 1)}>
                <MinusSquare
                  scale={24}
                  color={
                    numberOfServings === 1 ? appColors.gray : appColors.white
                  }
                />
              </TouchableOpacity>
              <TitleComponent
                text={numberOfServings.toString()}
                size={22}
                styles={{marginHorizontal: 18}}
                color={appColors.white}
                flex={0}
              />
              <TouchableOpacity
                onPress={() => setNumberOfServings(numberOfServings + 1)}>
                <AddSquare scale={24} color={appColors.white} />
              </TouchableOpacity>
            </RowComponent>
          </>

          <View style={{width: '80%', marginTop: 20}}>
            <TouchableOpacity
              disabled={generating}
              onPress={handleGenerating}
              style={[
                global.rowCenter,
                {
                  backgroundColor: appColors.success1,
                  borderRadius: 12,
                  paddingVertical: generating ? 0 : 15,
                },
              ]}>
              <RecipesGenerate />

              <SpaceComponent width={8} />
              <TitleComponent height={14} text="Generate Recipes" flex={0} />
            </TouchableOpacity>
            {auth.is_premium === 0 && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  flex: 0,
                  backgroundColor: `rgba(0,0,0,0.4)`,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 8,
                  flexDirection: 'row',
                  paddingHorizontal: 12,
                }}>
                <View
                  style={{
                    width: 28,
                    height: 28,
                    backgroundColor: appColors.white,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Fontisto name="locked" size={14} color={appColors.primary} />
                </View>
                <View style={{paddingLeft: 10}}>
                  <TextComponent
                    text="Upgrade to Premium "
                    font={fontFamilys.bold}
                    size={20}
                    color={appColors.white}
                    styles={{textDecorationLine: 'underline'}}
                    flex={0}
                  />
                  <TitleComponent
                    text="for recipe generator"
                    font={fontFamilys.bold}
                    color={appColors.white}
                    flex={0}
                    size={20}
                  />
                </View>
              </View>
            )}
          </View>
        </SectionComponent>
      </View>

      <ModalizeFilter
        visible={isVisibleModalFilter}
        onClose={() => setIsVisibleModalFilter(false)}
      />

      <ModalWatingGenerateRecipe visible={generating} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: appColors.white,
    borderWidth: 2,
    borderColor: appColors.success1,
    marginHorizontal: 6,
    height: 56,
    width: 100,
    paddingHorizontal: 0,
  },
});

export default RecipesScreen;
