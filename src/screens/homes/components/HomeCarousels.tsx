import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {PERMISSIONS, check} from 'react-native-permissions';
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {HistoryProduc} from '../../../Models/Product';
import handleGetData from '../../../apis/productAPI';
import {
  ButtonComponent,
  CardContent,
  CustomIcon,
  RowComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {fontFamilys} from '../../../constants/fontFamily';
import {global} from '../../../styles/global';
import {useSelector} from 'react-redux';
import {authSelector} from '../../../redux/reducers/authReducer';
import {ListScore} from '../../../Models/Score';
import {groceriesSelector} from '../../../redux/reducers/groceryReducer';

const HomeCarousels = ({isFirst}: {isFirst: boolean}) => {
  const [historiesList, setHistoriesList] = useState<HistoryProduc[]>([]);
  const [isGuideStart, setIsGuideStart] = useState(false);
  const [dietChecked, setDietChecked] = useState('');
  const [listScores, setListScores] = useState<ListScore[]>([]);

  const groceryList = useSelector(groceriesSelector);

  const navigation: any = useNavigation();
  const auth = useSelector(authSelector);

  useEffect(() => {
    getHistoriesListOfProduct();
    getDiets();
    getRecentsListScore();
  }, []);

  const getHistoriesListOfProduct = async () => {
    const api = `/listOfProductsCategorywise`;

    await handleGetData
      .handleProduct(api, {}, 'post')
      .then((res: any) => {
        setHistoriesList(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getRecentsListScore = async () => {
    const api = `/allListScore`;

    try {
      const res: any = await handleGetData.handleUser(api);
      res && setListScores(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getDiets = async () => {
    const api = `/dietpreference`;

    try {
      await handleGetData.handleProduct(api).then((res: any) => {
        if (res) {
          const item = res.find(
            (element: any) => element.is_selected === 'Yes',
          );

          setDietChecked(item.name);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return historiesList.length > 5 ? (
    <CardContent styles={{margin: 16, paddingVertical: 23}}>
      <TitleComponent
        size={20}
        text="Start your Gluten-free shopping experience"
      />
      <SpaceComponent height={20} />
      {historiesList.length > 0 ? (
        <RowComponent justify="space-around">
          <ButtonComponent
            styles={{paddingVertical: 10}}
            icon={
              <View
                style={{
                  backgroundColor: 'rgba(65, 57, 62, 0.50);',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 60,
                  padding: 4,
                }}>
                <Ionicons name="add" size={22} color={appColors.white} />
              </View>
            }
            onPress={() => navigation.navigate('Grocery List')}
            text="NEW LIST"
            color={appColors.primary1}
            textColor={appColors.white}
          />

          <RowComponent onPress={() => navigation.navigate('ShopingHistory')}>
            <Octicons color={appColors.primary1} size={22} name="history" />
            <SpaceComponent width={8} />
            <TitleComponent
              text="VIEW HISTORY"
              color={appColors.primary1}
              flex={0}
            />
          </RowComponent>
        </RowComponent>
      ) : (
        <>
          <ButtonComponent
            styles={{paddingVertical: 10}}
            icon={
              <View
                style={{
                  backgroundColor: 'rgba(65, 57, 62, 0.50);',
                  // width: 24,
                  // height: 24,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 60,
                  padding: 4,
                }}>
                <Ionicons name="add" size={22} color={appColors.white} />
              </View>
            }
            onPress={() => navigation.navigate('Grocery List')}
            text="NEW LIST"
            color={appColors.primary1}
            textColor={appColors.white}
          />
        </>
      )}
    </CardContent>
  ) : (
    <Swiper
      scrollEnabled={!isGuideStart}
      activeDotColor="#13917B"
      activeDotStyle={{
        width: 32,
      }}
      dotColor={`#13917B66`}
      loop={false}
      autoplay={false}
      horizontal
      showsPagination
      style={{flex: 0, height: 230, paddingVertical: 16}}>
      <CardContent styles={{marginHorizontal: 8}}>
        <TitleComponent text="Step 1 - Reset Your Pantry" flex={0} size={20} />
        <TextComponent
          text={`Scan to learn which foods match your\ndietary restrictions and what to swap.`}
          flex={0}
        />
        <SpaceComponent height={16} />
        <ButtonComponent
          disable={1 > 2 ? true : false}
          onPress={() => {
            navigation.navigate('HomeScan');
          }}
          text="Scan my food"
          icon={
            <Ionicons
              name="barcode-outline"
              size={24}
              color={appColors.white}
            />
          }
          color={appColors.success}
          textColor={appColors.white}
        />
      </CardContent>

      <CardContent styles={{marginHorizontal: 8}}>
        <TitleComponent
          text={`Step 2 - Generate and\nfavourite your ${
            isFirst ? 'first ' : ''
          }recipe`}
          flex={0}
          size={20}
        />
        <TextComponent text="" flex={0} />
        <SpaceComponent height={16} />
        <ButtonComponent
          onPress={() =>
            navigation.navigate('Recipes', {
              screen: 'recipeScreen',
            })
          }
          text="EXPLORE RECIPE GENERATOR"
          color={appColors.success}
          textColor={appColors.white}
        />
      </CardContent>
      <CardContent styles={{marginHorizontal: 8}}>
        <TitleComponent
          text={`Step 3 - Create your ${isFirst ? 'first ' : ''}grocery list`}
          flex={0}
          size={20}
        />
        <TextComponent text="" flex={0} />
        <SpaceComponent height={16} />
        <ButtonComponent
          onPress={() => navigation.navigate('Grocery List')}
          text="START LIST"
          color={appColors.success}
          textColor={appColors.white}
        />
      </CardContent>
      <CardContent isShadow={false} styles={{marginHorizontal: 8}}>
        <TitleComponent
          text={
            listScores.length > 0
              ? `Continue your customized ${
                  dietChecked ?? ''
                } shopping experience`
              : `Start your ${dietChecked ?? ''} shopping experience`
          }
          size={20}
          flex={0}
        />

        <TextComponent text="" flex={0} />
        <SpaceComponent height={16} />
        <RowComponent justify="space-between">
          <ButtonComponent
            onPress={() => navigation.navigate('Grocery List')}
            styles={{paddingVertical: 12}}
            flex={1}
            textColor={appColors.white}
            icon={
              <CustomIcon
                icon={<Ionicons name="add" size={20} color={appColors.white} />}
              />
            }
            color={appColors.success}
            font={fontFamilys.bold}
            text="NEW LIST"
          />
          {historiesList.length > 0 && (
            <TouchableOpacity
              onPress={() => navigation.navigate('ShopingHistory')}
              style={[
                global.row,
                {flex: 1, justifyContent: 'center', alignItems: 'center'},
              ]}>
              <MaterialIcons
                name="history"
                size={22}
                color={appColors.success}
              />
              <SpaceComponent width={4} />
              <TitleComponent
                text="VIEW HISTORY"
                color={appColors.success}
                flex={0}
              />
            </TouchableOpacity>
          )}
        </RowComponent>
      </CardContent>
    </Swiper>
  );
};

export default HomeCarousels;
