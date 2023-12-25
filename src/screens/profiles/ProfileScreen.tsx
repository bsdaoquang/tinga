import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useState} from 'react';
import {Image, Linking, TouchableOpacity} from 'react-native';
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
  CardContent,
  Container,
  ListItemComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {appInfos} from '../../constants/appInfos';
import {fontFamilys} from '../../constants/fontFamily';
import {LoadingModal} from '../../modals';
import ModalAlert from '../../modals/ModalAlert';
import ModalizeFilter from '../../modals/ModalizeFilter';
import {addAuth, authSelector} from '../../redux/reducers/authReducer';
import AvgScoreComponent from './components/AvgScoreComponent';

const ProfileScreen = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleModalFillter, setIsVisibleModalFillter] = useState(false);
  const [isVisibleModalAlert, setIsVisibleModalAlert] = useState(false);
  const [alertDetail, setAlertDetail] = useState<AlertDetail>();

  const dispatch = useDispatch();
  const auth = useSelector(authSelector);

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
          <TouchableOpacity
            onPress={() => navigation.navigate('PersionalInfomation')}>
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
          </TouchableOpacity>
        </RowComponent>
      </SectionComponent>
      <AvgScoreComponent />

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
