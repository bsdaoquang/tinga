import {Gift} from 'iconsax-react-native';
import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
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
import CategoriesList from './components/CategoriesList';
import VideoPlayer from './components/VideoPlayer';
import {TouchableOpacity} from 'react-native';
import {global} from '../../styles/global';
import Promotions from './components/Promotions';
import {useDispatch, useSelector} from 'react-redux';
import {addAuth, authSelector} from '../../redux/reducers/authReducer';

const HomeScreen = () => {
  const [isLogin, setIsLogin] = useState(false);

  const dispatch = useDispatch();

  dispatch(
    addAuth({
      uid: 'admin',
    }),
  );

  return (
    <>
      <Container
        isScroll
        backgroundColor={appColors.primary}
        top={44}
        barStyle="light-content">
        <SectionComponent>
          <RowComponent>
            <TingaLogo width={28} height={28} />

            <SpaceComponent width={8} />
            <TitleComponent
              text="Hi, Jenna"
              flex={1}
              size={28}
              color={appColors.white}
              height={28}
            />
            <ButtonIcon
              icon={<Gift color={appColors.error} size={18} variant="Bold" />}
              onPress={() => {}}
            />
          </RowComponent>
        </SectionComponent>
        <SectionComponent
          styles={{
            flex: 1,
            backgroundColor: appColors.white,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginTop: 12,
            paddingBottom: 12,
          }}>
          <CardContent>
            <TitleComponent
              text={`Start your Gluten-free shopping experience`}
              size={20}
            />
            <RowComponent justify="space-between">
              <ButtonComponent
                flex={1}
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
              styles={{flex: 1, paddingHorizontal: 10}}>
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
          <CategoriesList title="Tips for you" />
          <CategoriesList title="Healthier Planning" />

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
    </>
  );
};

export default HomeScreen;
