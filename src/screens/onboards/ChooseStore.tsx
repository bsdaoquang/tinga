import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Button,
  ButtonComponent,
  Container,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {fontFamilys} from '../../constants/fontFamily';
import {global} from '../../styles/global';
import {SubscriptionModal} from '../../modals';

const ChooseStore = ({navigation}: any) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [isVisibleModalSubcribe, setIsVisibleModalSubcribe] = useState(false);

  const values = [
    'Metro',
    'Loblaws',
    'Fortino’s',
    'No Frills',
    'Real Canadian Super Store',
    'Your Independent Grocer',
    'Zehrs',
    'WalMart',
    'Voila',
    'Longos',
  ];

  const handleSelect = (item: string) => {
    const index = selected.indexOf(item);
    const items = [...selected];

    if (index === -1) {
      items.push(item);
    } else {
      items.splice(index, 1);
    }

    setSelected(items);
  };

  const renderValue = (val: string) => (
    <View style={global.shadow} key={`item${val}`}>
      <TouchableOpacity
        onPress={() => handleSelect(val)}
        style={[
          global.tag,

          {
            shadowColor: 'rgba(0, 0, 0, 0.04)',
            borderWidth: selected.includes(val) ? 2 : 0,
            borderColor: appColors.success1,
          },
        ]}>
        <TextComponent
          text={val}
          flex={0}
          color={appColors.text2}
          font={selected.includes(val) ? fontFamilys.bold : fontFamilys.medium}
        />
      </TouchableOpacity>
    </View>
  );
  return (
    <Container back right={<Button text="Skip" onPress={() => {}} />}>
      <SectionComponent flex={1}>
        <TextComponent text="Grocery Stores" size={12} flex={0} />
        <TitleComponent text="Where do you usually shop?" flex={0} size={26} />
        <SpaceComponent height={20} />
        <RowComponent justify="flex-start">
          {values.map(val => renderValue(val))}
        </RowComponent>
      </SectionComponent>
      <SectionComponent styles={{marginVertical: 20}}>
        <ButtonComponent
          textColor={appColors.text}
          color={appColors.success1}
          fontStyles={{textAlign: 'center'}}
          text="Continue"
          onPress={() => setIsVisibleModalSubcribe(true)}
          iconRight
          icon={
            <AntDesign name="arrowright" size={20} color={appColors.text} />
          }
        />
      </SectionComponent>
      <SubscriptionModal
        isVisible={isVisibleModalSubcribe}
        onClose={() => setIsVisibleModalSubcribe(false)}
      />
    </Container>
  );
};

export default ChooseStore;
