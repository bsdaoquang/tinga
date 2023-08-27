import {
  View,
  Text,
  Image,
  ImageBackground,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appSize} from '../../constants/appSize';
import {
  Button,
  ButtonComponent,
  CardContent,
  Container,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {appColors} from '../../constants/appColors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fontFamilys} from '../../constants/fontFamily';

const ReferralScreen = ({navigation}: any) => {
  const [rewards, setRewards] = useState<any>();
  const [isCoping, setIsCoping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckMail, setIsCheckMail] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setRewards({
        title: '$10 Gift Card',
        description:
          'Congratulations! You’ve earned a gift card to spend at a store of your choice.',
        isRedeem: false,
      });

      setIsLoading(false);
    }, 1500);
  }, []);

  const handleCheckMail = () => {
    setIsCheckMail(true);

    setTimeout(() => {
      setRewards({...rewards, isRedeem: true});
      setIsCheckMail(false);
    }, 2000);
  };

  const renderReward = () => (
    <CardContent
      styles={{marginVertical: 12}}
      isShadow
      color={rewards.isRedeem ? appColors.gray : appColors.primary}>
      <RowComponent>
        <Ionicons name="gift-sharp" color={appColors.white} size={32} />
        <SpaceComponent width={8} />
        <TitleComponent
          text={rewards.title}
          color={appColors.white}
          size={32}
          flex={0}
        />
      </RowComponent>
      <SpaceComponent height={8} />
      <TextComponent
        text={rewards.description}
        color={appColors.white}
        flex={0}
        styles={{textAlign: 'center'}}
      />

      <SpaceComponent height={12} />
      {isCheckMail ? (
        <TextComponent
          text={`To redeem, check your emails\n(including your spam folder)`}
          size={16}
          font={fontFamilys.bold}
          color={appColors.white}
          styles={{
            textAlign: 'center',
            paddingTop: 12,
            borderTopColor: appColors.text,
            borderTopWidth: 1,
          }}
        />
      ) : (
        <ButtonComponent
          disable={rewards.isRedeem}
          disableTextColor={appColors.white}
          disableColor="#5e5e5e"
          onPress={handleCheckMail}
          text={rewards.isRedeem ? 'Redeemed' : 'Redeem'}
        />
      )}
    </CardContent>
  );

  return (
    <ScrollView style={{flex: 1, backgroundColor: appColors.white}}>
      <ImageBackground
        source={require('../../assets/images/ReferralImage.png')}
        style={{
          height: 264,
        }}
        imageStyle={{
          width: appSize.width,
          height: 264,
          margin: 0,
          resizeMode: 'cover',
        }}>
        <RowComponent
          styles={{paddingTop: 42, paddingHorizontal: 16}}
          justify="flex-start">
          <Button
            icon={
              <AntDesign name="arrowleft" size={24} color={appColors.white} />
            }
            onPress={() => navigation.goBack()}
          />
        </RowComponent>
      </ImageBackground>
      <View
        style={{
          flex: 1,
          backgroundColor: appColors.white,
          marginTop: -20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingVertical: 16,
        }}>
        <SectionComponent>
          <TitleComponent text="Refer Friends & Get $10" size={28} />

          <TextComponent
            styles={{marginVertical: 12}}
            text="Invite 3 of your friends and family to join you on Tinga. When they sign up for a free trial, you get a $10 gift card to spend at a store of your choice!"
            size={14}
          />

          <Button
            text="Ontario Only. Terms Apply"
            onPress={() => {}}
            fontStyles={{flex: 1}}
          />
        </SectionComponent>
        <SectionComponent>
          <ButtonComponent text="Share with friends" onPress={() => {}} />
          <SpaceComponent height={10} />
          <ButtonComponent
            text={isCoping ? 'Copied!' : 'Copy Link'}
            icon={
              isCoping ? (
                <MaterialCommunityIcons
                  name="check-bold"
                  color={appColors.success1}
                  size={18}
                />
              ) : null
            }
            outline
            onPress={() => {
              setIsCoping(true);

              setTimeout(() => {
                setIsCoping(false);
              }, 1500);
            }}
          />
        </SectionComponent>
        <View
          style={{
            height: 1,
            margin: 16,
            backgroundColor: appColors.gray1,
          }}
        />
        <SectionComponent>
          <TitleComponent text="Your Rewards" size={20} />
          {isLoading ? (
            <ActivityIndicator />
          ) : rewards ? (
            renderReward()
          ) : (
            <RowComponent>
              <TextComponent
                flex={0}
                color={'#877D83'}
                styles={{textAlign: 'center', marginTop: '20%'}}
                text="Looks like you don’t have any rewards yet! Keep inviting friends and check back later."
              />
            </RowComponent>
          )}
        </SectionComponent>
      </View>
    </ScrollView>
  );
};

export default ReferralScreen;
