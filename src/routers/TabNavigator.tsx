import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Element3,
  SearchNormal1,
  ShoppingCart,
  User,
} from 'iconsax-react-native';
import React from 'react';
import {Platform} from 'react-native';
import {TextComponent} from '../components';
import {appColors} from '../constants/appColors';
import ExploreNavigator from './ExploreNavigator';
import GroceryNavigator from './GroceryNavigator';
import HomeNavigator from './HomeNavigator';
import ProfileNavigator from './ProfileNavigator';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
          } else if (route.name === 'Grocery List') {
            icon = (
              <AntDesign name="shoppingcart" size={size + 2} color={color} />
            );
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
      <Tabs.Screen name="Explore" component={ExploreNavigator} />
      <Tabs.Screen name="Grocery List" component={GroceryNavigator} />
      <Tabs.Screen name="Profile" component={ProfileNavigator} />
    </Tabs.Navigator>
  );
};

export default TabNavigator;
