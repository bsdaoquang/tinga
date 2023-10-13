import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  ButtonComponent,
  CardContent,
  RowComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {appSize} from '../../../constants/appSize';

const Promotions = () => {
  const navigation: any = useNavigation();

  const promotions = [
    {
      id: '1',
      title: 'Refer and Earn Rewards',
      detail: 'Get $10',
      description: `when you share Tinga with your\nfriends & family*`,
      buttonText: 'Lear more',
      note: '*Ts & Cs apply',
      imageUrl: '',
    },
  ];

  const renderPromotionItem = (item: any) => (
    <CardContent
      // onPress={() => navigation.navigate('ReferralScreen')}
      color={appColors.primary}
      styles={{
        width: appSize.width - 32,
        marginRight: 16,
        zIndex: 1,
      }}>
      <TextComponent text={item.title} color={'#FFFFFFBF'} />
      <RowComponent>
        <Ionicons name="gift-sharp" color={appColors.white} size={32} />
        <SpaceComponent width={8} />
        <TitleComponent text={item.detail} color={appColors.white} size={32} />
      </RowComponent>
      <TextComponent text={item.description} color={appColors.white} flex={0} />

      <ButtonComponent
        width={160}
        text={item.buttonText}
        onPress={() => {}}
        color={appColors.white}
        textColor={appColors.text}
        styles={{marginVertical: 8}}
        fontStyles={{textTransform: 'uppercase'}}
      />
      <TextComponent text={item.note} color={appColors.white} />
      <Image
        source={require('../../../assets/images/Logo.png')}
        style={{
          width: 150,
          zIndex: 0,
          height: 150,
          resizeMode: 'contain',
          position: 'absolute',
          right: 0,
          bottom: -2,
          borderRadius: 12,
        }}
      />
    </CardContent>
  );

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={promotions}
      renderItem={({item}) => renderPromotionItem(item)}
    />
  );
};

export default Promotions;
