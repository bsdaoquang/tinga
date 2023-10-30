import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useState} from 'react';
import {Image, Linking, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {AlertDetail} from '../../Models/AlertDetail';
import {ListMenuItem} from '../../Models/ListMenuItem';
import authenticationAPI from '../../apis/authAPI';
import {Circle1} from '../../assets/svg';
import {
  Button,
  CardContent,
  ChartPieItem,
  Container,
  ListItemComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabbarComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {appInfos} from '../../constants/appInfos';
import {appSize} from '../../constants/appSize';
import {fontFamilys} from '../../constants/fontFamily';
import {LoadingModal, ModalInfoScore} from '../../modals';
import ModalAlert from '../../modals/ModalAlert';
import ModalizeFilter from '../../modals/ModalizeFilter';
import {addAuth, authSelector} from '../../redux/reducers/authReducer';
import {global} from '../../styles/global';
import Fontisto from 'react-native-vector-icons/Fontisto';

const ProfileScreen = ({navigation}: any) => {
  const [isVisibleModalInfo, setIsVisibleModalInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleModalFillter, setIsVisibleModalFillter] = useState(false);
  const [isVisibleModalAlert, setIsVisibleModalAlert] = useState(false);
  const [alertDetail, setAlertDetail] = useState<AlertDetail>();

  const dispatch = useDispatch();
  const auth = useSelector(authSelector);

  const demodatachart = [
    {
      id: '1',
      total: 84,
      data: {
        values: [70, 20, 10],
      },
    },
    {
      id: '2',
      total: 67,
      data: {
        values: [50, 30, 30],
      },
    },
    {
      id: '3',
      total: 52,
      data: {
        values: [40, 30, 30],
      },
    },
  ];

  const renderPercentage = (percen: number, color: string, title: string) => (
    <View style={{justifyContent: 'center', width: `${percen - 1.5}%`}}>
      <TextComponent
        text={`${percen}%`}
        flex={0}
        size={10}
        font={fontFamilys.bold}
        styles={{textAlign: 'center'}}
      />
      <View
        style={{
          backgroundColor: color,
          borderRadius: 4,
          height: 18,
          marginVertical: 4,
        }}
      />

      <TextComponent
        text={title}
        flex={0}
        size={10}
        font={fontFamilys.regular}
        styles={{textAlign: 'center'}}
      />
    </View>
  );

  const handleLogout = () => {
    setAlertDetail({
      title: 'Logout',
      mess: 'Do you want logout?',
      onOK: () => {
        onLogout();
        setIsVisibleModalAlert(false);
      },
    });
    setIsVisibleModalAlert(true);
  };

  const onLogout = async () => {
    setIsLoading(true);
    const api = `/logout`;

    try {
      await GoogleSignin.signOut().then(() => console.log('Logouted'));

      await authenticationAPI.HandleAuth(api, {}, 'post').then(async res => {
        await AsyncStorage.removeItem(appInfos.localDataName.userData);
        dispatch(addAuth({}));
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const settings: ListMenuItem[] = [
    {
      id: '1',
      title: 'Personal Information',
      icon: <FontAwesome name="circle" color={appColors.success1} size={14} />,
      onPress: () => navigation.navigate('PersionalInfomation'),
    },
    {
      id: '2',
      title: 'My Filters',
      icon: <Circle1 color={appColors.success1} />,
      onPress: () => setIsVisibleModalFillter(true),
    },
    {
      id: '3',
      title: 'My Favourites',
      icon: <Ionicons name="heart" color={'#F45A5B'} size={16} />,
      onPress: () => navigation.navigate('MyFavourites'),
    },
    {
      id: '4',
      title: 'Grocery List History',
      icon: <MaterialCommunityIcons name="water" color={'#99CDDC'} size={22} />,
      onPress: () => navigation.navigate('ShopingHistory'),
    },
    {
      id: '5',
      title: 'My Added Products',
      icon: (
        <MaterialCommunityIcons name="hexagon" color={'#FFD97D'} size={16} />
      ),
      onPress: () => navigation.navigate('MyAddedProducts'),
    },
    {
      id: '6',
      title: 'Refer & Get Rewarded',
      icon: <FontAwesome6 name="gift" color={appColors.danger} size={14} />,
      isPrimary: true,
      onPress: () => navigation.navigate('ReferralScreen'),
    },
  ];

  const contactsMenu: ListMenuItem[] = [
    {
      id: 'contact1',
      title: 'Contact Support',
      onPress: () => navigation.navigate('ContactSupport'),
    },
    {
      id: 'contact2',
      onPress: () => navigation.navigate('ContactDietitian'),
      title: 'Contact Dietitian',
    },
  ];

  const infosMenu: ListMenuItem[] = [
    {
      id: 'info1',
      title: 'FAQ',
      onPress: () => Linking.openURL('https://tinga.ca/faq.html'),
    },
    {
      id: 'info2',
      title: 'Privacy Policy',
      onPress: () => Linking.openURL('https://tinga.ca/privacy.html'),
    },
    {
      id: 'info3',
      title: 'Terms of Use',
      onPress: () => Linking.openURL('https://tinga.ca/terms.html'),
    },
  ];

  const handleNavigation = (item: ListMenuItem) => {
    console.log(item);
  };

  return (
    <Container isScroll>
      <SectionComponent>
        <RowComponent>
          <TitleComponent text="Profile" size={28} />
          <Image
            source={
              auth.url
                ? {uri: auth.url}
                : require('../../assets/images/profileIcon.png')
            }
            style={{
              width: 48,
              height: 48,
              borderRadius: 100,
              resizeMode: 'cover',
            }}
          />
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <RowComponent styles={{alignItems: 'flex-start'}}>
          <View style={{flex: 1}}>
            <TitleComponent text="Avg. Grocery List Score" size={20} flex={0} />
            <TextComponent
              text="Based on your last 4 lists. Last updated May 15th, 2023"
              size={10}
              font={fontFamilys.regular}
              flex={0}
            />
          </View>
          <Button
            icon={
              <AntDesign name="infocirlceo" size={20} color={appColors.gray} />
            }
            onPress={() => setIsVisibleModalInfo(true)}
          />
        </RowComponent>
        <SpaceComponent height={12} />
        <View>
          <CardContent
            onPress={() => navigation.navigate('ListScoreTrend')}
            color={appColors.white}
            isShadow
            styles={{paddingHorizontal: 37}}>
            <View style={global.center}>
              <ChartPieItem
                total={80}
                size={100}
                fontSize={40}
                data={{values: [70, 20, 10]}}
                radius={0.9}
              />
              <RowComponent styles={{marginVertical: 8}}>
                <AntDesign
                  name="caretup"
                  color={appColors.success1}
                  size={12}
                />
                <Text
                  style={[
                    global.text,
                    {
                      fontFamily: fontFamilys.bold,
                      flex: 0,
                    },
                  ]}>
                  {' '}
                  6pt{' '}
                  <Text style={{fontFamily: fontFamilys.regular}}>
                    since last list
                  </Text>
                </Text>
              </RowComponent>
            </View>
            <RowComponent justify="space-between">
              {renderPercentage(70, '#AAC54E', 'Great Choices')}

              {renderPercentage(20, '#FFD97D', 'Good')}

              {renderPercentage(10, '#F15D59', 'Limit')}
            </RowComponent>
          </CardContent>
          {auth.is_premium === 0 && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                flex: 0,
                backgroundColor: appColors.white,
                opacity: 0.92,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
              }}>
              <View
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: appColors.primary,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 12,
                }}>
                <Fontisto name="locked" size={14} color={appColors.white} />
              </View>

              <TextComponent
                text="Upgrade to Premium "
                font={fontFamilys.bold}
                styles={{textDecorationLine: 'underline'}}
                flex={0}
              />
              <TextComponent
                text="for full food ratings"
                font={fontFamilys.bold}
                flex={0}
              />
            </View>
          )}
        </View>
      </SectionComponent>
      <SectionComponent>
        <TabbarComponent
          title="Recent List Scores"
          onPress={() => navigation.navigate('ListScores')}
          seemore
        />
        <RowComponent justify="space-between">
          {demodatachart.map((item, index) => (
            <CardContent
              key={`dataChart${index}`}
              isShadow
              color={appColors.white}
              styles={{width: (appSize.width - (32 + 12 * 2)) / 3}}>
              <ChartPieItem
                data={item.data}
                key={item.id}
                total={item.total}
                size={70}
                fontSize={28}
              />
            </CardContent>
          ))}
        </RowComponent>
      </SectionComponent>
      <SectionComponent styles={{marginTop: 16}}>
        <TitleComponent
          text="SETTINGS"
          font={fontFamilys.regular}
          flex={0}
          styles={{textTransform: 'uppercase'}}
        />
        <CardContent
          styles={{padding: 0, marginTop: 16}}
          color={appColors.white}>
          {settings.map((item, index) => (
            <ListItemComponent
              key={item.id}
              isHideBorder={index === settings.length - 1}
              item={item}
              onPress={
                item.onPress ? item.onPress : () => handleNavigation(item)
              }
            />
          ))}
        </CardContent>
      </SectionComponent>
      <SectionComponent styles={{marginTop: 16}}>
        <TitleComponent
          text="Contacts Us"
          styles={{textTransform: 'uppercase'}}
          font={fontFamilys.regular}
          flex={0}
        />
        <CardContent
          styles={{padding: 0, marginTop: 16}}
          color={appColors.white}>
          {contactsMenu.map((item, index) => (
            <ListItemComponent
              key={`contact${index}`}
              isHideBorder={index === contactsMenu.length - 1}
              item={item}
              onPress={
                item.onPress ? item.onPress : () => handleNavigation(item)
              }
            />
          ))}
        </CardContent>
      </SectionComponent>
      <SectionComponent>
        <TitleComponent
          text="Information"
          styles={{textTransform: 'uppercase'}}
          font={fontFamilys.regular}
          flex={0}
        />
        <CardContent
          styles={{padding: 0, marginTop: 16}}
          color={appColors.white}>
          {infosMenu.map((item, index) => (
            <ListItemComponent
              key={item.id}
              isHideBorder={index === infosMenu.length - 1}
              item={item}
              onPress={
                item.onPress ? item.onPress : () => handleNavigation(item)
              }
            />
          ))}
        </CardContent>
      </SectionComponent>
      <SectionComponent>
        <CardContent color={appColors.white} onPress={handleLogout}>
          <TextComponent text="Log Out" color={appColors.danger} />
        </CardContent>
      </SectionComponent>

      <ModalInfoScore
        visible={isVisibleModalInfo}
        onClose={() => setIsVisibleModalInfo(false)}
      />

      <LoadingModal visible={isLoading} />
      <ModalizeFilter
        visible={isVisibleModalFillter}
        onClose={() => setIsVisibleModalFillter(false)}
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
    </Container>
  );
};

export default ProfileScreen;
