import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Element3,
  SearchNormal1,
  ShoppingCart,
  User,
} from 'iconsax-react-native';
import React from 'react';
import {Platform, Text} from 'react-native';
import {appColors} from '../constants/appColors';
import {fontFamilys} from '../constants/fontFamily';
import ExploreNavigator from './ExploreNavigator';
import GroceryNavigator from './GroceryNavigator';
import HomeNavigator from './HomeNavigator';
import ProfileNavigator from './ProfileNavigator';
import {TextComponent} from '../components';

const TabNavigator = () => {
  const Tabs = createBottomTabNavigator();

  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle:
          Platform.OS === 'android'
            ? {
                paddingTop: 6,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                height: 67,
              }
            : {
                paddingTop: 6,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              },

        tabBarLabel({focused}) {
          return (
            <TextComponent
              text={route.name}
              size={12}
              color={focused ? appColors.primary : appColors.gray}
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
          } else if (route.name === 'Grocery') {
            icon = <ShoppingCart size={size} color={color} />;
          } else {
            icon = <User size={size} color={color} />;
          }
          return icon;
        },
      })}>
      <Tabs.Screen name="Home" component={HomeNavigator} />
      <Tabs.Screen name="Explore" component={ExploreNavigator} />
      <Tabs.Screen name="Grocery" component={GroceryNavigator} />
      <Tabs.Screen name="Profile" component={ProfileNavigator} />
    </Tabs.Navigator>
  );
};

export default TabNavigator;
