import React, {useEffect, useRef} from 'react';
import {Text, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RowComponent, TextComponent, TitleComponent} from '../components';
import {appColors} from '../constants/appColors';
import {global} from '../styles/global';

interface Props {
  visible: boolean;
  type: 'diet' | 'allergy';
  onClose: () => void;
}

const ModalizeInfo = (props: Props) => {
  const {visible, onClose, type} = props;

  useEffect(() => {
    if (visible) {
      modalRef.current?.open();
    } else {
      modalRef.current?.close();
    }
  }, [visible]);

  const modalRef = useRef<Modalize>();

  const handleCloseModal = () => {
    modalRef.current?.close();
  };

  const infeDiet = (
    <>
      <TitleComponent text="Diet Preferences" size={22} />

      <View style={{marginBottom: 12, marginTop: 12}}>
        <Text style={[global.text]}>
          <Text style={{fontWeight: 'bold'}}>Vegan: </Text>A vegan follows a
          plant-based diet that avoids any animal-derived products, including
          meat, dairy, eggs, honey, and other animal by-products.
        </Text>
      </View>
      <View style={{marginBottom: 12, marginTop: 12}}>
        <Text style={[global.text]}>
          <Text style={{fontWeight: 'bold'}}>Vegetarian: </Text>A vegetarian
          abstains from consuming meat but may include other animal-derived
          products, such as dairy, eggs, and honey.
        </Text>
      </View>
      <View style={{marginBottom: 12, marginTop: 12}}>
        <Text style={[global.text]}>
          <Text style={{fontWeight: 'bold'}}>Classically Balanced: </Text>Also
          known as a well-balanced diet, is a dietary pattern that provides the
          body with a wide range of essential nutrients in appropriate
          proportions to support overall health and well-being. It typically
          includes foods from fruits and vegetables, animal and plant-based
          proteins, whole grains, dairy or dairy alternatives, healthy fats,
          limited sugar, limited saturated/trans fats, and limited sodium.
        </Text>
      </View>
    </>
  );
  const infoAllergy = (
    <>
      <TitleComponent text="Allergens/Restrictions" size={22} />
      <View style={{marginVertical: 12}}>
        <TextComponent text="The values stated are approximate and may not be fully representational of this products vitamins, nutrients, and ingredients. " />
      </View>
      <View style={{marginVertical: 12}}>
        <TextComponent text="Always double check allergen claims and ingredient lists on packaged food products to ensure they align with your specific dietary needs and allergies. " />
      </View>
      <View style={{marginVertical: 12}}>
        <TextComponent text="Manufacturers may change formulations or cross-contamination risks, so exercise due diligence before purchase. " />
      </View>
    </>
  );

  return (
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

        {type === 'diet' ? infeDiet : infoAllergy}
      </View>
    </Modalize>
  );
};

export default ModalizeInfo;
