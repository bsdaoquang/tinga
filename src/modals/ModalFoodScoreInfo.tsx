import React, {useEffect, useRef} from 'react';
import {Modalize} from 'react-native-modalize';
import {
  RowComponent,
  SectionComponent,
  TextComponent,
  TitleComponent,
} from '../components';
import {Portal} from 'react-native-portalize';
import {StyleSheet, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {appColors} from '../constants/appColors';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const ModalFoodScoreInfo = (props: Props) => {
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
            paddingTop: 20,
            paddingBottom: 40,
          }}>
          <SectionComponent>
            <RowComponent justify="flex-end" onPress={handleCloseModal}>
              <AntDesign name="close" color={appColors.gray} size={20} />
            </RowComponent>
          </SectionComponent>

          <SectionComponent>
            <TitleComponent text="How is food scored?" size={20} />
          </SectionComponent>
          <SectionComponent>
            <TextComponent text="Tinga scores your grocery items and tags them with one of three labels to help you make better choices:" />
          </SectionComponent>
          <SectionComponent>
            <RowComponent>
              <View style={[styles.scoreContainer]}>
                <TextComponent text="👍" flex={0} />
              </View>
              <TitleComponent text="Great (green)" />
            </RowComponent>
            <RowComponent>
              <View
                style={[styles.scoreContainer, {backgroundColor: '#FFECBF'}]}>
                <TextComponent text="👌" flex={0} />
              </View>
              <TitleComponent text="Good (yellow)" />
            </RowComponent>
            <RowComponent>
              <View
                style={[
                  styles.scoreContainer,
                  {
                    backgroundColor: '#FFDBDB',
                    transform: 'rotate(180deg)',
                  },
                ]}>
                <TextComponent text="👍" flex={0} />
              </View>
              <TitleComponent text="Limit (red)" />
            </RowComponent>
          </SectionComponent>
          <SectionComponent>
            <TextComponent text="This scoring method is based on two criteria:" />
          </SectionComponent>
          <SectionComponent>
            <TitleComponent text="1. Level of processing" />
            <TextComponent text="Fresh whole foods start ‘green’ and can move to ‘yellow’ or ‘red’ based on added nutrients like sodium, sugar, and saturated fats. Processed foods start out ‘yellow’, while highly processed foods are often ranked ‘red’." />
          </SectionComponent>
          <SectionComponent>
            <TitleComponent text="2. Nutritional value" />
            <TextComponent text="Positive nutrients like fibre and protein increase a food item's score, while negative nutrients like sodium, saturated fats, and added sugars decrease its score." />
          </SectionComponent>
        </View>
      </Modalize>
    </Portal>
  );
};

export default ModalFoodScoreInfo;

const styles = StyleSheet.create({
  scoreContainer: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: '#E6EECC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginVertical: 8,
  },
});
