import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {global} from '../styles/global';

export const SectionComponent = ({
  children,
  styles,
  flex,
}: {
  children: any;
  styles?: StyleProp<ViewStyle>;
  flex?: number;
}) => {
  return (
    <View style={[{...global.sections, flex: flex ?? 0}, styles]}>
      {children}
    </View>
  );
};
