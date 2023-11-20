import AsyncStorage from '@react-native-async-storage/async-storage';
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
import {appInfos} from '../constants/appInfos';
import {appSize} from '../constants/appSize';
import {fontFamilys} from '../constants/fontFamily';
import {addAuth, authSelector} from '../redux/reducers/authReducer';
import {global} from '../styles/global';
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

  const dispatch = useDispatch();
  const navigation: any = useNavigation();

  useEffect(() => {
    getSubscriptionsPlan();
  }, []);

  useEffect(() => {
    setPermiumItem(subscriptionsPlan[0]);
  }, [subscriptionsPlan]);

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

  const descriptions = isWellCome
    ? [
        'Build health-scored grocery lists tailored\nto your dietary needs',
        'Scan & swap for healthier options',
        'Simplified nutritional information ',
        'Access to a resource library to help you\nreach your goals',
      ]
    : [
        'Build health-scored grocery lists tailored\nto your dietary needs',
        'Discover  & swap for healthier options',
        'Scan & swap for healthier options',
        'Simplified nutritional information ',
        'Access to a resource library to help you\nreach your goals',
      ];

  const handleSetSubscriptionDate = async (isFalseTransaction: boolean) => {
    const res = await AsyncStorage.getItem(appInfos.localDataName.userData);

    if (res) {
      const userData = JSON.parse(res);

      if (!isFalseTransaction) {
        setIsUpdating(true);
        const api = `/setSubscriptionDate`;

        try {
          const data = {
            subscription_id: permiumItem?.id,
            uuid: userData.id,
          };

          await subscriptionAPI
            .HandleSubscription(api, data, 'post')
            .then(async (res: any) => {
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
      } else {
        dispatch(addAuth(userData));
      }
    }
  };

  const renderSubscriptionItem = (item: Subscription) => {
    const colorText =
      permiumItem && permiumItem.id === item.id
        ? appColors.white
        : appColors.text;

    const textString = !isWellCome ? (
      <RowComponent justify="flex-start" styles={{alignItems: 'flex-end'}}>
        <TextComponent
          text={`$${item.claim_price.toFixed(2)}`}
          flex={0}
          color={colorText}
          size={20}
        />

        <TextComponent
          text={` $${item.price.toFixed(2)}`}
          color={colorText}
          flex={0}
          size={14}
          styles={{
            marginLeft: 6,
            textDecorationLine: 'line-through',
          }}
        />
      </RowComponent>
    ) : (
      <RowComponent justify="flex-start" styles={{alignItems: 'flex-end'}}>
        <TextComponent
          text={`$${item.offer_price.toFixed(2)}`}
          flex={0}
          color={colorText}
          size={20}
        />

        <TextComponent
          text={` $${item.price.toFixed(2)}`}
          color={colorText}
          flex={0}
          styles={{
            marginLeft: 6,
            textDecorationLine: 'line-through',
          }}
          size={14}
        />

        <TextComponent
          text={` after ${item.trial_days} day free trial`}
          color={colorText}
          size={14}
          flex={0}
        />
      </RowComponent>
    );

    const percent = isWellCome
      ? Math.floor(100 - (item.offer_price / item.price) * 100).toFixed(0)
      : Math.floor(100 - (item.claim_price / item.price) * 100).toFixed(0);
    return (
      <CardContent
        key={item.id}
        onPress={() => {
          setPermiumItem(item);
        }}
        color={appColors.text}
        styles={{padding: 0, alignItems: 'center', marginBottom: 16}}>
        {item.limitedperiod === '1' && (
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
            backgroundColor:
              permiumItem && permiumItem.id === item.id
                ? appColors.primary1
                : appColors.white,
            borderRadius: 8,
          }}>
          <RowComponent>
            <TitleComponent text={item.title} color={colorText} size={16} />
            <TextComponent
              size={12}
              color={appColors.white}
              font={fontFamilys.semiBold}
              text={
                item.limitedperiod !== '1' ? 'BEST VALUE' : `${percent}% OFF`
              }
              flex={0}
              styles={[
                {
                  backgroundColor:
                    item['color-code'] === '#FFFFFF'
                      ? '#32645B80'
                      : appColors.primary,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  borderRadius: 3,
                },
              ]}
            />
          </RowComponent>
          <SpaceComponent height={8} />
          {textString}
        </View>
      </CardContent>
    );
  };

  return (
    <Modal
      visible={isVisible}
      statusBarTranslucent
      animationType="slide"
      style={{
        flex: 1,
        height: appSize.height,
        backgroundColor: appColors.white,
      }}>
      <ScrollView
        style={[
          {
            paddingTop: 32,
            flex: 1,
          },
        ]}>
        <SectionComponent>
          <RowComponent justify="flex-end">
            <Button
              onPress={() => {
                if (isWellCome) {
                  navigation.navigate('HomeScanWellCome');
                } else {
                  onClose();
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
            ]}>
            {isWellCome ? `Try Tinga for free, \n` : `Tinga Premium \n`}
            <Text style={{fontSize: 24}}>
              {isWellCome ? 'cancel anytime.' : 'unlock all features'}
            </Text>
          </Text>
          <SpaceComponent height={20} />

          {descriptions.map((desc, index) => (
            <RowComponent
              styles={{
                alignItems: 'flex-start',
                marginBottom: 8,
              }}
              key={`desc${index}`}>
              <FontAwesome name="check" color={appColors.success1} size={28} />
              <SpaceComponent width={12} />
              <TextComponent text={desc} />
            </RowComponent>
          ))}
        </SectionComponent>
        <View style={{flex: 1}} />
        {subscriptionsPlan.length > 0 ? (
          <>
            <SectionComponent styles={{marginTop: 50}}>
              {subscriptionsPlan.map(item => renderSubscriptionItem(item))}
            </SectionComponent>
            <SectionComponent>
              <ButtonComponent
                text={isWellCome ? 'Try free and subscribe' : 'Claim Offer'}
                onPress={() => setIsVisibleModalRegister(true)}
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
                  onPress={() =>
                    Linking.openURL('https://tinga.ca/terms.html')
                  }>
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
        }}
        permiumItem={permiumItem}
        onSubcription={isFalseTransaction =>
          handleSetSubscriptionDate(isFalseTransaction)
        }
      />
    </Modal>
  );
};

export default SubscriptionModal;
