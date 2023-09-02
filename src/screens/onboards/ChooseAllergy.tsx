import React, {useEffect, useState} from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
import {fontFamilys} from '../../constants/fontFamily';
import {global} from '../../styles/global';
import RenderChooseValue from './components/RenderChooseValue';
import {UserChoose} from '../../Models/UserChoose';
import handleGetData from '../../apis/productAPI';
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
            navigation.navigate('ChooseDiet');
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

  return (
    <Container back right={<Button text="Skip" onPress={() => {}} />}>
      <SectionComponent flex={1}>
        <TextComponent text="Allergens" size={12} flex={0} />
        <TitleComponent
          text="Does your household have any allergies?"
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
                onPress={() => setSelected([...selected, item.id])}
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
          disable={isUpdating}
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
    </Container>
  );
};

export default ChooseAllergy;
