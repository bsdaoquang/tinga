import {Gift, Heart, SearchNormal1} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Alert, Image, StatusBar, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {AlertDetail} from '../../Models/AlertDetail';
import {HistoryProduc} from '../../Models/Product';
import {ProfileScore} from '../../Models/Score';
import {VideoModel} from '../../Models/VideoModel';
import dashboardAPI from '../../apis/dashboardAPI';
import handleGetData from '../../apis/productAPI';
import {UnionSelected, Users} from '../../assets/svg';
import {
  ButtonComponent,
  ButtonIcon,
  CardContent,
  ChartPieItem,
  Container,
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
import ModalAlert from '../../modals/ModalAlert';
import {authSelector} from '../../redux/reducers/authReducer';
import {showToast} from '../../utils/showToast';
import CategoriesList from './components/CategoriesList';
import HomeCarousels from './components/HomeCarousels';
import Promotions from './components/Promotions';
import RecipesList from './components/RecipesList';
import VideoComponent from './components/VideoComponent';

const HomeScreen = ({navigation, route}: any) => {
  const [isvisibleModalOffer, setIsvisibleModalOffer] = useState(false);
  const [isVisibleModalSubcriber, setIsVisibleModalSubcriber] = useState(false);
  const [isVisibleModalRating, setIsVisibleModalRating] = useState(false);
  const [isVisibleModalFeedback, setIsVisibleModalFeedback] = useState(false);
  const [videos, setVideos] = useState<VideoModel[]>([]);
  const [isVisibleModalAlert, setIsVisibleModalAlert] = useState(false);
  const [alertDetail, setAlertDetail] = useState<AlertDetail>();
  const [historiesList, setHistoriesList] = useState<HistoryProduc[]>([]);
  const [profileScore, setProfileScore] = useState<ProfileScore>();

  const auth = useSelector(authSelector);

  useEffect(() => {
    if (auth.is_premium !== 1) {
      setTimeout(() => {
        setIsvisibleModalOffer(true);
      }, 1500);
    }
    getVideos();
    getHistoriesListOfProduct();
    getLatesProfileScore();
  }, []);

  useEffect(() => {
    historiesList.length >= 5 &&
      setTimeout(() => {
        setIsVisibleModalRating(true);
      }, 3000);
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

  const getLatesProfileScore = async () => {
    const api = `/avgListScore`;

    try {
      const res: any = await handleGetData.handleUser(api);

      res && setProfileScore(res);
    } catch (error) {
      console.log(`Can not get profile score, ${error}`);
    }
  };

  return (
    <>
      <Container isScroll backgroundColor={appColors.text}>
        <StatusBar barStyle={'light-content'} translucent />

        {auth.is_premium === 0 ? (
          <RowComponent styles={{paddingBottom: 6, paddingTop: 12}}>
            <TextComponent
              color={appColors.white}
              font={fontFamilys.semiBold}
              size={12}
              flex={0}
              text="You have Tinga Basic. "
            />
            <TouchableOpacity onPress={() => setIsVisibleModalSubcriber(true)}>
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
        ) : (
          <RowComponent>
            <Image
              source={require('../../assets/images/premiumLogo.png')}
              style={{
                width: 123,
                height: 30,
                resizeMode: 'contain',
                marginVertical: 6,
              }}
            />
          </RowComponent>
        )}
        <SectionComponent
          styles={{
            paddingBottom: 46,
            paddingTop: auth.is_premium === 0 ? 16 : 26,
            backgroundColor: appColors.primary,
          }}>
          <RowComponent>
            <TouchableOpacity
              style={{
                flex: 1,
                paddingRight: 12,
                flexDirection: 'row',
              }}
              onPress={() => navigation.navigate('ProfileScreen')}>
              {profileScore && profileScore.list_score >= 0 ? (
                <View
                  style={{
                    padding: 3,
                    backgroundColor: appColors.white,
                    borderRadius: 100,
                  }}>
                  <ChartPieItem
                    total={`${profileScore?.list_score}`}
                    size={32}
                    fontSize={18}
                    data={{
                      values: [
                        profileScore.green_line,
                        profileScore.orange_line,
                        profileScore.red_line,
                      ],
                    }}
                    radius={0.9}
                  />
                </View>
              ) : (
                <></>
              )}
              <SpaceComponent width={8} />

              <TitleComponent
                line={1}
                text={`Hi, ${auth.first_name}`}
                size={28}
                color={appColors.white}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginRight: 10}}
              onPress={() => navigation.navigate('MyFavourites')}>
              <Heart size={30} color={appColors.white} />
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
            marginTop: -36,
            paddingBottom: 12,
            paddingHorizontal: 0,
          }}>
          <HomeCarousels />
          <View style={{paddingHorizontal: 16}}>
            <RowComponent>
              <CardContent
                onPress={() => navigation.navigate('Recipes')}
                styles={{flex: 1, paddingHorizontal: 10}}>
                <RowComponent
                  onPress={() =>
                    navigation.navigate('Recipes', {
                      screen: 'recipeScreen',
                    })
                  }>
                  <UnionSelected color={appColors.success} />
                  <SpaceComponent width={4} />
                  <TitleComponent text="Generate Recipes" />
                </RowComponent>
              </CardContent>
              <SpaceComponent width={10} />
              <CardContent
                onPress={() => navigation.navigate('Explore')}
                styles={{
                  flex: 1,
                  paddingHorizontal: 10,
                }}>
                <RowComponent>
                  <SearchNormal1 color={'#13917B'} size={22} />
                  <SpaceComponent width={4} />
                  <TitleComponent text="Search products" />
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
          <RecipesList />
          <CategoriesList title="Tips for you" url="/tipsForYou" />
          <CategoriesList title="Healthier Planning" url={'/healthiereating'} />
        </SectionComponent>

        <SectionComponent
          styles={{backgroundColor: appColors.white, paddingBottom: 40}}>
          <Promotions />

          <ButtonComponent
            icon={<Users width={24} />}
            text="Tinga Community"
            color={'rgba(191, 191, 191, 0.21)'}
            styles={{paddingVertical: 16, marginVertical: 32}}
            onPress={() => Alert.alert('Info', 'Waiting community url')}
            fontStyles={{
              color: appColors.text,
              fontSize: 16,
            }}
          />

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
