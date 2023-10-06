import React, {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Button,
  ButtonComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../components';
import {appColors} from '../constants/appColors';
import {showToast} from '../utils/showToast';
import profileAPI from '../apis/userAPI';
import handleGetData from '../apis/productAPI';
import {Diet, UserChoose, UserSelected} from '../Models/UserChoose';
import {fontFamilys} from '../constants/fontFamily';
import {ArrowDown2, ArrowUp2, InfoCircle} from 'iconsax-react-native';
import {global} from '../styles/global';
import LoadingModal from './LoadingModal';
import ModalizeInfo from './ModalizeInfo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
    disLikes: number[];
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
    getDislikes();
    getAllgeries();
    getShops();
  }, []);

  useEffect(() => {
    handleUpdateAllergires();
    handleUpdateDislike();
    handleUpdateStore();
  }, [selected]);

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
      console.log(error);
    }
  };

  const allergy_ids = ['2'];

  const getDislikes = async () => {
    const api = `/dislikeItems`;
    const data = new FormData();

    data.append('allergy_ids', allergy_ids ? `${allergy_ids}` : '[]');
    data.append('prefrence', '3');

    try {
      await handleGetData.handleProduct(api, data, 'post').then((res: any) => {
        const items: any[] = [];

        for (const i in res) {
          items.push({
            id: parseInt(i),
            name: res[i],
          });
        }

        setDisLikes(items);
      });
    } catch (error) {
      console.log(error);
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
      await handleGetData
        .handleUser(api, data, 'post', true)
        .then((res: any) => {
          if (res && res.success) {
            getUserChoices();
            setIsShowDiets(false);
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

  const handleUpdateDislike = async () => {
    const api = `/dislikes`;

    const items: string[] = [];

    selected.disLikes.forEach(id => {
      const item = disLikes.find(element => element.id === id);

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

  const handleUpdateAllergires = async () => {
    const api = `/allergies`;

    const data = new FormData();
    data.append('allergies', JSON.stringify(selected.allergies));

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

  const handleUpdateStore = async () => {
    const api = `/shops`;

    const data = new FormData();
    data.append('shop', JSON.stringify(selected.shops));

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

  const handleSelectedItem = (
    id: number,
    key: 'allergies' | 'shops' | 'disLikes',
  ) => {
    const items: any = selected;
    if (items[`${key}`].includes(id)) {
      const index = items[`${key}`].findIndex((element: any) => element === id);

      items[`${key}`].splice(index, 1);
    } else {
      items[`${key}`].push(id);
    }

    setSelected({
      ...items,
    });
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
        key={`item${id}`}
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
          handlePosition="inside">
          <View
            style={{
              padding: 12,
              paddingBottom: 40,
            }}>
            <RowComponent justify="flex-end" onPress={handleCloseModal}>
              <AntDesign name="close" color={appColors.gray} size={22} />
            </RowComponent>

            <TitleComponent text="Filters" size={20} />
            <ScrollView>
              <View style={{marginTop: 20}}>
                <RowComponent justify="flex-start" styles={{marginBottom: 8}}>
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
                {/* {isShowDiets
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
                      text: userChoices?.diets[0].name ?? '',
                      isRight: true,
                      isSelected: true,
                      onPress: () => setIsShowDiets(true),
                    })} */}
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
                    onPress={() => {}}
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
                    {userChoices?.allergies.map(item =>
                      renderButton({
                        id: item.id,
                        text: item.name,
                        isRight: false,
                        isSelected: true,
                        onPress: () => handleSelectedItem(item.id, 'allergies'),
                      }),
                    )}
                  </RowComponent>
                )}
              </View>
              <View style={{marginTop: 20}}>
                <RowComponent
                  justify="flex-start"
                  styles={{marginBottom: 8}}
                  onPress={() => setIsShowDislike(!isShowDislike)}>
                  <TextComponent
                    size={16}
                    text="Dislikes"
                    flex={0}
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
                    onPress={() => {}}
                  />
                </RowComponent>
                {isShowDislike ? (
                  <RowComponent justify="flex-start">
                    {disLikes.map(item =>
                      renderButton({
                        id: item.id,
                        text: item.name,
                        isRight: false,
                        isSelected: userChoices?.dislikes.find(
                          element => element.id === item.id,
                        )
                          ? true
                          : false,
                        onPress: () => handleSelectedItem(item.id, 'disLikes'),
                      }),
                    )}
                  </RowComponent>
                ) : (
                  <RowComponent justify="flex-start">
                    {userChoices?.dislikes.map(item =>
                      renderButton({
                        id: item.id,
                        text: item.allergy_dislike,
                        isRight: false,
                        isSelected: true,
                        onPress: () => handleSelectedItem(item.id, 'disLikes'),
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
                    flex={0}
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
                    onPress={() => {}}
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
                    {userChoices?.shops.map(item =>
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
            </ScrollView>
            <RowComponent justify="space-around">
              <Button
                text="Clear all"
                onPress={() => {
                  setSelected({
                    allergies: [],
                    shops: [],
                    disLikes: [],
                  });
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
          </View>
          <LoadingModal visible={isUpdating} mess="Updating..." />
        </Modalize>
      </Portal>
      <ModalizeInfo
        visible={isVisibleModalInfoDiet}
        onClose={() => setIsVisibleModalInfoDiet(false)}
        type={typeInfo}
      />
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
