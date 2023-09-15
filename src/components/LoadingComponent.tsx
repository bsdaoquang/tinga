import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {appColors} from '../constants/appColors';
import TextComponent from './TextComponent';

interface Props {
  isLoading: boolean;
  value: number;
  message?: string;
}

export const LoadingComponent = (props: Props) => {
  const {isLoading, value, message} = props;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}>
      {isLoading ? (
        <ActivityIndicator size={20} color={appColors.gray} />
      ) : (
        value === 0 && (
          <>
            <Feather name="inbox" size={32} color={appColors.gray} />
            <TextComponent
              text={message ?? 'Data not found'}
              styles={{
                marginTop: 8,
                color: appColors.text2,

                textAlign: 'center',
              }}
              size={12}
            />
          </>
        )
      )}
    </View>
  );
};
