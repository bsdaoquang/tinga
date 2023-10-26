import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import profileAPI from '../apis/userAPI';
import {appInfos} from '../constants/appInfos';
import {addAuth, authSelector} from '../redux/reducers/authReducer';
import {SplashScreen} from '../screens';
import MainNavigator from './MainNavigator';
import WelcomeNavigator from './WelcomeNavigator';

const Router = () => {
  const [isWelcome, setIsWelcome] = useState(true);
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    handleCheckUserLoginAgain();
  }, []);

  const handleCheckUserLoginAgain = async () => {
    const api = `/getUserProfile`;
    const apiChoces = '/getUserChoice';

    const resLocal = await AsyncStorage.getItem(
      appInfos.localDataName.userData,
    );

    try {
      const userData = resLocal ? JSON.parse(resLocal) : {};

      await profileAPI.HandleUser(apiChoces).then(async (res: any) => {
        if (res.diets && res.diets.length > 0) {
          await profileAPI.HandleUser(api).then((res: any) => {
            if (userData && res.id) {
              dispatch(
                addAuth({
                  ...userData,
                  ...res,
                }),
              );
            } else {
              dispatch(addAuth({}));
            }

            setIsWelcome(false);
          });
        }
      });
    } catch (error) {
      console.log(error);
      setIsWelcome(false);
    }
  };

  return (
    <NavigationContainer>
      {isWelcome ? (
        <SplashScreen />
      ) : auth.access_token ? (
        <MainNavigator />
      ) : (
        <WelcomeNavigator />
      )}
    </NavigationContainer>
  );
};

export default Router;
