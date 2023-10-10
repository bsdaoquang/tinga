import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Linking,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {Subscription} from '../Models/Subscription';
import handleGetData from '../apis/productAPI';
import subscriptionAPI from '../apis/subscriptionAPI';
import {
  Button,
  ButtonComponent,
  CardContent,
  LoadingComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../components';
import {appColors} from '../constants/appColors';
import {fontFamilys} from '../constants/fontFamily';
import {addAuth, authSelector} from '../redux/reducers/authReducer';
import {global} from '../styles/global';
import {add0toNumber} from '../utils/add0toNumber';
import {showToast} from '../utils/showToast';
import LoadingModal from './LoadingModal';
import ModalRegisterPermium from './ModalRegisterPermium';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  isWellCome?: boolean;
}

const date = new Date();

const SubscriptionModal = (props: Props) => {
  const {isVisible, onClose, isWellCome} = props;
  const [isVisibleModalRegister, setIsVisibleModalRegister] = useState(false);
  const [subscriptionsPlan, setSubscriptionsPlan] = useState<Subscription[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [permiumItem, setPermiumItem] = useState<Subscription>();

  const auth = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  useEffect(() => {
    getSubscriptionsPlan();
  }, []);

  const getUserProfile = async () => {
    const api = `/getUserProfile`;

    try {
      await handleGetData.handleUser(api).then((res: any) => {
        const still = res.premium_till;

        if (still) {
          dispatch(
            addAuth({
              ...auth,
              premium_till: still,
            }),
          );
        }
      });
    } catch (error) {
      showToast(JSON.stringify(error));
    }
  };

  const getSubscriptionsPlan = async () => {
    const api = `/plans`;

    try {
      await subscriptionAPI.HandleSubscription(api).then(async (res: any) => {
        setSubscriptionsPlan(res);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      showToast(JSON.stringify(error));
      console.log(error);
      console.log(`Can not get subscription plans ${error}`);
    }
  };

  const descriptions = [
    'Build health-scored grocery lists tailored\nto your dietary needs',
    'Scan & swap for healthier options',
    'Simplified nutritional information ',
    'Access to a resource library to help you\nreach your goals',
  ];

  const handleSetSubscriptionDate = async () => {
    setIsUpdating(true);
    const api = `/setSubscriptionDate`;
    const premium_till = `${date.getFullYear()}-${add0toNumber(
      date.getMonth(),
    )}-${add0toNumber(date.getDate())} ${add0toNumber(
      date.getHours(),
    )}:${add0toNumber(date.getMinutes())}:${add0toNumber(date.getSeconds())}`;

    try {
      await subscriptionAPI
        .HandleSubscription(
          api,
          {
            premium_till,
          },
          'post',
        )
        .then(async (res: any) => {
          await getUserProfile();

          showToast(res.message);
          setIsUpdating(false);

          onClose();

          if (isWellCome) {
            navigation.navigate('HomeScanWellCome');
          }
        });
    } catch (error) {
      setIsUpdating(false);
      console.log(error);
      console.log(`Can not add subscription still ${error}`);
    }
  };

  const renderAnnualOffer = () => {
    const item =
      subscriptionsPlan.find(element => element.name === 'Annual') ||
      subscriptionsPlan[1];

    return item ? (
      <CardContent
        onPress={() => {
          setPermiumItem(item);
          setIsVisibleModalRegister(true);
        }}
        // onPress={() => (!isWellCome ? handleSetSubscriptionDate() : undefined)}
        color={appColors.text}
        styles={{padding: 0, alignItems: 'center', marginBottom: 16}}
      >
        {!isWellCome && (
          <TextComponent
            text="LIMITED-TIME OFFER"
            color={appColors.white}
            font={fontFamilys.semiBold}
            size={12}
            styles={{paddingVertical: 2}}
          />
        )}
        <View
          style={{
            flex: 1,
            width: '100%',
            padding: 12,
            marginBottom: 0,
            margin: 0,
            backgroundColor: '#13917B',
            borderRadius: 8,
          }}
        >
          <RowComponent>
            <TitleComponent text={item.name} color={appColors.white} />
            <TextComponent
              size={12}
              color={appColors.white}
              font={fontFamilys.semiBold}
              text={
                isWellCome
                  ? 'BEST VALUE'
                  : `${Math.floor(
                      100 - (item.offer_price / item.price) * 100,
                    ).toFixed(0)}% OFF`
              }
              flex={0}
              styles={[
                {
                  backgroundColor: appColors.primary,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  borderRadius: 3,
                },
              ]}
            />
          </RowComponent>
          <SpaceComponent height={8} />
          <RowComponent onPress={() => {}} justify="flex-start">
            <TextComponent
              text={`$${isWellCome ? '89.99' : item.offer_price.toFixed(2)}`}
              flex={0}
              color={appColors.white}
            />
            {!isWellCome && (
              <TextComponent
                text={` $${item.price.toFixed(2)}`}
                color={appColors.white}
                flex={0}
                styles={{
                  textDecorationLine: 'line-through',
                }}
              />
            )}

            <TextComponent
              text={` after ${item.trial_days} day free trial`}
              color={appColors.white}
              size={14}
              flex={0}
            />
          </RowComponent>
        </View>
      </CardContent>
    ) : null;
  };

  const renderMonthOffer = () => {
    const item =
      subscriptionsPlan.find(element => element.name === 'Monthly') ||
      subscriptionsPlan[0];

    return item ? (
      <CardContent
        onPress={() => {
          setPermiumItem(item);
          setIsVisibleModalRegister(true);
        }}
        // onPress={() => (!isWellCome ? handleSetSubscriptionDate() : undefined)}
        styles={{
          flex: 1,
          width: '100%',
          padding: 12,
          marginBottom: 0,
          borderWidth: 2,
          borderColor: '#EEF3DC',
        }}
        color={appColors.white}
      >
        <RowComponent>
          <TitleComponent text={item.name} color={appColors.text} />
          {!isWellCome && (
            <TextComponent
              size={12}
              color={appColors.text}
              font={fontFamilys.semiBold}
              text={`${Math.floor(
                100 - (item.offer_price / item.price) * 100,
              ).toFixed(0)}% OFF`}
              flex={0}
              styles={[
                {
                  backgroundColor: appColors.primary,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  borderRadius: 3,
                  opacity: 0.5,
                },
              ]}
            />
          )}
        </RowComponent>
        <SpaceComponent height={8} />
        <RowComponent
          onPress={() => {}}
          justify="flex-start"
          styles={{alignItems: 'flex-end'}}
        >
          <TextComponent
            text={`$${isWellCome ? '8.99' : item.offer_price}`}
            flex={0}
            color={appColors.text}
          />
          {!isWellCome && (
            <TextComponent
              text={` $${item.price}`}
              color={appColors.text}
              size={14}
              flex={0}
              styles={{
                textDecorationLine: 'line-through',
              }}
            />
          )}
          <TextComponent
            text={` after ${item.trial_days} day free trial`}
            color={appColors.text}
            size={14}
            flex={0}
          />
        </RowComponent>
      </CardContent>
    ) : null;
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      style={{
        flex: 1,
        backgroundColor: appColors.white,
      }}
    >
      <ScrollView
        style={[
          {
            flex: 1,
            paddingTop: 48,
          },
        ]}
      >
        <SectionComponent>
          <RowComponent justify="flex-end">
            <Button
              onPress={() => {
                // onClose();
                if (isWellCome) {
                  navigation.navigate('HomeScanWellCome');
                }
              }}
              icon={
                <AntDesign name="close" size={22} color={appColors.gray2} />
              }
            />
          </RowComponent>

          <Text
            style={[
              global.text,
              {
                fontFamily: fontFamilys.bold,
                fontSize: 36,
                lineHeight: 32.5,
              },
            ]}
          >
            Try Tinga for free,{' '}
            <Text style={{fontSize: 24}}>cancel anytime.</Text>
          </Text>
          <SpaceComponent height={20} />

          {descriptions.map((desc, index) => (
            <RowComponent
              styles={{
                alignItems: 'flex-start',
                marginBottom: 8,
              }}
              key={`desc${index}`}
            >
              <FontAwesome name="check" color={appColors.success1} size={28} />
              <SpaceComponent width={12} />
              <TextComponent text={desc} />
            </RowComponent>
          ))}
        </SectionComponent>
        {subscriptionsPlan.length > 0 ? (
          <>
            <SectionComponent styles={{marginTop: 50}}>
              {renderAnnualOffer()}

              {renderMonthOffer()}
            </SectionComponent>
            <SectionComponent>
              <ButtonComponent
                text="Try free and subscribe"
                onPress={handleSetSubscriptionDate}
                color={appColors.success1}
                textColor={appColors.text}
              />

              <RowComponent styles={{marginVertical: 20}}>
                <TouchableOpacity onPress={() => showToast('In comming')}>
                  <TextComponent
                    font={fontFamilys.bold}
                    color="#32645B"
                    text="Restore Purchase "
                  />
                </TouchableOpacity>
                <TextComponent
                  font={fontFamilys.bold}
                  color="#32645B"
                  text="•"
                  flex={0}
                />
                <TouchableOpacity
                  onPress={() => Linking.openURL('https://tinga.ca/terms.html')}
                >
                  <TextComponent
                    font={fontFamilys.bold}
                    color="#32645B"
                    text=" Terms & Conditions"
                  />
                </TouchableOpacity>
              </RowComponent>
            </SectionComponent>
          </>
        ) : (
          <LoadingComponent
            isLoading={isLoading}
            value={subscriptionsPlan.length}
          />
        )}
      </ScrollView>
      <Image
        source={require('../assets/images/Ellipse.png')}
        style={{
          marginTop: 20,
          width: '100%',
          resizeMode: 'cover',
          position: 'absolute',
          bottom: -52,
          left: 0,
          right: 0,
          zIndex: -1,
        }}
      />

      <LoadingModal visible={isUpdating} />
      <ModalRegisterPermium
        isVisible={isVisibleModalRegister}
        onClose={() => {
          setIsVisibleModalRegister(false);
          setPermiumItem(undefined);
        }}
        permiumItem={permiumItem}
      />
    </Modal>
  );
};

export default SubscriptionModal;
