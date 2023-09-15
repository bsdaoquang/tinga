import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, Modal, ScrollView, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
import {fontFamilys} from '../constants/fontFamily';
import {global} from '../styles/global';
import {add0toNumber} from '../utils/add0toNumber';
import {showToast} from '../utils/showToast';
import LoadingModal from './LoadingModal';
import {useDispatch, useSelector} from 'react-redux';
import {addAuth, authSelector} from '../redux/reducers/authReducer';
import handleGetData from '../apis/productAPI';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const date = new Date();

const SubscriptionModal = (props: Props) => {
  const {isVisible, onClose} = props;

  const [subscriptionsPlan, setSubscriptionsPlan] = useState<Subscription[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const auth = useSelector(authSelector);
  const dispatch = useDispatch();

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
    } catch (error: any) {
      showToast(error.message);
    }
  };

  const getSubscriptionsPlan = async () => {
    const api = `/plans`;

    try {
      await subscriptionAPI.HandleSubscription(api).then(async (res: any) => {
        setSubscriptionsPlan(res);
        setIsLoading(false);
      });
    } catch (error: any) {
      setIsLoading(false);
      showToast(error.message);
      console.log(error);
      console.log(`Can not get subscription plans ${error}`);
    }
  };

  const descriptions = [
    'Build health-scored grocery lists tailored to your dietary needs',
    'Discover & swap for healthier options',
    'Simplified nutritional information ',
    'Access to a resource library to help you reach your goals',
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
        onPress={handleSetSubscriptionDate}
        color={appColors.text}
        styles={{padding: 0, alignItems: 'center', marginBottom: 16}}>
        <TextComponent
          text="LIMITED-TIME OFFER"
          color={appColors.white}
          font={fontFamilys.semiBold}
          size={12}
          styles={{paddingVertical: 2}}
        />
        <View
          style={{
            flex: 1,
            width: '100%',
            padding: 12,
            marginBottom: 0,
            margin: 0,
            backgroundColor: '#13917B',
            borderRadius: 8,
          }}>
          <RowComponent>
            <TitleComponent text={item.name} color={appColors.white} />
            <TextComponent
              size={12}
              color={appColors.white}
              font={fontFamilys.semiBold}
              text={`${((item.offer_price / item.price) * 100).toFixed(
                0,
              )}% OFF`}
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
          <RowComponent
            onPress={() => {}}
            justify="flex-start"
            styles={{alignItems: 'flex-end'}}>
            <TitleComponent
              text={`$${item.offer_price.toFixed(2)}`}
              flex={0}
              size={20}
              height={22}
              color={appColors.white}
            />
            <TextComponent
              text={` $${item.price.toFixed(2)}`}
              color={appColors.white}
              size={14}
              flex={0}
              styles={{
                textDecorationLine: 'line-through',
              }}
            />
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
        onPress={handleSetSubscriptionDate}
        styles={{
          flex: 1,
          width: '100%',
          padding: 12,
          marginBottom: 0,
          borderWidth: 2,
          borderColor: '#EEF3DC',
        }}
        color={appColors.white}>
        <RowComponent>
          <TitleComponent text={item.name} color={appColors.text} />
          <TextComponent
            size={12}
            color={appColors.text}
            font={fontFamilys.semiBold}
            text={`${((item.offer_price / item.price) * 100).toFixed(0)}% OFF`}
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
        </RowComponent>
        <SpaceComponent height={8} />
        <RowComponent
          onPress={() => {}}
          justify="flex-start"
          styles={{alignItems: 'flex-end'}}>
          <TitleComponent
            text={`$${item.offer_price}`}
            flex={0}
            size={20}
            height={22}
            color={appColors.text}
          />
          <TextComponent
            text={` $${item.price}`}
            color={appColors.text}
            size={14}
            flex={0}
            styles={{
              textDecorationLine: 'line-through',
            }}
          />
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
      }}>
      <ScrollView
        style={[
          {
            flex: 1,
            paddingTop: 48,
          },
        ]}>
        <SectionComponent>
          <RowComponent justify="flex-end">
            <Button
              onPress={onClose}
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
              key={`desc${index}`}>
              <FontAwesome name="check" color={appColors.success1} size={28} />
              <SpaceComponent width={12} />
              <TextComponent text={desc} />
            </RowComponent>
          ))}
        </SectionComponent>
        {subscriptionsPlan.length > 0 ? (
          <>
            <SectionComponent styles={{marginTop: 80}}>
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
            </SectionComponent>
          </>
        ) : (
          <LoadingComponent
            isLoading={isLoading}
            value={subscriptionsPlan.length}
          />
        )}

        {/* <SectionComponent>
          <RowComponent>
            <Button
              text="Restore Purchase"
              fontStyles={{
                fontFamily: fontFamilys.bold,
                color: appColors.primary,
              }}
              textSize={12}
              onPress={() => {}}
            />
            <TextComponent text=" • " flex={0} />
            <Button
              text="Terms & Conditions"
              fontStyles={{
                fontFamily: fontFamilys.bold,
                color: appColors.primary,
              }}
              textSize={12}
              onPress={() => {}}
            />
          </RowComponent>
        </SectionComponent> */}
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
    </Modal>
  );
};

export default SubscriptionModal;
