import {ArrowRight} from 'iconsax-react-native';
import React, {useState} from 'react';
import {
  Button,
  ButtonComponent,
  Container,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import Welcome1 from './components/Welcome1';
import Welcome2 from './components/Welcome2';
import Welcome3 from './components/Welcome3';
import Welcome4 from './components/Welcome4';
import {View} from 'react-native';

const Welcome = () => {
  const [indexScreen, setIndexScreen] = useState(0);

  return (
    <Container backgroundColor={appColors.text} barStyle="light-content">
      <RowComponent justify="flex-end" styles={{paddingHorizontal: 16}}>
        <Button
          text="Skip"
          onPress={() => {}}
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
          dotStyle={{marginBottom: -32}}
          dotColor={appColors.white4}>
          <Welcome1 />
          <Welcome2 />
          <Welcome3 />
          <Welcome4 />
        </Swiper>
      </View>
      <SectionComponent styles={{marginBottom: 30}}>
        <ButtonComponent
          text="Next"
          onPress={() =>
            indexScreen === 4
              ? console.log('enf')
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
    </Container>
  );
};

export default Welcome;
