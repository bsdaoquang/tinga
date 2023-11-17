import {AddSquare, MinusSquare} from 'iconsax-react-native';
import React, {useState} from 'react';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
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
import {global} from '../../styles/global';

const RecipesScreen = ({navigation}: any) => {
  const [isVisibleModalFilter, setIsVisibleModalFilter] = useState(false);
  const [mealOccasion, setMealOccasion] = useState('dinner');
  const [recipeTime, setRecipeTime] = useState(0);
  const [numberOfServings, setNumberOfServings] = useState(1);

  const mealOccasions = [
    {key: 'breakfast', title: 'Breakfase', isReady: false},
    {key: 'lunch', title: 'Lunch', isReady: false},
    {key: 'dinner', title: 'Dinner', isReady: true},
  ];

  const recipeTimes = [
    {key: 0, title: '<35 min'},
    {
      key: 1,
      title: '35min +',
    },
  ];
  return (
    <ImageBackground
      source={require('../../assets/images/bg-recipescren.png')}
      imageStyle={{
        flex: 1,
      }}
      style={{flex: 1}}>
      <StatusBar translucent barStyle="dark-content" />
      <View style={{flex: 1, paddingTop: 32}}>
        <SectionComponent>
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
        </SectionComponent>

        <SectionComponent
          styles={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: 100,
            paddingHorizontal: 0,
          }}>
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
            {recipeTimes.map(item => (
              <TouchableOpacity
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

          <TouchableOpacity
            onPress={() => navigation.navigate('RegenerateRecipes')}
            style={[
              global.shadow,
              global.rowCenter,
              global.button,
              {
                backgroundColor: appColors.success1,
                marginTop: 20,
                width: '80%',
                paddingVertical: 15,
              },
            ]}>
            <RecipesGenerate />
            <SpaceComponent width={8} />
            <TitleComponent height={14} text="Generate Recipes" flex={0} />
          </TouchableOpacity>
        </SectionComponent>
      </View>

      <ModalizeFilter
        visible={isVisibleModalFilter}
        onClose={() => setIsVisibleModalFilter(false)}
      />
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
