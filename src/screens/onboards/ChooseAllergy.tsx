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
import RenderChooseValue from './components/RenderChooseValue';

const ChooseAllergy = ({navigation}: any) => {
  const [selected, setSelected] = useState<string[]>([]);

  const values = [
    'Eggs',
    'Milk',
    'Dairy',
    'Gluten',
    'Mustard',
    'Peanuts',
    'Tree Nuts',
    'Crustaceans',
    'Fish',
    'Sulphites',
    'Soy',
    'Sesame Seeds',
    'Wheat & Triticale',
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

  // const renderValue = (val: string) => (
  //   <TouchableOpacity
  //     onPress={() => handleSelect(val)}
  //     key={`item${val}`}
  //     style={[
  //       global.tag,
  //       global.shadow,
  //       {
  //         shadowColor: 'rgba(0, 0, 0, 0.1)',
  //         borderWidth: selected.includes(val) ? 2 : 0,
  //         borderColor: appColors.success1,
  //       },
  //     ]}>
  //     <TextComponent
  //       text={val}
  //       flex={0}
  //       color={appColors.text2}
  //       font={selected.includes(val) ? fontFamilys.bold : fontFamilys.medium}
  //     />
  //   </TouchableOpacity>
  // );
  return (
    <Container
      back
      right={<Button text="Skip" onPress={() => {}} />}
      barStyle="dark-content">
      <SectionComponent flex={1}>
        <TextComponent text="Allergens" size={12} flex={0} />
        <TitleComponent
          text="Does your household have any allergies?"
          flex={0}
          size={26}
        />
        <SpaceComponent height={20} />
        <RowComponent justify="flex-start">
          {values.map((val, index) => (
            <RenderChooseValue
              key={`allergen${index}`}
              value={val}
              onPress={() => handleSelect(val)}
              selected={selected}
            />
          ))}
        </RowComponent>
      </SectionComponent>
      <SectionComponent styles={{marginVertical: 20}}>
        <ButtonComponent
          textColor={appColors.text}
          color={appColors.success1}
          fontStyles={{textAlign: 'center'}}
          text="Continue"
          onPress={() => navigation.navigate('ChooseDiet')}
          iconRight
          icon={
            <AntDesign name="arrowright" size={20} color={appColors.text} />
          }
        />
      </SectionComponent>
    </Container>
  );
};

export default ChooseAllergy;
