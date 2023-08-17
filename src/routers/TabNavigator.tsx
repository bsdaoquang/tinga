import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Element3,
  SearchNormal1,
  ShoppingCart,
  User,
} from 'iconsax-react-native';
import React from 'react';
import {Text} from 'react-native';
import {appColors} from '../constants/appColors';
import {fontFamilys} from '../constants/fontFamily';
import ExploreNavigator from './ExploreNavigator';
import GroceryNavigator from './GroceryNavigator';
import HomeNavigator from './HomeNavigator';
import ProfileNavigator from './ProfileNavigator';

const TabNavigator = () => {
  const Tabs = createBottomTabNavigator();

  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          elevation: 6,
          borderTopWidth: 0,
          paddingTop: 8,
          height: 64,
          backgroundColor: appColors.white,
        },

        tabBarLabel({focused}) {
          return (
            <Text
              style={{
                fontSize: 12,
                fontFamily: fontFamilys.medium,
                marginBottom: 8,
                color: focused ? appColors.primary : appColors.gray,
              }}>
              {route.name}
            </Text>
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
