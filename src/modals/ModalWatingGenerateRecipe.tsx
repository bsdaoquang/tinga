import {
  View,
  Text,
  Modal,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Quote} from '../Models/Recipe';
import handleMealApi from '../apis/mealplannerAPI';
import {global} from '../styles/global';
import {appColors} from '../constants/appColors';
import LottieView from 'lottie-react-native';
import {
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../components';
import Swiper from 'react-native-swiper';
import {fontFamilys} from '../constants/fontFamily';
import handleGetData from '../apis/productAPI';
import {useIsFocused} from '@react-navigation/native';

interface Props {
  visible: boolean;
}

const ModalWatingGenerateRecipe = (props: Props) => {
  const {visible} = props;

  const [quotes, setquotes] = useState<Quote[]>([]);
  const [dietType, setDietType] = useState(0);
  const isFocus = useIsFocused();

  useEffect(() => {
    isFocus && getDiets();
  }, [isFocus]);

  useEffect(() => {
    dietType && getlistofFactsQuotes();
  }, []);

  const getDiets = async () => {
    const api = `/dietpreference`;

    try {
      await handleGetData.handleProduct(api).then((res: any) => {
        if (res) {
          const item = res.find(
            (element: any) => element.is_selected === 'Yes',
          );
          item && setDietType(item.id);
        }
      });
    } catch (error) {
      console.log(`error ${error}`);
    }
  };

  const getlistofFactsQuotes = async () => {
    const api = `listofFactsQuotes?diet_type=${dietType ?? 1}`;

    try {
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
        <View style={{paddingVertical: 20, paddingBottom: 40, flex: 1}}>
          <Swiper
            // style={{flex: 1}}
            autoplay
            showsPagination={false}
            loop
            autoplayTimeout={3}
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
