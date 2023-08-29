import React, {useEffect, useRef, useState} from 'react';
import {Image, ImageBackground, ScrollView, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Button,
  ButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../components';
import {appColors} from '../constants/appColors';
import {Product} from '../Models/Product';
import LinearGradient from 'react-native-linear-gradient';
import {HeartBold} from '../assets/svg';
import {AddSquare, Heart, Location, MinusSquare} from 'iconsax-react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  product: Product;
}

const ModalProduct = (props: Props) => {
  const {visible, onClose, product} = props;
  const [isLike, setIsLike] = useState(false);
  const [count, setCount] = useState(product.count ?? 1);

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
        handleStyle={{backgroundColor: 'transparent'}}>
        <ScrollView>
          <ImageBackground
            source={{uri: product.imageUrl}}
            style={{
              width: '100%',
              height: 180,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}
            imageStyle={{
              resizeMode: 'cover',
            }}>
            <LinearGradient
              style={{height: 180, width: '100%'}}
              colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0)']}>
              <RowComponent justify="space-between" styles={{padding: 16}}>
                <Button
                  icon={
                    <AntDesign name="close" color={appColors.white} size={22} />
                  }
                  onPress={handleCloseModal}
                />
                <Button
                  onPress={() => setIsLike(!isLike)}
                  icon={
                    isLike ? (
                      <HeartBold width={24} height={24} />
                    ) : (
                      <Heart variant="Bold" color={appColors.white} size={24} />
                    )
                  }
                />
              </RowComponent>
              <View style={{flex: 1}} />
              <RowComponent justify="space-between" styles={{padding: 16}}>
                <RowComponent
                  styles={{
                    backgroundColor: '#41393E70',
                    flex: 0,
                    borderRadius: 100,
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                  }}>
                  <Location size={14} color={appColors.white} />
                  <SpaceComponent width={4} />
                  <TextComponent
                    text="Walmart"
                    color={appColors.white}
                    flex={0}
                    size={12}
                  />
                </RowComponent>
                <RowComponent
                  styles={{
                    backgroundColor: '#41393E70',
                    flex: 0,
                    borderRadius: 100,
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                  }}>
                  <TextComponent
                    text="1 / 25"
                    color={appColors.white}
                    flex={0}
                    size={12}
                  />
                </RowComponent>
              </RowComponent>
            </LinearGradient>
          </ImageBackground>
          <View style={{flex: 1}}>
            <SectionComponent styles={{marginVertical: 20}}>
              <RowComponent styles={{alignItems: 'flex-start'}}>
                <TitleComponent text={product.title} size={20} height={20} />
                <TextComponent text={`$ ${product.price}`} flex={0} size={16} />
              </RowComponent>
            </SectionComponent>
          </View>
          <SectionComponent>
            <RowComponent>
              <RowComponent
                styles={{
                  flex: 1,
                }}>
                <RowComponent>
                  {count > 1 && (
                    <Button
                      icon={<MinusSquare size={22} color={appColors.text2} />}
                      onPress={() => setCount(count - 1)}
                    />
                  )}

                  <TextComponent
                    styles={{paddingHorizontal: 8}}
                    text={`${count} pcs`}
                    flex={0}
                    size={14}
                    color={appColors.text2}
                  />
                  <Button
                    icon={<AddSquare size={22} color={appColors.text2} />}
                    onPress={() => setCount(count + 1)}
                  />
                </RowComponent>
              </RowComponent>
              <View
                style={{
                  flex: 1,
                }}>
                <ButtonComponent text="Add to List" onPress={() => {}} />
              </View>
            </RowComponent>
          </SectionComponent>
        </ScrollView>
      </Modalize>
    </Portal>
  );
};

export default ModalProduct;
