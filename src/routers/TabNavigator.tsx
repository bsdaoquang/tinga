import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Element3, SearchNormal1, User} from 'iconsax-react-native';
import React from 'react';
import {Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Union, UnionSelected} from '../assets/svg';
import {TextComponent} from '../components';
import {appColors} from '../constants/appColors';
import ExploreNavigator from './ExploreNavigator';
import GroceryNavigator from './GroceryNavigator';
import HomeNavigator from './HomeNavigator';
import RecipeNavigator from './RecipeNavigator';

const TabNavigator = () => {
  const Tabs = createBottomTabNavigator();

  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle:
          Platform.OS === 'android'
            ? {
                paddingTop: 6,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                height: 67,
                zIndex: 1,
                position: 'absolute',
                overflow: 'hidden',
                borderWidth: 0.2,
              }
            : {
                paddingTop: 6,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                zIndex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: 82,
              },

        tabBarLabel({focused}) {
          return (
            <TextComponent
              text={route.name}
              // styles={{marginTop: 4}}
              size={12}
              color={focused ? appColors.primary : appColors.gray}
              // flex={0}
            />
          );
        },
        tabBarIcon: ({focused, size, color}) => {
          let icon;
          size = 22;
          color = focused ? appColors.primary : appColors.gray;
          if (route.name === 'Home') {
            icon = (
              <Element3
                size={size}
                color={color}
                variant={focused ? 'Bold' : 'Outline'}
              />
            );
          } else if (route.name === 'Explore') {
            icon = <SearchNormal1 size={size} color={color} />;
          } else if (route.name === 'Grocery List') {
            icon = <Ionicons name="list-sharp" size={size + 2} color={color} />;
          } else if (route.name === 'Recipes') {
            icon = focused ? <UnionSelected /> : <Union />;
          } else {
            icon = (
              <User
                size={size}
                color={color}
                variant={focused ? 'Bold' : 'Outline'}
              />
            );
          }
          return icon;
        },
      })}>
      <Tabs.Screen name="Home" component={HomeNavigator} />
      <Tabs.Screen name="Recipes" component={RecipeNavigator} />
      <Tabs.Screen
        name="Explore"
        component={ExploreNavigator}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            // console.log(e);
            navigation.navigate('ExploreScreen');
          },
        })}
      />
      <Tabs.Screen name="Grocery List" component={GroceryNavigator} />
      {/* <Tabs.Screen name="Profile" component={ProfileNavigator} /> */}
    </Tabs.Navigator>
  );
};

export default TabNavigator;
