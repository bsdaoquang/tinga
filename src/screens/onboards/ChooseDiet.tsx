import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
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

const ChooseDiet = ({navigation}: any) => {
  const [selected, setSelected] = useState<string[]>([]);

  const values = [
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
    <TouchableOpacity
      onPress={() => handleSelect(val)}
      key={`item${val}`}
      style={[
        global.tag,
        global.shadow,
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
  );
  return (
    <Container
      back
      right={
        <Button
          text="Skip"
          onPress={() => navigation.navigate('Subscription')}
        />
      }>
      <SectionComponent flex={1}>
        <TextComponent text="Lifestyle Choices" size={12} flex={0} />
        <TitleComponent
          text="Does your household have any other diet preferences? "
          flex={0}
          size={26}
        />
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
          onPress={() => navigation.navigate('ChooseStore')}
          iconRight
          icon={
            <AntDesign name="arrowright" size={20} color={appColors.text} />
          }
        />
      </SectionComponent>
    </Container>
  );
};

export default ChooseDiet;
