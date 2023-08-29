import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Button,
  ButtonComponent,
  ProductItemComponent,
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
import {
  AddSquare,
  ArrowDown2,
  Heart,
  InfoCircle,
  Location,
  MinusSquare,
} from 'iconsax-react-native';
import {global} from '../styles/global';
import {fontFamilys} from '../constants/fontFamily';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModalFoodScoreInfo from './ModalFoodScoreInfo';

interface Props {
  visible: boolean;
  onClose: () => void;
  product: Product;
}

const ModalProduct = (props: Props) => {
  const {visible, onClose, product} = props;
  const [isLike, setIsLike] = useState(false);
  const [count, setCount] = useState(product.count ?? 1);
  const [isShowModalFoodScoreInfo, setIsShowModalFoodScoreInfo] =
    useState(false);

  useEffect(() => {
    visible && modalRef.current?.open();
  }, [visible]);

  const modalRef = useRef<Modalize>();

  const handleCloseModal = () => {
    modalRef.current?.close();
  };

  const categories = ['Gluten Free', 'Vegan', 'Organic'];

  const productIngredients = [
    {
      title: 'Sugar',
      desscription: '0',
      unit: 'g',
    },
    {
      title: 'Sat. Fat',
      desscription: '3',
      unit: 'g',
    },
    {
      title: 'Sodium',
      desscription: '160',
      unit: 'mg',
    },
    {
      title: 'Fibre',
      desscription: '3',
      unit: 'g',
    },
    {
      title: 'Fibre',
      desscription: '0',
      unit: 'g',
    },
  ];

  const renderProductIngredient = (item: any) => (
    <View
      style={{
        borderWidth: 1,
        borderColor: '#dbdbdb',
        marginBottom: 16,
        marginRight: 6,
        width: 56,
        height: 56,
        borderRadius: 100,
        backgroundColor: appColors.white,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <RowComponent styles={{alignItems: 'flex-end'}}>
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: appColors.success1,
            marginRight: 2,
            marginBottom: 2,
          }}
        />
        <Text
          style={[
            global.text,
            {flex: 0, lineHeight: 16, fontFamily: fontFamilys.bold},
          ]}>
          {item.desscription}
          <Text style={{fontSize: 8}}>{item.unit}</Text>
        </Text>
      </RowComponent>

      <TextComponent
        text={item.title}
        flex={0}
        size={10}
        color={appColors.gray}
      />
    </View>
  );

  const renderCategory = (item: string, index: number) => (
    <TouchableOpacity
      style={[
        global.shadow,
        {
          backgroundColor: appColors.white,
          paddingHorizontal: 16,
          paddingVertical: 8,
          margin: 8,
          borderRadius: 100,
          elevation: 4,
        },
      ]}
      key={`cat${index}`}>
      <TextComponent text={item} flex={0} size={14} color={appColors.primary} />
    </TouchableOpacity>
  );

  return (
    <Portal>
      <Modalize
        onClose={onClose}
        ref={modalRef}
        adjustToContentHeight
        handleStyle={{backgroundColor: 'transparent'}}>
        <View style={{backgroundColor: appColors.bgColor}}>
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
              <RowComponent
                justify="space-between"
                styles={{padding: 16, paddingTop: 20}}>
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
            <SectionComponent styles={{marginTop: 20}}>
              <RowComponent styles={{alignItems: 'flex-start'}}>
                <TitleComponent text={product.title} size={20} height={20} />
                <TextComponent text={`$ ${product.price}`} flex={0} size={16} />
              </RowComponent>
            </SectionComponent>
            <FlatList
              style={{paddingHorizontal: 16}}
              ListHeaderComponent={
                <>
                  <View
                    style={{
                      width: 56,
                      height: 56,
                      backgroundColor: '#E6EECC',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 100,
                      marginRight: 6,
                    }}>
                    <TextComponent text="👍" size={20} flex={0} />
                  </View>
                  <Button
                    styles={{
                      position: 'absolute',
                      top: 0,
                      right: 2,
                    }}
                    onPress={() => setIsShowModalFoodScoreInfo(true)}
                    icon={
                      <MaterialIcons name="info" size={20} color={'#9F9F9F'} />
                    }
                  />
                </>
              }
              data={productIngredients}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => renderProductIngredient(item)}
            />
            <FlatList
              style={{paddingHorizontal: 8, paddingBottom: 12}}
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => renderCategory(item, index)}
            />

            <SectionComponent>
              <RowComponent
                styles={{
                  alignItems: 'flex-start',
                  paddingTop: 12,
                }}>
                <Image
                  source={require('../assets/images/TingaLogo.png')}
                  style={{
                    width: 82,
                    height: 26,
                    resizeMode: 'contain',
                  }}
                />
                <TitleComponent
                  text="swaps"
                  color={appColors.primary}
                  size={20}
                  height={19}
                />

                <Button
                  onPress={() => {}}
                  text="View All"
                  fontStyles={{fontSize: 14, color: appColors.primary}}
                />
              </RowComponent>

              <RowComponent justify="space-between">
                {Array.from({length: 2}).map((item, index) => (
                  <ProductItemComponent item={item} key={`item.id${index}`} />
                ))}
              </RowComponent>
            </SectionComponent>

            <SectionComponent>
              <RowComponent>
                <RowComponent styles={{flex: 1}} justify="flex-start">
                  <TitleComponent
                    text="Product Description"
                    size={20}
                    flex={0}
                  />
                  <SpaceComponent width={8} />
                  <Button
                    icon={
                      <AntDesign
                        name="infocirlceo"
                        size={18}
                        color={appColors.gray}
                      />
                    }
                    onPress={() => {}}
                  />
                </RowComponent>
                <Button
                  icon={<ArrowDown2 size={22} color={appColors.text2} />}
                  onPress={() => {}}
                />
              </RowComponent>
            </SectionComponent>
            <SectionComponent>
              <RowComponent>
                <RowComponent styles={{flex: 1}} justify="flex-start">
                  <TitleComponent text="Ingredients" size={20} flex={0} />
                  <SpaceComponent width={8} />
                  <Button
                    icon={
                      <AntDesign
                        name="infocirlceo"
                        size={18}
                        color={appColors.gray}
                      />
                    }
                    onPress={() => {}}
                  />
                </RowComponent>
                <Button
                  icon={<ArrowDown2 size={22} color={appColors.text2} />}
                  onPress={() => {}}
                />
              </RowComponent>
            </SectionComponent>
          </View>
        </View>
        <View
          style={{
            backgroundColor: appColors.white,
            padding: 16,
          }}>
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
        </View>
      </Modalize>
      <ModalFoodScoreInfo
        visible={isShowModalFoodScoreInfo}
        onClose={() => setIsShowModalFoodScoreInfo(false)}
      />
    </Portal>
  );
};

export default ModalProduct;
