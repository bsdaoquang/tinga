import React from 'react';
import {FlatList, ScrollView} from 'react-native';
import RecipeItemComponent from '../../../components/RecipeItemComponent';
import {recipesData} from '../../../demoData/recipes';
import {
  RowComponent,
  SectionComponent,
  TitleComponent,
} from '../../../components';
import {fontFamilys} from '../../../constants/fontFamily';
import {appColors} from '../../../constants/appColors';

const FavouritesRecipes = () => {
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
        <RecipeItemComponent item={recipesData[1]} />
      </SectionComponent>

      {recipesData.length > 0 ? (
        <RowComponent justify="space-evenly">
          {recipesData.map((item, index) => (
            <RecipeItemComponent item={item} key={`item${item.key}${index}`} />
          ))}
          {/* <FlatList
            numColumns={2}
            contentContainerStyle={{
              justifyContent: 'space-between',
            }}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            data={recipesData}
            renderItem={({item, index}) => (
              <RecipeItemComponent
                item={item}
                key={`item${item.key}${index}`}
              />
            )}
          /> */}
        </RowComponent>
      ) : (
        <></>
        // <LoadingComponent
        //   isLoading={isLoading}
        //   value={favouritesList.length}
        //   message={`Opps.. You don't have any shopping history. Start you first shopping trip now!`}
        // />
      )}
    </ScrollView>
  );
};

export default FavouritesRecipes;
