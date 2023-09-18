import {useIsFocused} from '@react-navigation/native';
import {Gift} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import Swiper from 'react-native-swiper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {TingaLogo, Users} from '../../assets/svg';
import {
  ButtonComponent,
  ButtonIcon,
  CardContent,
  Container,
  CustomIcon,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabbarComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {fontFamilys} from '../../constants/fontFamily';
import {
  ModalFeedback,
  ModalOffer,
  ModalRating,
  SubscriptionModal,
} from '../../modals';
import {addAuth, authSelector} from '../../redux/reducers/authReducer';
import {global} from '../../styles/global';
import CategoriesList from './components/CategoriesList';
import Promotions from './components/Promotions';
import VideoPlayer from './components/VideoPlayer';
import {showToast} from '../../utils/showToast';
import handleGetData from '../../apis/productAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appInfos} from '../../constants/appInfos';

const HomeScreen = ({navigation, route}: any) => {
  const isResultScan = route.params ? route.params.isResultScan : false;

  const [isvisibleModalOffer, setIsvisibleModalOffer] = useState(false);
  const [isVisibleModalSubcriber, setIsVisibleModalSubcriber] = useState(false);
  const [isVisibleModalRating, setIsVisibleModalRating] = useState(false);
  const [isVisibleModalFeedback, setIsVisibleModalFeedback] = useState(false);

  const auth = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    handleGetAndUpdateProfile();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      !auth.premium_till && setIsVisibleModalSubcriber(true);
    }, 1500);
  }, []);

  const handleGetAndUpdateProfile = async () => {
    const api = `/getUserProfile`;

    try {
      await handleGetData.handleUser(api).then(async (res: any) => {
        const data = {...auth, ...res, permium_till: res.permium_till};

        dispatch(addAuth(data));

        await AsyncStorage.setItem(
          appInfos.localDataName.userData,
          JSON.stringify(data),
        );
      });
    } catch (error: any) {
      console.log(error.message);
      showToast(`Can not get profile`);
    }
  };

  return (
    <>
      <Container
        isScroll
        barStyle={'light-content'}
        backgroundColor={appColors.primary}
        top={32}>
        <SectionComponent styles={{paddingTop: 26}}>
          <RowComponent>
            <TingaLogo width={28} height={28} />

            <SpaceComponent width={8} />
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => navigation.navigate('Profile')}>
              <TitleComponent
                text={`Hi, ${auth.first_name} ${auth.last_name}`}
                size={28}
                color={appColors.white}
                height={28}
              />
            </TouchableOpacity>
            <ButtonIcon
              icon={<Gift color={appColors.error} size={18} variant="Bold" />}
              onPress={() => setIsVisibleModalRating(true)}
            />
          </RowComponent>
        </SectionComponent>
        <SectionComponent
          styles={{
            flex: 1,
            backgroundColor: appColors.white,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            // marginTop: 12,
            paddingBottom: 12,
            paddingHorizontal: 0,
          }}>
          <Swiper
            activeDotColor="#13917B"
            activeDotStyle={{
              width: 32,
            }}
            dotColor={`#13917B66`}
            loop={false}
            showsPagination
            style={{flex: 0, height: 230, paddingVertical: 16}}>
            <CardContent styles={{marginHorizontal: 8}}>
              <TitleComponent
                text="Step 1 - Reset Your Pantry"
                flex={0}
                size={20}
              />
              <TextComponent
                text="Scan to learn which foods match your dietary restrictions and what to swap."
                flex={0}
              />
              <SpaceComponent height={16} />
              <ButtonComponent
                disable={isResultScan}
                onPress={() => navigation.navigate('BarCodeScreen')}
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
                text="Step 2 - Create your first  grocery list"
                flex={0}
                size={20}
              />
              <TextComponent text="" flex={0} />
              <SpaceComponent height={16} />
              <ButtonComponent
                onPress={() => navigation.navigate('BarCodeScreen')}
                text="START LIST"
                color={appColors.success}
                textColor={appColors.white}
              />
            </CardContent>
            <CardContent isShadow={false}>
              <TitleComponent
                text={`Start your Gluten-free shopping experience`}
                size={20}
                flex={0}
              />

              <TextComponent text="" flex={0} />
              <SpaceComponent height={16} />
              <RowComponent justify="space-between">
                <ButtonComponent
                  onPress={() => {}}
                  styles={{paddingVertical: 12}}
                  flex={1}
                  textColor={appColors.white}
                  icon={
                    <CustomIcon
                      icon={
                        <Ionicons
                          name="add"
                          size={20}
                          color={appColors.white}
                        />
                      }
                    />
                  }
                  color={appColors.success}
                  font={fontFamilys.bold}
                  text="NEW LIST"
                />

                <TouchableOpacity
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
              </RowComponent>
            </CardContent>
          </Swiper>

          <View style={{paddingHorizontal: 16}}>
            <RowComponent>
              <CardContent
                onPress={() => {}}
                styles={{flex: 1, paddingHorizontal: 10}}>
                <RowComponent>
                  <EvilIcons
                    name="search"
                    color={appColors.success}
                    size={24}
                  />
                  <TitleComponent text="Search products" />
                </RowComponent>
              </CardContent>
              <SpaceComponent width={10} />
              <CardContent
                onPress={() => {}}
                styles={{
                  flex: 1,
                  paddingHorizontal: 10,
                }}>
                <RowComponent>
                  <Users width={24} />
                  <SpaceComponent width={4} />
                  <TitleComponent text="Tinga Community" />
                </RowComponent>
              </CardContent>
            </RowComponent>

            <SpaceComponent height={16} />
            <TabbarComponent title="How it works" seemore onPress={() => {}} />
            <VideoPlayer />
          </View>
        </SectionComponent>
        <SectionComponent
          styles={{
            paddingHorizontal: 0,
            backgroundColor: appColors.white,
          }}>
          <CategoriesList title="Tips for you" />
          <CategoriesList title="Healthier Planning" />
        </SectionComponent>

        <SectionComponent
          styles={{backgroundColor: appColors.white, paddingBottom: 20}}>
          <Promotions />
          <SpaceComponent height={24} />

          <TabbarComponent title="Need Extra Support?" />
          <ButtonComponent
            text="Contact a Dietitian"
            color={appColors.success1}
            styles={{paddingVertical: 16}}
            onPress={() =>
              navigation.navigate('Profile', {screen: 'ContactDietitian'})
            }
            fontStyles={{
              color: appColors.text,
              fontSize: 16,
            }}
          />
        </SectionComponent>
      </Container>

      <ModalOffer
        isVisible={isvisibleModalOffer}
        onClose={() => {
          setIsvisibleModalOffer(false);
          setIsVisibleModalSubcriber(true);
        }}
      />

      <SubscriptionModal
        isVisible={isVisibleModalSubcriber}
        onClose={() => setIsVisibleModalSubcriber(false)}
      />

      <ModalRating
        onRating={() => Alert.alert('Rating', 'Will be show rating library!')}
        onFeedback={() => {
          setIsVisibleModalRating(false);
          setIsVisibleModalFeedback(true);
        }}
        isVisible={isVisibleModalRating}
        onClose={() => setIsVisibleModalRating(false)}
      />

      <ModalFeedback
        isVisible={isVisibleModalFeedback}
        onClose={() => setIsVisibleModalFeedback(false)}
      />
    </>
  );
};

export default HomeScreen;
