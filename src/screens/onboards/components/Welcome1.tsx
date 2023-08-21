import React, {useState} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {
  RowComponent,
  SectionComponent,
  TextComponent,
  TitleComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {global} from '../../../styles/global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SubscriptionModal} from '../../../modals';

const space = Math.floor(Math.random() * 30);

const Welcome1 = () => {
  const [eats, setEats] = useState<string[]>([]);

  const eatingValues = [
    'Diary-Free',
    'Low Sodium',
    'Soy-Free',
    'Peanut-Free',
    'Kosher',
    'Organic',
    'Gluten-Free',
    'Vegan',
    'Plant Based',
    'Minimal Sugar (<0.5g)',
    'Whole Grain',
    'Milk-Free',
    'FOD Map Friendly ',
    'Wheat & Triticale-Free',
    'Keto',
  ];

  const handleSelectEat = (item: string) => {
    const index = eats.indexOf(item);
    const items = [...eats];

    if (index === -1) {
      items.push(item);
    } else {
      items.splice(index, 1);
    }

    setEats(items);
  };

  const renderItemEat = (item: string, index: number) => (
    <View style={global.shadow} key={`item${index}`}>
      <TouchableOpacity
        onPress={() => handleSelectEat(item)}
        style={[
          global.row,
          {
            borderRadius: 7,
            backgroundColor: eats.includes(item)
              ? appColors.white
              : `rgba(50, 100, 91, ${Math.random() + 0.7})`,
            paddingHorizontal: eats.includes(item) ? 20 : 12,
            paddingVertical: eats.includes(item) ? 10 : 4,
            marginVertical: 8,
            marginLeft: space,
            marginRight: space,
          },
        ]}>
        <TextComponent text={item} flex={0} color={appColors.text} />
        {eats.includes(item) && (
          <Ionicons
            name="checkmark-sharp"
            color={appColors.success1}
            size={20}
            style={{marginLeft: 8}}
          />
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <ScrollView style={{flex: 1}}>
        <SectionComponent flex={1}>
          <RowComponent styles={{alignItems: 'flex-start'}}>
            <TitleComponent
              text="1. "
              size={26}
              color={appColors.white}
              flex={0}
            />
            <TitleComponent
              text="Tell Tinga how you & your household eats"
              size={26}
              color={appColors.white}
              flex={1}
            />
          </RowComponent>

          <View
            style={[
              global.row,
              {
                marginTop: 32,
                flex: 1,
                zIndex: 1,
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            {eatingValues.map((item, index) => renderItemEat(item, index))}
          </View>
        </SectionComponent>
      </ScrollView>
      <Image
        source={require('../../../assets/images/WelcomeEating.png')}
        style={{
          width: 286,
          height: 348,
          resizeMode: 'contain',
          position: 'absolute',
          bottom: 0,
          right: -54,
          zIndex: -1,
        }}
      />
    </>
  );
};

export default Welcome1;
