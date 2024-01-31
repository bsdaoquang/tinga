import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {ImageBackground, Modal, TouchableOpacity, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {Quote} from '../Models/Recipe';
import handleMealApi from '../apis/mealplannerAPI';
import {
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
import {global} from '../styles/global';
import CountDownComponent from '../components/CountDownComponent';

interface Props {
  visible: boolean;
}

const ModalWatingGenerateRecipe = (props: Props) => {
  const {visible} = props;

  const [quotes, setquotes] = useState<Quote[]>([]);

  useEffect(() => {
    if (visible) {
      getlistofFactsQuotes();
    }
  }, [visible]);

  const getlistofFactsQuotes = async () => {
    const dietType = await AsyncStorage.getItem(
      appInfos.localDataName.dietType,
    );

    try {
      const api = `listofFactsQuotes?diet_type=${dietType ? dietType : 1}`;
      const res: any = await handleMealApi.handleMealPlanner(api);

      res && res.length > 0 && setquotes(res);
    } catch (error) {
      console.log(`error ${error}`);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      style={{flex: 1}}
      statusBarTranslucent>
      <ImageBackground
        source={require('../assets/images/bg-recipes.png')}
        imageStyle={{
          flex: 1,
        }}
        style={{flex: 1}}>
        <CountDownComponent visible={visible} />
        <View style={{paddingVertical: 20, paddingBottom: 40, flex: 1}}>
          <Swiper
            autoplay
            autoplayTimeout={8}
            showsPagination={false}
            scrollEnabled={false}
            loop
            key={quotes.length}
            horizontal
            autoplayDirection>
            {quotes.map((item, index) => (
              <SectionComponent styles={{flex: 1}} key={`quote${index}`}>
                <View
                  style={{
                    flex: 1,

                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TitleComponent
                    text={item.title}
                    flex={0}
                    size={30}
                    color={appColors.primary}
                    styles={{textAlign: 'center'}}
                  />
                </View>
                <View
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                  }}>
                  <TextComponent
                    text={item.description}
                    flex={0}
                    size={20}
                    color={appColors.white}
                    font={fontFamilys.bold}
                    styles={{textAlign: 'center'}}
                  />
                </View>
              </SectionComponent>
            ))}
          </Swiper>
          <RowComponent>
            <TouchableOpacity
              disabled={true}
              style={[
                global.rowCenter,
                {
                  width: '80%',
                  backgroundColor: appColors.success1,
                  borderRadius: 12,
                  paddingVertical: visible ? 0 : 15,
                },
              ]}>
              <LottieView
                source={require('../assets/animation/dice.json')}
                style={{
                  height: 50,
                  width: 50,
                  padding: 0,
                }}
                autoPlay
                loop={true}
              />

              <SpaceComponent width={8} />
              <TitleComponent height={14} text="Generating Recipes" flex={0} />
            </TouchableOpacity>
          </RowComponent>
        </View>
      </ImageBackground>
    </Modal>
  );
};

export default ModalWatingGenerateRecipe;
