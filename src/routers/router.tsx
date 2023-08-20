import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addAuth, authSelector} from '../redux/reducers/authReducer';
import {SplashScreen} from '../screens';
import TabNavigator from './TabNavigator';
import WelcomeNavigator from './WelcomeNavigator';

const Router = () => {
  const [isWelcome, setIsWelcome] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(
        addAuth({
          uid: 'admin',
        }),
      );

      setIsWelcome(false);
    }, 1500);
  }, []);

  const auth = useSelector(authSelector);

  return isWelcome ? (
    <SplashScreen />
  ) : 1 > 0 ? (
    <TabNavigator />
  ) : (
    <WelcomeNavigator />
  );
};

export default Router;
