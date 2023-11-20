import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {UserChoose} from '../../Models/UserChoose';
import handleGetData from '../../apis/productAPI';
import {
  ButtonComponent,
  Container,
  LoadingComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {fontFamilys} from '../../constants/fontFamily';
import {LoadingModal} from '../../modals';

const ChooseDiet = ({navigation}: any) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [choosese, setChoosese] = useState<UserChoose[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  const handleGetAllProducts = async () => {
    const api = `/dietpreference`;

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
    const api = `/dietpreference`;

    const data = new FormData();
    data.append('diets', JSON.stringify(selected));

    navigation.navigate('ChooseAllergy');

    try {
      setIsUpdating(true);
      await handleGetData
        .handleUser(api, data, 'post', true)
        .then((res: any) => {
          if (res && res.success) {
            navigation.navigate('ChooseAllergy');
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
    <Container back paddingBottom={0}>
      <SectionComponent flex={1}>
        <TextComponent text="Dietary Preferences" size={12} flex={0} />
        <TitleComponent
          text="Which core diet would you like to follow?"
          flex={0}
          size={26}
        />
        <SpaceComponent height={20} />
        {choosese.length > 0 ? (
          choosese.map((item, index) => (
            <TouchableOpacity
              onPress={() => setSelected([item.id])}
              style={[
                {
                  borderWidth: 2,
                  borderColor: selected.includes(item.id)
                    ? appColors.success1
                    : appColors.white,
                  paddingHorizontal: 16,
                  paddingVertical: 20,
                  justifyContent: 'flex-start',
                  borderRadius: 12,
                  backgroundColor: appColors.white,
                  marginTop: 16,
                },
              ]}
              key={item.id}>
              <TextComponent
                text={item.name}
                flex={0}
                font={
                  selected.includes(item.id)
                    ? fontFamilys.bold
                    : fontFamilys.medium
                }
              />
            </TouchableOpacity>
          ))
        ) : (
          <LoadingComponent isLoading={isLoading} value={choosese.length} />
        )}
      </SectionComponent>
      <SectionComponent styles={{marginVertical: 20}}>
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

export default ChooseDiet;
