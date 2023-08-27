import React from 'react';
import {StatusBar, StatusBarStyle} from 'react-native';
import {appColors} from '../constants/appColors';

const StatusBarComponent = ({barStyle}: {barStyle?: StatusBarStyle}) => {
  return (
    <StatusBar
      translucent
      backgroundColor="transparent"
      barStyle={barStyle ?? 'dark-content'}
    />
  );
};

export default StatusBarComponent;
