import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {Gift} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {StatusBar, TouchableOpacity, View} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useDispatch, useSelector} from 'react-redux';
import {useTourGuideController} from 'rn-tourguide';
import {AlertDetail} from '../../Models/AlertDetail';
import {VideoModel} from '../../Models/VideoModel';
import dashboardAPI from '../../apis/dashboardAPI';
import handleGetData from '../../apis/productAPI';
import {TingaLogo, Users} from '../../assets/svg';
import {
  ButtonComponent,
  ButtonIcon,
  CardContent,
  Container,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabbarComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {appInfos} from '../../constants/appInfos';
import {fontFamilys} from '../../constants/fontFamily';
import {
  ModalFeedback,
  ModalOffer,
  ModalRating,
  SubscriptionModal,
} from '../../modals';
import ModalAlert from '../../modals/ModalAlert';
import {addAuth, authSelector} from '../../redux/reducers/authReducer';
import {
  addLocalData,
  groceriesSelector,
} from '../../redux/reducers/groceryReducer';
import {shopingListSelector} from '../../redux/reducers/shopingListReducer';
import {showToast} from '../../utils/showToast';
import CategoriesList from './components/CategoriesList';
import HomeCarousels from './components/HomeCarousels';
import Promotions from './components/Promotions';
import VideoComponent from './components/VideoComponent';

const HomeScreen = ({navigation, route}: any) => {
  const [isvisibleModalOffer, setIsvisibleModalOffer] = useState(false);
  const [isVisibleModalSubcriber, setIsVisibleModalSubcriber] = useState(false);
  const [isVisibleModalRating, setIsVisibleModalRating] = useState(false);
  const [isVisibleModalFeedback, setIsVisibleModalFeedback] = useState(false);
  const [videos, setVideos] = useState<VideoModel[]>([]);
  const [isVisibleModalAlert, setIsVisibleModalAlert] = useState(false);
  const [alertDetail, setAlertDetail] = useState<AlertDetail>();

  const auth = useSelector(authSelector);
  const groceriesList = useSelector(groceriesSelector);
  const shopingList = useSelector(shopingListSelector);
  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  useEffect(() => {
    handleGetAndUpdateProfile();
    if (!auth.premium_till) {
      setTimeout(() => {
        setIsvisibleModalOffer(true);
      }, 1500);
    }
    getVideos();
  }, []);

  useEffect(() => {
    groceriesList.length >= 5 && setIsVisibleModalRating(true);
  }, []);

  const getVideos = async () => {
    const api = `/videos`;

    try {
      await dashboardAPI.HandleAPI(api).then((res: any) => {
        setVideos(res);
      });
    } catch (error) {
      console.log(`can not get videos for dashboard`);
      showToast('Can not get videos');
    }
  };

  const handleGetAndUpdateProfile = async () => {
    const api = `/getUserProfile`;
    try {
      await handleGetData.handleUser(api).then(async (res: any) => {
        const data = {...auth, ...res, premium_till: res.premium_till};

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

  const {stop} = useTourGuideController();

  return (
    <>
      <Container
        onScroll={() => stop()}
        isScroll
        backgroundColor={auth.premium_till ? appColors.primary : appColors.text}
        top={32}>
        <StatusBar barStyle={'light-content'} translucent />

        {!auth.premium_till && (
          <RowComponent styles={{paddingBottom: 6, paddingTop: 12}}>
            <TextComponent
              color={appColors.white}
              font={fontFamilys.semiBold}
              size={12}
              flex={0}
              text="You have Tinga Basic. "
            />
            <TouchableOpacity>
              <TextComponent
                color={appColors.white}
                font={fontFamilys.semiBold}
                size={12}
                flex={0}
                styles={{
                  textDecorationLine: 'underline',
                  textDecorationColor: appColors.white,
                }}
                text="Get Tinga Premium"
              />
            </TouchableOpacity>
          </RowComponent>
        )}
        <SectionComponent
          styles={{
            paddingBottom: 46,
            paddingTop: !auth.premium_till ? 16 : 26,
            backgroundColor: appColors.primary,
          }}>
          <RowComponent>
            <TingaLogo width={28} height={28} />
            <SpaceComponent width={8} />
            <TouchableOpacity
              style={{flex: 1, paddingRight: 12}}
              onPress={() => navigation.navigate('Profile')}>
              <TitleComponent
                line={1}
                text={`Hi, ${auth.first_name}`}
                size={28}
                color={appColors.white}
                height={30}
              />
            </TouchableOpacity>
            <ButtonIcon
              icon={<Gift color={appColors.error} size={18} variant="Bold" />}
              onPress={() => navigation.navigate('ReferralScreen')}
            />
          </RowComponent>
        </SectionComponent>
        <SectionComponent
          styles={{
            flex: 1,
            backgroundColor: appColors.white,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginTop: -26,
            paddingBottom: 12,
            paddingHorizontal: 0,
          }}>
          <HomeCarousels />
          <View style={{paddingHorizontal: 16}}>
            <RowComponent>
              <CardContent
                onPress={() => navigation.navigate('Explore')}
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
            <TabbarComponent
              title="How it works"
              seemore
              onPress={() => navigation.navigate('VideosScreen', {videos})}
            />
            {videos.length > 0 && <VideoComponent item={videos[2]} />}
          </View>
        </SectionComponent>
        <SectionComponent
          styles={{
            paddingHorizontal: 0,
            backgroundColor: appColors.white,
          }}>
          <CategoriesList title="Tips for you" url="/tipsForYou" />
          <CategoriesList title="Healthier Planning" url={'/healthiereating'} />
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
            onPress={() => navigation.navigate('ContactDietitian')}
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
        }}
        onView={() => {
          setIsVisibleModalSubcriber(true);
          setIsvisibleModalOffer(false);
        }}
      />

      <SubscriptionModal
        isVisible={isVisibleModalSubcriber}
        onClose={() => setIsVisibleModalSubcriber(false)}
      />

      <ModalRating
        onRating={() => {
          setAlertDetail({
            title: 'Rating',
            mess: 'Will be show rating library!',
            onOK: () => {
              setIsVisibleModalAlert(false);
            },
          });
          setIsVisibleModalAlert(true);
        }}
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

      {isVisibleModalAlert && alertDetail && (
        <ModalAlert
          title={alertDetail.title}
          mess={alertDetail.mess}
          onOK={alertDetail.onOK}
          isVisible={isVisibleModalAlert}
          onClose={() => {
            setIsVisibleModalAlert(false);
            setAlertDetail(undefined);
          }}
        />
      )}
    </>
  );
};

export default HomeScreen;
