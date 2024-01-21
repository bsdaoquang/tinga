import {ArrowDown2, ArrowUp2} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Diet, Dislike, UserChoose, UserSelected} from '../Models/UserChoose';
import handleGetData from '../apis/productAPI';
import profileAPI from '../apis/userAPI';
import {
  Button,
  ButtonComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../components';
import {appColors} from '../constants/appColors';
import {fontFamilys} from '../constants/fontFamily';
import {global} from '../styles/global';
import {showToast} from '../utils/showToast';
import LoadingModal from './LoadingModal';
import ModalizeInfo from './ModalizeInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appInfos} from '../constants/appInfos';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const ModalizeFilter = (props: Props) => {
  const {visible, onClose} = props;

  const [userChoices, setuserChoices] = useState<UserSelected>();
  const [diets, setDiets] = useState<Diet[]>([]);
  const [disLikes, setDisLikes] = useState<UserChoose[]>([]);
  const [allergies, setAllergies] = useState<UserChoose[]>([]);
  const [shops, setShops] = useState<UserChoose[]>([]);
  const [isShowDiets, setIsShowDiets] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isShowDislike, setIsShowDislike] = useState(false);
  const [isShowAllergy, setIsShowAllergy] = useState(false);
  const [isShowShop, setIsShowShop] = useState(false);
  const [selected, setSelected] = useState<{
    allergies: number[];
    shops: number[];
    disLikes: Dislike[];
  }>({
    allergies: [],
    shops: [],
    disLikes: [],
  });
  const [isVisibleModalInfoDiet, setIsVisibleModalInfoDiet] = useState(false);
  const [typeInfo, setTypeInfo] = useState<'diet' | 'allergy'>('diet');

  useEffect(() => {
    getUserChoices();
    getDiets();
    // getDislikes();
    getAllgeries();
    getShops();
  }, []);

  useEffect(() => {
    if (userChoices) {
      setSelected({
        allergies: userChoices.allergies,
        disLikes: userChoices.dislikes,
        shops: userChoices.shops,
      });

      getDislikes();
    }
  }, [userChoices]);

  useEffect(() => {
    if (visible) {
      modalRef.current?.open();
    } else {
      modalRef.current?.close();
    }
  }, [visible]);

  const modalRef = useRef<Modalize>();

  const handleCloseModal = () => {
    modalRef.current?.close();
  };

  const getUserChoices = async () => {
    const api = `/getUserChoice`;
    try {
      await profileAPI.HandleUser(api).then((res: any) => {
        setuserChoices(res);
        // console.log(res.dislikes);
      });
    } catch (error) {
      showToast(`user choice not found`);
      console.log(error);
    }
  };

  const getDiets = async () => {
    const api = `/dietpreference`;

    try {
      await handleGetData.handleProduct(api).then((res: any) => {
        if (res) {
          setDiets(res);
        }
      });
    } catch (error) {
      console.log(`error ${error}`);
    }
  };

  const getDislikes = async () => {
    const api = `/dislikeItems`;
    const data = new FormData();
    const ids: number[] = [];

    if (userChoices?.allergies && userChoices.allergies.length > 0) {
      userChoices.allergies.forEach(item => ids.push(item.id));

      data.append('allergy_ids', ids.toString());
      data.append('prefrence', 3);

      try {
        await handleGetData
          .handleProduct(api, data, 'post', true)
          .then((res: any) => {
            setDisLikes(res);
          });
      } catch (error) {
        console.log(`error get dislike: ${error}`);
      }
    }
  };

  const getAllgeries = async () => {
    const api = `/allergies`;

    try {
      await handleGetData.handleProduct(api).then((res: any) => {
        if (res) {
          setAllergies(res);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getShops = async () => {
    const api = `/shops`;

    try {
      await handleGetData.handleProduct(api).then((res: any) => {
        if (res) {
          setShops(res);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateDietChoice = async (id: number) => {
    const api = `/dietpreference`;

    const data = new FormData();
    data.append('diets', JSON.stringify([id]));

    try {
      setIsUpdating(true);
      const res: any = await handleGetData.handleUser(api, data, 'post', true);

      if (res && res.success) {
        await AsyncStorage.setItem(appInfos.localDataName.dietType, `${id}`);

        getUserChoices();
        // setIsShowDiets(false);

        setIsUpdating(false);
      } else {
        console.log('Can not update');
        setIsUpdating(false);
      }
    } catch (error) {
      console.log(error);
      setIsUpdating(false);
    }

    //
  };

  // console.log(disLikes);

  const handleUpdateDislike = async (items: string[]) => {
    const api = `/dislikes`;

    const data = new FormData();
    data.append('dislikes', JSON.stringify(items));

    try {
      setIsUpdating(true);
      await handleGetData
        .handleUser(api, data, 'post', true)
        .then((res: any) => {
          if (res && res.success) {
            getUserChoices();
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

  const handleUpdateAllergires = async (ids: number[]) => {
    const api = `/allergies`;

    const data = new FormData();
    data.append('allergies', JSON.stringify(ids));

    try {
      setIsUpdating(true);
      await handleGetData
        .handleUser(api, data, 'post', true)
        .then((res: any) => {
          if (res && res.success) {
            getUserChoices();
            getDislikes();
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
  };

  const handleUpdateStore = async (ids: number[]) => {
    const api = `/shops`;

    const data = new FormData();
    data.append('shop', JSON.stringify(ids));

    try {
      setIsUpdating(true);
      await handleGetData
        .handleUser(api, data, 'post', true)
        .then((res: any) => {
          if (res && res.success) {
            getUserChoices();
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

  const handleSelectedItem = async (
    val: any,
    key: 'allergies' | 'shops' | 'dislikes',
  ) => {
    const items: any[] = [];

    const data: any = userChoices;

    if (data[`${key}`].length > 0) {
      data[`${key}`].forEach((item: any) => {
        items.push(key === 'dislikes' ? item.allergy_dislike : item.id);
      });
    }

    if (items.includes(val)) {
      const index = items.findIndex((element: any) => element === val);

      items.splice(index, 1);
    } else {
      items.push(val);
    }

    switch (key) {
      case 'allergies':
        await handleUpdateAllergires(items);
        break;
      case 'dislikes':
        handleUpdateDislike(items);
        break;
      case 'shops':
        handleUpdateStore(items);
        break;
    }
  };

  const handleClearAll = () => {
    handleUpdateAllergires([]);
    handleUpdateDislike([]);
    handleUpdateStore([]);
  };

  const renderButton = ({
    id,
    text,
    isRight,
    onPress,
    isSelected,
    isDiet,
  }: {
    id: number;
    text: string;
    isRight?: boolean | undefined;
    onPress: () => void;
    isSelected?: boolean;
    isDiet?: boolean;
  }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        key={`itemdislike${id}`}
        style={[
          localStyles.button,
          global.shadow,
          {
            backgroundColor: appColors.white,
            borderWidth: isSelected ? 2 : 0,
            paddingVertical: isDiet ? 16 : 8,
            borderRadius: isDiet ? 14 : 8,
          },
        ]}>
        <TextComponent
          font={isSelected ? fontFamilys.bold : fontFamilys.regular}
          flex={isRight ? 1 : 0}
          size={16}
          text={text}
        />
        {isRight && <ArrowDown2 size={22} color={appColors.text} />}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Portal>
        <Modalize
          onClose={onClose}
          ref={modalRef}
          adjustToContentHeight
          scrollViewProps={{showsVerticalScrollIndicator: false}}
          disableScrollIfPossible={false}
          handlePosition="inside"
          HeaderComponent={
            <RowComponent
              styles={{
                padding: 16,
              }}
              justify="flex-end"
              onPress={handleCloseModal}>
              <AntDesign name="close" color={appColors.gray} size={22} />
            </RowComponent>
          }
          FooterComponent={
            <RowComponent justify="space-around" styles={{paddingVertical: 12}}>
              <Button
                text="Clear all"
                onPress={() => {
                  setSelected({
                    allergies: [],
                    shops: [],
                    disLikes: [],
                  });
                  handleClearAll();
                }}
              />
              <ButtonComponent
                text="Show 300+ results"
                onPress={() => {
                  setIsShowAllergy(true);
                  setIsShowDiets(true);
                  setIsShowDislike(true);
                  setIsShowShop(true);
                }}
              />
            </RowComponent>
          }>
          <View
            style={{
              padding: 12,
              paddingBottom: 40,
            }}>
            <TitleComponent text="Filters" size={20} />
            <View>
              <View style={{marginTop: 20}}>
                <RowComponent>
                  <RowComponent
                    justify="flex-start"
                    styles={{marginBottom: 8, flex: 1}}>
                    <TextComponent
                      size={16}
                      text="Diet"
                      flex={0}
                      color="#41393E"
                      font={fontFamilys.medium}
                    />
                    <SpaceComponent width={8} />
                    <Button
                      icon={
                        <MaterialIcons
                          name="info-outline"
                          size={20}
                          color={'#9F9F9F'}
                        />
                      }
                      onPress={() => {
                        setTypeInfo('diet');
                        setIsVisibleModalInfoDiet(true);
                      }}
                    />
                  </RowComponent>
                  <Button
                    icon={
                      isShowDiets ? (
                        <ArrowUp2 size={20} color={appColors.text} />
                      ) : (
                        <ArrowDown2 size={20} color={appColors.text} />
                      )
                    }
                    onPress={() => setIsShowDiets(!isShowDiets)}
                  />
                </RowComponent>
                {isShowDiets
                  ? diets.map(item =>
                      renderButton({
                        id: item.id,
                        isDiet: true,
                        text: item.name,
                        isRight: false,
                        isSelected: userChoices?.diets.find(
                          element => element.id === item.id,
                        )
                          ? true
                          : false,
                        onPress: () => handleUpdateDietChoice(item.id),
                      }),
                    )
                  : renderButton({
                      id: 1,
                      isDiet: true,
                      text:
                        userChoices &&
                        userChoices.diets &&
                        userChoices.diets.length > 0
                          ? userChoices?.diets[0].name
                          : '',
                      isRight: false,
                      isSelected: true,
                      onPress: () => setIsShowDiets(true),
                    })}
              </View>
              <View style={{marginTop: 20}}>
                <RowComponent
                  justify="flex-start"
                  styles={{marginBottom: 8}}
                  onPress={() => setIsShowAllergy(!isShowAllergy)}>
                  <RowComponent styles={{flex: 1}} justify="flex-start">
                    <TextComponent
                      size={16}
                      text="Allergens/Restrictions"
                      flex={0}
                      color="#41393E"
                      font={fontFamilys.medium}
                    />
                    <SpaceComponent width={12} />
                    <Button
                      icon={
                        <MaterialIcons
                          name="info-outline"
                          size={20}
                          color={'#9F9F9F'}
                        />
                      }
                      onPress={() => {
                        setTypeInfo('allergy');
                        setIsVisibleModalInfoDiet(true);
                      }}
                    />
                  </RowComponent>

                  <Button
                    icon={
                      isShowAllergy ? (
                        <ArrowUp2 size={20} color={appColors.text} />
                      ) : (
                        <ArrowDown2 size={20} color={appColors.text} />
                      )
                    }
                    onPress={() => setIsShowAllergy(!isShowAllergy)}
                  />
                </RowComponent>
                {isShowAllergy ? (
                  <RowComponent justify="flex-start">
                    {allergies.map(item =>
                      renderButton({
                        id: item.id,
                        text: item.name,
                        isRight: false,
                        isSelected: userChoices?.allergies.find(
                          element => element.id === item.id,
                        )
                          ? true
                          : false,
                        onPress: () => handleSelectedItem(item.id, 'allergies'),
                      }),
                    )}
                  </RowComponent>
                ) : (
                  <RowComponent justify="flex-start">
                    {userChoices &&
                      userChoices?.allergies.length > 0 &&
                      userChoices?.allergies.map(item =>
                        renderButton({
                          id: item.id,
                          text: item.name,
                          isRight: false,
                          isSelected: true,
                          onPress: () =>
                            handleSelectedItem(item.id, 'allergies'),
                        }),
                      )}
                  </RowComponent>
                )}
              </View>
              <View style={{marginTop: 20}}>
                <RowComponent
                  justify="space-between"
                  styles={{marginBottom: 8}}
                  onPress={() => setIsShowDislike(!isShowDislike)}>
                  <TextComponent
                    size={16}
                    text="Dislikes"
                    color="#41393E"
                    font={fontFamilys.medium}
                  />
                  <SpaceComponent width={12} />
                  <Button
                    icon={
                      isShowDislike ? (
                        <ArrowUp2 size={20} color={appColors.text} />
                      ) : (
                        <ArrowDown2 size={20} color={appColors.text} />
                      )
                    }
                    onPress={() => setIsShowDislike(!isShowDislike)}
                  />
                </RowComponent>
                {isShowDislike ? (
                  <RowComponent justify="flex-start">
                    {disLikes.map(
                      (item, index) =>
                        item.name &&
                        renderButton({
                          id: index,
                          text: item.name,
                          isRight: false,
                          isSelected:
                            item.is_selected === 'Yes'
                              ? true
                              : userChoices?.dislikes.find(
                                  (element: any) =>
                                    element.allergy_dislike === item.name,
                                )
                              ? true
                              : false,
                          onPress: () =>
                            handleSelectedItem(item.name, 'dislikes'),
                        }),
                    )}
                  </RowComponent>
                ) : (
                  <RowComponent justify="flex-start">
                    {userChoices &&
                      userChoices?.dislikes &&
                      userChoices?.dislikes.map((item: any) =>
                        renderButton({
                          id: item.id,
                          text: item.allergy_dislike,
                          isRight: false,
                          isSelected: true,
                          onPress: () =>
                            handleSelectedItem(
                              item.allergy_dislike,
                              'dislikes',
                            ),
                        }),
                      )}
                  </RowComponent>
                )}
              </View>
              <View style={{marginTop: 20}}>
                <RowComponent
                  justify="flex-start"
                  styles={{marginBottom: 8}}
                  onPress={() => setIsShowShop(!isShowShop)}>
                  <TextComponent
                    size={16}
                    text="Grocery Stores"
                    color="#41393E"
                    font={fontFamilys.medium}
                  />
                  <SpaceComponent width={12} />
                  <Button
                    icon={
                      isShowShop ? (
                        <ArrowUp2 size={20} color={appColors.text} />
                      ) : (
                        <ArrowDown2 size={20} color={appColors.text} />
                      )
                    }
                    onPress={() => setIsShowShop(!isShowShop)}
                  />
                </RowComponent>
                {isShowShop ? (
                  <RowComponent justify="flex-start">
                    {shops.map(item =>
                      renderButton({
                        id: item.id,
                        text: item.name,
                        isRight: false,
                        isSelected: userChoices?.shops.find(
                          element => element.id === item.id,
                        )
                          ? true
                          : false,
                        onPress: () => handleSelectedItem(item.id, 'shops'),
                      }),
                    )}
                  </RowComponent>
                ) : (
                  <RowComponent justify="flex-start">
                    {userChoices &&
                      userChoices.shops &&
                      userChoices?.shops.map(item =>
                        renderButton({
                          id: item.id,
                          text: item.name,
                          isRight: false,
                          isSelected: true,
                          onPress: () => handleSelectedItem(item.id, 'shops'),
                        }),
                      )}
                  </RowComponent>
                )}
              </View>
            </View>
          </View>
          <LoadingModal visible={isUpdating} mess="Updating..." />
        </Modalize>
        <ModalizeInfo
          visible={isVisibleModalInfoDiet}
          onClose={() => setIsVisibleModalInfoDiet(false)}
          type={typeInfo}
        />
      </Portal>
    </>
  );
};

export default ModalizeFilter;

const localStyles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    borderColor: appColors.success1,
    borderWidth: 2,
    flexDirection: 'row',
    margin: 6,
    marginBottom: 12,
  },
});
