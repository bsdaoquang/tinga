import {View, Text, ScrollView, FlatList, Animated} from 'react-native';
import React, {useState} from 'react';
import {
  CardContent,
  SectionComponent,
  TabbarComponent,
  TitleComponent,
} from '../../../components';
import {appColors, listColors} from '../../../constants/appColors';
import {global} from '../../../styles/global';

interface Props {
  title: string;
}

const CategoriesList = ({title}: Props) => {
  const [indexItem, setIndexItem] = useState(0);

  const categories = [
    {
      id: '1',
      title: 'Tips for going Gluten-free',
    },
    {
      id: '2',
      title: 'Top 5 Celiac facts',
    },
    {
      id: '3',
      title: 'Lesser known highly processed foods',
    },
    {
      id: '4',
      title: 'Protein 101',
    },
    {
      id: '5',
      title: 'Top 5 Celiac facts',
    },
    {
      id: '6',
      title: 'Top 5 Celiac facts',
    },
    {
      id: '7',
      title: 'Top 5 Celiac facts',
    },
  ];

  const renderDotsView = (array: any[], position: any) => (
    <View style={{flexDirection: 'row'}}>
      {array.map((_item, i: any) => (
        <Animated.View
          key={i}
          style={{
            height: 6,
            width: position === i ? 24 : 6,
            backgroundColor:
              position === i ? appColors.primary : 'rgba(50, 100, 91, 0.20);',
            marginHorizontal: 4,
            borderRadius: 5,
          }}
        />
      ))}
    </View>
  );

  const renderCardItem = (item: {id: string; title: string}) => (
    <CardContent
      isShadow
      color={appColors.white}
      styles={{
        marginLeft: 16,
        marginVertical: 12,
        width: 186,
        height: 114,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0,0,0,0.5)',
      }}>
      <TitleComponent
        text={item.title}
        flex={0}
        size={20}
        color={listColors[Math.floor(Math.random() * listColors.length)]}
        styles={{
          textAlign: 'center',
        }}
      />
    </CardContent>
  );

  return (
    <View style={{marginBottom: 24}}>
      <View style={{paddingHorizontal: 16}}>
        <TabbarComponent
          styles={{marginBottom: 0}}
          title={title}
          seemore
          onPress={() => {}}
        />
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        data={categories}
        onScroll={event => {
          const index = Math.floor(event.nativeEvent.contentOffset.x / 186);
          setIndexItem(index);
        }}
        renderItem={({item}) => renderCardItem(item)}
        horizontal
      />
      <View
        style={{
          flex: 1,
          marginTop: 4,
          alignItems: 'center',
        }}>
        {renderDotsView(categories, indexItem)}
      </View>
    </View>
  );
};

export default CategoriesList;
