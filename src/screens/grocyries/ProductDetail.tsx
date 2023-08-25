import {View, Text, Image} from 'react-native';
import React from 'react';
import {
  Button,
  CardContent,
  ChartPieItem,
  Container,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fontFamilys} from '../../constants/fontFamily';
import {Product} from '../../Models/Product';
import {appSize} from '../../constants/appSize';
import {Add, Location, Star1} from 'iconsax-react-native';

const ProductDetail = ({navigation, route}: any) => {
  const {products}: {products: Product[]} = route.params;

  const renderProductCard = (item: Product) => (
    <CardContent
      isShadow
      color={appColors.white}
      styles={{padding: 0, width: (appSize.width - 48) / 2, marginBottom: 12}}
      key={`${item.id}`}>
      <Image
        source={{
          uri: item.imageUrl,
        }}
        style={{
          width: '100%',
          height: 96,
          resizeMode: 'cover',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      />
      <Button
        styles={{
          width: 28,
          height: 28,
          backgroundColor: '#41393EA3',
          borderRadius: 14,
          position: 'absolute',
          top: 10,
          right: 10,
        }}
        icon={<Add size={24} color={appColors.white} />}
        onPress={() => {}}
      />
      <View style={{padding: 10}}>
        <TextComponent text={`$ ${item.price.toFixed(2)}`} size={12} />
        <TextComponent text={item.title} size={12} line={1} />
        <SpaceComponent height={8} />
        <RowComponent justify="flex-start">
          <Location size={14} color={appColors.gray} />
          <TextComponent
            text={` ${item.mart}`}
            size={12}
            flex={0}
            color={appColors.gray}
          />
          <SpaceComponent width={12} />
          <Star1 size={14} color={appColors.gray} />
          <TextComponent
            text={` ${item.rating}`}
            size={12}
            flex={0}
            color={appColors.gray}
          />
        </RowComponent>
      </View>
    </CardContent>
  );

  return (
    <Container back isScroll>
      <SectionComponent>
        <RowComponent justify="flex-start">
          <TitleComponent
            text="Your List Score"
            styles={{textTransform: 'capitalize'}}
            size={32}
            height={32}
          />
          <SpaceComponent width={8} />
          <Button
            icon={
              <AntDesign name="infocirlceo" size={20} color={appColors.gray} />
            }
            onPress={() => {}}
          />
        </RowComponent>
        <CardContent
          isShadow
          color={appColors.white}
          styles={{padding: 12, marginVertical: 8, marginBottom: 0}}>
          <SpaceComponent height={12} />
          <RowComponent>
            <ChartPieItem
              total={67}
              size={74}
              fontSize={28}
              data={{values: [70, 20, 10]}}
              radius={0.9}
            />
            <View
              style={{
                flex: 1,
                paddingLeft: 34,
              }}>
              <RowComponent>
                <View
                  style={{
                    backgroundColor: '#E6EECC',
                    padding: 4,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TextComponent text="👍" size={12} flex={0} />
                </View>
                <TitleComponent text={` 50%`} size={12} flex={0} />
                <TextComponent
                  text={` (14) Great Choices`}
                  size={12}
                  font={fontFamilys.regular}
                />
              </RowComponent>
              <SpaceComponent height={6} />
              <RowComponent>
                <View
                  style={{
                    backgroundColor: '#FFECBF',
                    padding: 4,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TextComponent text="👌" size={12} flex={0} />
                </View>
                <TitleComponent text={` 20%`} size={12} flex={0} />
                <TextComponent
                  text={` (12) Good`}
                  size={12}
                  font={fontFamilys.regular}
                />
              </RowComponent>

              <SpaceComponent height={6} />
              <RowComponent>
                <View
                  style={{
                    backgroundColor: '#FFDBDB',
                    padding: 4,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: 'rotate(180deg)',
                  }}>
                  <TextComponent text="👍" size={12} flex={0} styles={{}} />
                </View>
                <TitleComponent text={` 10%`} size={12} flex={0} />
                <TextComponent
                  text={` (4) Limit`}
                  size={12}
                  font={fontFamilys.regular}
                />
              </RowComponent>
            </View>
          </RowComponent>
        </CardContent>
        <SpaceComponent height={20} />
        <TitleComponent
          text="Improve Your Score"
          styles={{textTransform: 'capitalize'}}
          size={20}
        />
        <RowComponent
          styles={{
            alignItems: 'flex-start',
            paddingTop: 12,
          }}>
          <Image
            source={require('../../assets/images/TingaLogo.png')}
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
        {products && products.length > 0 && (
          <RowComponent justify="space-between">
            {products.map(item => renderProductCard(item))}
          </RowComponent>
        )}
      </SectionComponent>
    </Container>
  );
};

export default ProductDetail;
