import React from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {Tip} from '../../Models/TipModel';
import {CardContent, Container, TitleComponent} from '../../components';
import LockPremiumComponent from '../../components/LockPremiumComponent';
import {appColors} from '../../constants/appColors';
import {authSelector} from '../../redux/reducers/authReducer';

const TipsScreens = ({route, navigation}: any) => {
  const {title, tips}: {title: string; tips: Tip[]} = route.params;

  const auth = useSelector(authSelector);

  return (
    <Container title={title} back>
      <FlatList
        data={tips}
        renderItem={({item}) => (
          <CardContent
            isShadow
            color={auth.is_premium === 0 ? appColors.gray3 : appColors.white}
            key={item.id}
            onPress={
              auth.is_premium === 0
                ? undefined
                : () => navigation.navigate('TipDetail', {item})
            }
            styles={{marginHorizontal: 16, marginBottom: 16}}
          >
            <LockPremiumComponent sizeIcon={12} />
            <TitleComponent text={item.title} />
          </CardContent>
        )}
      />
    </Container>
  );
};

export default TipsScreens;
