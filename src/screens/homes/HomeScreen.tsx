import {Gift, Status} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  StatusBar,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TingaLogo} from '../../assets/svg';
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
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {fontFamilys} from '../../constants/fontFamily';
import {
  ModalOffer,
  SubscriptionModal,
  ModalRating,
  ModalFeedback,
} from '../../modals';
import {global} from '../../styles/global';
import CategoriesList from './components/CategoriesList';
import Promotions from './components/Promotions';
import VideoPlayer from './components/VideoPlayer';

const HomeScreen = ({navigation}: any) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isvisibleModalOffer, setIsvisibleModalOffer] = useState(false);
  const [isVisibleModalSubcriber, setIsVisibleModalSubcriber] = useState(false);
  const [isVisibleModalRating, setIsVisibleModalRating] = useState(false);
  const [isVisibleModalFeedback, setIsVisibleModalFeedback] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsvisibleModalOffer(true);
    }, 3000);
  }, []);

  return (
    <>
      <Container
        barStyle="light-content"
        isScroll
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
                text="Hi, Jenna"
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
          }}>
          <CardContent isShadow={false} styles={{marginVertical: 16}}>
            <TitleComponent
              text={`Start your Gluten-free shopping experience`}
              size={20}
            />
            <RowComponent justify="space-between">
              <ButtonComponent
                flex={1}
                textColor={appColors.white}
                icon={
                  <CustomIcon
                    icon={
                      <Ionicons name="add" size={20} color={appColors.white} />
                    }
                  />
                }
                styles={{marginTop: 16}}
                color={appColors.success}
                font={fontFamilys.bold}
                text="NEW LIST"
                onPress={() => setIsLogin(!isLogin)}
              />
              {isLogin && (
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
              )}
            </RowComponent>
          </CardContent>
          <RowComponent>
            <CardContent
              onPress={() => {}}
              styles={{flex: 1, paddingHorizontal: 10}}>
              <RowComponent>
                <EvilIcons name="search" color={appColors.success} size={24} />
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
                <FontAwesome6
                  name="users"
                  color={appColors.success}
                  size={16}
                />
                <SpaceComponent width={4} />
                <TitleComponent text="Tinga Community" />
              </RowComponent>
            </CardContent>
          </RowComponent>

          <SpaceComponent height={16} />
          <TabbarComponent title="How it works" seemore onPress={() => {}} />
          <VideoPlayer />
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
            onPress={() => {}}
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
