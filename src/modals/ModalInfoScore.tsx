import React, {useEffect, useRef} from 'react';
import {Modalize} from 'react-native-modalize';
import {
  RowComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../components';
import {Portal} from 'react-native-portalize';
import {Image, ScrollView, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {appColors} from '../constants/appColors';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const ModalInfoScore = (props: Props) => {
  const {visible, onClose} = props;

  useEffect(() => {
    visible && modalRef.current?.open();
  }, [visible]);

  const modalRef = useRef<Modalize>();

  const handleCloseModal = () => {
    modalRef.current?.close();
  };

  return (
    <Portal>
      <Modalize
        onClose={onClose}
        ref={modalRef}
        adjustToContentHeight
        handlePosition="inside">
        <View
          style={{
            padding: 20,
            paddingBottom: 40,
          }}>
          <RowComponent justify="flex-end" onPress={handleCloseModal}>
            <AntDesign name="close" color={appColors.gray} size={22} />
          </RowComponent>
          <ScrollView>
            <TitleComponent size={20} text="What is a list score?" />
            <TextComponent
              size={14}
              text="Your grocery list score is a number between 0 and 100 that gives you insight into the food choices you make when shopping. ‘Green’ food items will boost you score the most, while red items won’t. At Tinga, we recommend aiming for a score between 70-100, the more green (great choices) the better!"
            />
            <Image
              source={require('../assets/images/demoscore.png')}
              style={{
                width: '100%',
                resizeMode: 'contain',
                height: 140,
              }}
            />
            <TextComponent
              size={14}
              text="Changing habits takes time, so be sure to celebrate small wins (even a few points increase!) and lean into Tinga swaps to help improve your score."
            />
            <SpaceComponent height={16} />
            <TitleComponent size={20} text="How is my average calculated?" />
            <TextComponent
              size={14}
              text="Your list score average is calculated from the last 4 lists you created. Each time you create a grocery list using Tinga, your average will update to show your progress and trend over time. "
            />
          </ScrollView>
        </View>
      </Modalize>
    </Portal>
  );
};

export default ModalInfoScore;
