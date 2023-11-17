import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import {TabbarComponent, TextComponent} from '../../../components';
import RecipeItemComponent from '../../../components/RecipeItemComponent';
import {appColors} from '../../../constants/appColors';
import {recipesData} from '../../../demoData/recipes';
import {appInfos} from '../../../constants/appInfos';
import {appSize} from '../../../constants/appSize';
import {useNavigation} from '@react-navigation/native';

const RecipesList = () => {
  const [indexItem, setIndexItem] = useState(0);

  const navigation: any = useNavigation();

  const renderDotsView = (array: any[], position: any) => (
    <View style={{flexDirection: 'row'}}>
      {array.map((_item, i: any) => (
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

  return (
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
      {recipesData.length > 0 ? (
        <>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={recipesData}
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
                <RecipeItemComponent item={item} />
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
  );
};

export default RecipesList;
