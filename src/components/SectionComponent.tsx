import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {global} from '../styles/global';

export const SectionComponent = ({
  children,
  styles,
}: {
  children: any;
  styles?: StyleProp<ViewStyle>;
}) => {
  return <View style={[{...global.sections}, styles]}>{children}</View>;
};
