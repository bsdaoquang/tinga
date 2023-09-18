import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {Tip} from '../../Models/TipModel';
import {
  CardContent,
  Container,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {useNavigation} from '@react-navigation/native';

const TipsScreens = ({route, navigation}: any) => {
  const {title, tips}: {title: string; tips: Tip[]} = route.params;

  return (
    <Container title={title} back>
      <FlatList
        data={tips}
        renderItem={({item}) => (
          <CardContent
            isShadow
            color={appColors.white}
            key={item.id}
            onPress={() => navigation.navigate('TipDetail', {item})}
            styles={{marginHorizontal: 16, marginBottom: 16}}>
            <TitleComponent text={item.title} />
          </CardContent>
        )}
      />
    </Container>
  );
};

export default TipsScreens;
