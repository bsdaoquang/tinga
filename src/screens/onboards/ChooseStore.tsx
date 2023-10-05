import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
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
import {handleSaveUser} from '../../utils/handleSaveUser';
import RenderChooseValue from './components/RenderChooseValue';
import {SubscriptionModal} from '../../modals';

const ChooseStore = ({navigation}: any) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [choosese, setChoosese] = useState<UserChoose[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isVisibleModalSubcribe, setIsVisibleModalSubcribe] = useState(false);
  const [isWellCome, setIsWellCome] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  const handleGetAllProducts = async () => {
    const api = `/shops`;

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
    const api = `/shops`;

    const data = new FormData();
    data.append('shop', JSON.stringify(selected));

    try {
      setIsUpdating(true);
      await handleGetData
        .handleUser(api, data, 'post', true)
        .then((res: any) => {
          if (res && res.success) {
            setIsWellCome(true);
            setIsVisibleModalSubcribe(true);
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
        <Button text="Skip" onPress={() => setIsVisibleModalSubcribe(true)} />
      }>
      <SectionComponent flex={1}>
        <TextComponent text="Grocery Stores" size={12} flex={0} />
        <TitleComponent text="Where do you usually shop?" flex={0} size={26} />
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
      <SubscriptionModal
        isVisible={isVisibleModalSubcribe}
        onClose={() => {
          setIsWellCome(false);
          setIsVisibleModalSubcribe(false);
        }}
        isWellCome={isWellCome}
      />
    </Container>
  );
};

export default ChooseStore;
