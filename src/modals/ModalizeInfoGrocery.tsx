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
  onClose: () => void;
}

const ModalizeInfoGrocery = (props: Props) => {
  const {visible, onClose} = props;

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

  const infoAllergy = (
    <>
      <TitleComponent text="Allergens/Restrictions" size={22} />
      <View style={{marginVertical: 12}}>
        <TextComponent text="The values stated are approximate and may not be fully representational of this products vitamins, nutrients, and ingredients." />
      </View>
      <View style={{marginVertical: 12}}>
        <TextComponent text="Always double check allergen claims and ingredient lists on packaged food products to ensure they align with your specific dietary needs and allergies. " />
      </View>
      <View style={{marginVertical: 12}}>
        <TextComponent text="Manufacturers may change formulations or cross-contamination risks, so exercise due diligence before purchase. " />
      </View>
      <TitleComponent text="Pricing" size={22} />
      <View style={{marginVertical: 12}}>
        <TextComponent text="Just a friendly reminder, pricing is subject to change and is at the sole discretion of the retailer.  These prices are merely estimates and not actual pricing.  Your total estimated price may not accurately reflect WalMart pricing." />
      </View>
    </>
  );

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

          {infoAllergy}
        </View>
      </Modalize>
    </Portal>
  );
};

export default ModalizeInfoGrocery;
