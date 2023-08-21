import {View, Text} from 'react-native';
import React from 'react';
import {Container} from '../../components';
import {global} from '../../styles/global';

const ProfileScreen = () => {
  return (
    <Container>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            ...global.shadow,
            margin: 10,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 8,

              backgroundColor: 'coral',
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 12,
            shadowColor: 'rgba(0,0,0,0.5)',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.15,
            shadowRadius: 6.27,
            elevation: 6,
          }}>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 8,
            }}
          />
        </View>
      </View>
    </Container>
  );
};

export default ProfileScreen;
