import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  ChangePassword,
  ChooseAllergy,
  ChooseDiet,
  ChooseDislike,
  ChooseStore,
  HomeLoginScreen,
  LoginScreen,
  ResetPassword,
  SignUpScreen,
  VerifyEmail,
  WebviewScreen,
  Welcome,
} from '../screens';

const WelcomeNavigator = () => {
  const WelcomeStack = createNativeStackNavigator();
  return (
    <WelcomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <WelcomeStack.Screen name="WelcomeScreen" component={Welcome} />
      {/* <WelcomeStack.Screen name="WelcomeScreen" component={ChooseAllergy} /> */}
      <WelcomeStack.Screen name="LoginScreen" component={LoginScreen} />
      <WelcomeStack.Screen name="ResetPassword" component={ResetPassword} />
      <WelcomeStack.Screen name="HomeLoginScreen" component={HomeLoginScreen} />
      <WelcomeStack.Screen name="SignUpScreen" component={SignUpScreen} />
      <WelcomeStack.Screen name="VerifyEmail" component={VerifyEmail} />
      <WelcomeStack.Screen name="ChooseAllergy" component={ChooseAllergy} />
      <WelcomeStack.Screen name="ChooseDislike" component={ChooseDislike} />
      <WelcomeStack.Screen name="ChooseDiet" component={ChooseDiet} />
      <WelcomeStack.Screen name="ChooseStore" component={ChooseStore} />
      <WelcomeStack.Screen name="WebviewScreen" component={WebviewScreen} />
      <WelcomeStack.Screen name="ChangePassword" component={ChangePassword} />
    </WelcomeStack.Navigator>
  );
};

export default WelcomeNavigator;
