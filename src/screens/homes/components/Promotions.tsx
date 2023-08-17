import {View, Text, FlatList} from 'react-native';
import React from 'react';
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
import {Gift} from 'iconsax-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Promotions = () => {
  const promotions = [
    {
      id: '1',
      title: 'Refer and Earn Rewards',
      detail: 'Get $10',
      description: 'when you share Tinga with your friends & family*',
      buttonText: 'Lear more',
      note: '*Ts & Cs apply',
      imageUrl: '',
    },
  ];

  const renderPromotionItem = (item: any) => (
    <CardContent
      color={appColors.primary}
      styles={{
        width: appSize.width - 32,
        marginRight: 16,
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
