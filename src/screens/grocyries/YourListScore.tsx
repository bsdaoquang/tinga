import {View, Text, Image} from 'react-native';
import React from 'react';
import {
  Button,
  CardContent,
  ChartPieItem,
  Container,
  ProductItemComponent,
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
import ProductItem from './component/ProductItem';

const YourListScore = ({navigation, route}: any) => {
  const {products}: {products: Product[]} = route.params;

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
            {products.map(item => (
              <ProductItemComponent item={item} key={item.id} />
            ))}
          </RowComponent>
        )}
      </SectionComponent>
    </Container>
  );
};

export default YourListScore;
