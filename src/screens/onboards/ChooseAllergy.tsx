import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {UserChoose} from '../../Models/UserChoose';
import handleGetData from '../../apis/productAPI';
import {
  Button,
  ButtonComponent,
  Container,
  LoadingComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import RenderChooseValue from './components/RenderChooseValue';
import {LoadingModal} from '../../modals';

const ChooseAllergy = ({navigation}: any) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [choosese, setChoosese] = useState<UserChoose[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    handleGetAllgery();
  }, []);

  const handleGetAllgery = async () => {
    const api = `/allergies`;

    try {
      setIsLoading(true);
      await handleGetData.handleProduct(api).then((res: any) => {
        if (res) {
          setChoosese(res);
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleContinue = async () => {
    const api = `/allergies`;

    const data = new FormData();
    data.append('allergies', JSON.stringify(selected));

    try {
      setIsUpdating(true);
      await handleGetData
        .handleUser(api, data, 'post', true)
        .then((res: any) => {
          if (res && res.success) {
            navigation.navigate('ChooseDislike', {
              allergy_ids: selected,
            });
            setIsUpdating(false);
          } else {
            console.log('Can not update');
            setIsUpdating(false);
          }
        });
    } catch (error) {
      console.log(error);
      setIsUpdating(false);
    }

    //
  };

  const handleSelectedItem = (id: number) => {
    const items = [...selected];
    const index = selected.findIndex(element => element === id);

    if (index === -1) {
      items.push(id);
    } else {
      items.splice(index, 1);
    }

    setSelected(items);
  };

  return (
    <Container
      back
      right={
        <Button
          text="Skip"
          onPress={() =>
            navigation.navigate('ChooseDislike', {
              allergy_ids: [],
            })
          }
        />
      }>
      <SectionComponent flex={1}>
        <TextComponent text="Allergens" size={12} flex={0} />
        <TitleComponent
          text={`Does your household\nhave any allergies or\nrestrictions?`}
          flex={0}
          size={26}
        />
        <SpaceComponent height={20} />
        {choosese.length > 0 ? (
          <RowComponent justify="flex-start">
            {choosese.map((item, index) => (
              <RenderChooseValue
                key={item.id}
                item={item}
                onPress={() => handleSelectedItem(item.id)}
                selected={selected}
              />
            ))}
          </RowComponent>
        ) : (
          <LoadingComponent isLoading={isLoading} value={choosese.length} />
        )}
      </SectionComponent>
      <SectionComponent styles={{marginVertical: 20}}>
        <ButtonComponent
          // disable={selected.length === 0 || isUpdating}
          textColor={appColors.text}
          color={appColors.success1}
          fontStyles={{textAlign: 'center'}}
          text={isUpdating ? 'Updating...' : 'Continue'}
          onPress={handleContinue}
          iconRight
          icon={
            <AntDesign name="arrowright" size={20} color={appColors.text} />
          }
        />
      </SectionComponent>
      <LoadingModal visible={isUpdating} mess="Updating..." />
    </Container>
  );
};

export default ChooseAllergy;
