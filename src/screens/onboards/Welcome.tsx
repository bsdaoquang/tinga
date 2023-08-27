import React, {useState} from 'react';
import {StatusBar, View} from 'react-native';
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Button,
  ButtonComponent,
  Container,
  RowComponent,
  SectionComponent,
  StatusBarComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import Welcome1 from './components/Welcome1';
import Welcome2 from './components/Welcome2';
import Welcome3 from './components/Welcome3';
import Welcome4 from './components/Welcome4';

const Welcome = ({navigation}: any) => {
  const [indexScreen, setIndexScreen] = useState(0);
  return (
    <Container top={48} backgroundColor={appColors.text}>
      <View style={{paddingVertical: 20, flex: 1}}>
        <RowComponent justify="flex-end" styles={{paddingHorizontal: 16}}>
          <Button
            text="Skip"
            onPress={() => navigation.navigate('LoginScreen')}
            textColor={appColors.white6}
            textSize={16}
          />
        </RowComponent>
        <View style={{flex: 1}}>
          <Swiper
            index={indexScreen}
            loop={false}
            activeDotColor="white"
            activeDotStyle={{
              width: 32,
              marginBottom: -32,
            }}
            onIndexChanged={i => console.log(i)}
            dotStyle={{marginBottom: -32}}
            dotColor={appColors.white4}>
            <Welcome1 />
            <Welcome2 />
            <Welcome3 />
            <Welcome4 />
          </Swiper>
        </View>
        <SectionComponent styles={{marginVertical: 20}}>
          <ButtonComponent
            text={indexScreen >= 3 ? 'Let’s get started' : 'Next'}
            onPress={() =>
              indexScreen === 3
                ? navigation.navigate('LoginScreen')
                : setIndexScreen(indexScreen + 1)
            }
            fontStyles={{fontSize: 16, textAlign: 'center'}}
            color={appColors.success1}
            textColor={appColors.text}
            height={56}
            icon={
              <Ionicons
                name="arrow-forward-outline"
                color={appColors.text}
                size={20}
              />
            }
            iconRight
          />
        </SectionComponent>
      </View>
    </Container>
  );
};

export default Welcome;
