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
import {FlatList, ScrollView} from 'react-native';
import {LoadingModal} from '../../modals';

const ChooseDislike = ({navigation, route}: any) => {
  const {allergy_ids} = route.params;

  const [selected, setSelected] = useState<number[]>([]);
  const [choosese, setChoosese] = useState<UserChoose[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [count, setCount] = useState(16);

  useEffect(() => {
    handleGetAllgery();
  }, []);

  const handleGetAllgery = async () => {
    const api = `/dislikeItems`;
    const data = new FormData();

    data.append('allergy_ids', allergy_ids ? `${allergy_ids}` : '[]');
    data.append('prefrence', '3');

    try {
      setIsLoading(true);
      await handleGetData.handleProduct(api, data, 'post').then((res: any) => {
        const items: any[] = [];

        for (const i in res) {
          items.push({
            id: parseInt(i),
            name: res[i],
          });
        }

        setChoosese(items);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleContinue = async () => {
    const api = `/dislikes`;

    const items: string[] = [];

    selected.forEach(id => {
      const item = choosese.find(element => element.id === id);

      item && items.push(item.name);
    });

    const data = new FormData();
    data.append('dislikes', JSON.stringify(items));

    try {
      setIsUpdating(true);
      await handleGetData
        .handleUser(api, data, 'post', true)
        .then((res: any) => {
          if (res && res.success) {
            navigation.navigate('ChooseStore');
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
          onPress={() => navigation.navigate('ChooseStore')}
        />
      }>
      <SectionComponent flex={1}>
        <TextComponent text="Dislikes" size={12} flex={0} />
        <TitleComponent
          text="Does your household have any dislikes?"
          flex={0}
          size={26}
        />
        <SpaceComponent height={20} />

        {choosese.length > 0 ? (
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <RowComponent justify="flex-start">
              {choosese.map(
                (item, index) =>
                  index <= count && (
                    <RenderChooseValue
                      key={`choose${index}`}
                      item={item}
                      onPress={() => handleSelectedItem(index)}
                      selected={selected}
                    />
                  ),
              )}
            </RowComponent>
            <RowComponent justify="flex-start" styles={{marginTop: 12}}>
              <Button
                text={count === choosese.length ? 'Less' : 'See all'}
                onPress={() =>
                  setCount(count === choosese.length ? 18 : choosese.length)
                }
              />
            </RowComponent>
          </ScrollView>
        ) : (
          <LoadingComponent isLoading={isLoading} value={choosese.length} />
        )}
      </SectionComponent>
      <SectionComponent styles={{}}>
        <ButtonComponent
          disable={selected.length === 0 || isUpdating}
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

export default ChooseDislike;
