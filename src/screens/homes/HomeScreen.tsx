import AsyncStorage from '@react-native-async-storage/async-storage';
import {Gift} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {VideoModel} from '../../Models/VideoModel';
import dashboardAPI from '../../apis/dashboardAPI';
import handleGetData from '../../apis/productAPI';
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
import {appInfos} from '../../constants/appInfos';
import {
  ModalFeedback,
  ModalOffer,
  ModalRating,
  SubscriptionModal,
} from '../../modals';
import {addAuth, authSelector} from '../../redux/reducers/authReducer';
import {showToast} from '../../utils/showToast';
import CategoriesList from './components/CategoriesList';
import Promotions from './components/Promotions';
import VideoComponent from './components/VideoComponent';
import {groceriesSelector} from '../../redux/reducers/groceryReducer';
import Octicons from 'react-native-vector-icons/Octicons';
import Swiper from 'react-native-swiper';
import {fontFamilys} from '../../constants/fontFamily';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {global} from '../../styles/global';
import HomeCarousels from './components/HomeCarousels';

const HomeScreen = ({navigation, route}: any) => {
  const [isvisibleModalOffer, setIsvisibleModalOffer] = useState(false);
  const [isVisibleModalSubcriber, setIsVisibleModalSubcriber] = useState(false);
  const [isVisibleModalRating, setIsVisibleModalRating] = useState(false);
  const [isVisibleModalFeedback, setIsVisibleModalFeedback] = useState(false);
  const [videos, setVideos] = useState<VideoModel[]>([]);

  const auth = useSelector(authSelector);
  const groceriesList = useSelector(groceriesSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    handleGetAndUpdateProfile();
  }, []);

  useEffect(() => {
    // setTimeout(() => {
    //   setIsvisibleModalOffer(true);
    // }, 1500);
  }, []);

  useEffect(() => {
    getVideos();
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
              style={{flex: 1, paddingRight: 12}}
              onPress={() => navigation.navigate('Profile')}>
              <TitleComponent
                line={1}
                text={`Hi, ${auth.first_name} ${auth.last_name}`}
                size={28}
                color={appColors.white}
                height={30}
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
        onView={() => setIsVisibleModalSubcriber(true)}
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
