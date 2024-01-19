import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Button,
  CardContent,
  ChartPieItem,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {Scoredetails} from '../../../Models/Score';
import {fontFamilys} from '../../../constants/fontFamily';
import {useSelector} from 'react-redux';
import {authSelector} from '../../../redux/reducers/authReducer';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {ModalInfoScore} from '../../../modals';
import {ProductDetail} from '../../../Models/Product';
import {groceriesSelector} from '../../../redux/reducers/groceryReducer';
interface Props {
  type?: 'circle' | 'card';
  size?: number;
}
const CardScore = (props: Props) => {
  const {type, size} = props;

  const [isVisibleModalInfoScore, setIsVisibleModalInfoScore] = useState(false);
  const navigation: any = useNavigation();
  const auth = useSelector(authSelector);
  const groceryList: ProductDetail[] = useSelector(groceriesSelector);

  const renderListScore = () => {
    const total = groceryList.reduce((a, b) => (a + b.qty ? b.qty : 1), 0);
    const itemGood = groceryList.filter(
      element => element.thumb_type === 'Good',
    );
    const itemNormal = groceryList.filter(
      element => element.thumb_type === 'Normal',
    );
    const itemBad = groceryList.filter(element => element.thumb_type === 'Bad');

    const totalGood = itemGood.reduce((a, b) => (a + b.qty ? b.qty : 1), 0);
    const totalNormal = itemNormal.reduce((a, b) => (a + b.qty ? b.qty : 1), 0);
    const totalBad = itemBad.reduce((a, b) => (a + b.qty ? b.qty : 1), 0);
    return groceryList && groceryList.length > 0 ? (
      <View>
        <RowComponent>
          <ChartPieItem
            total={`${
              Math.floor((totalGood / total) * 100) +
              Math.floor(((totalNormal / total) * 100) / 2)
            }`}
            size={74}
            fontSize={28}
            data={{
              values: [
                (totalGood / total) * 100,
                (totalNormal / total) * 100,
                (totalBad / total) * 100,
              ],
            }}
            radius={0.9}
          />
          <View
            style={{
              flex: 1,
              paddingLeft: 34,
              minHeight: 100,
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
              <TitleComponent
                text={` ${((totalGood / total) * 100).toFixed(0)}%`}
                size={12}
                flex={0}
              />
              <TextComponent
                text={` (${totalGood}) Great Choices`}
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
              <TitleComponent
                text={` ${((totalNormal / total) * 100).toFixed(0)}%`}
                size={12}
                flex={0}
              />
              <TextComponent
                text={` (${totalNormal}) Good`}
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
              <TitleComponent
                text={` ${((totalBad / total) * 100).toFixed(0)}%`}
                size={12}
                flex={0}
              />
              <TextComponent
                text={` (${totalBad}) Limit`}
                size={12}
                font={fontFamilys.regular}
              />
            </RowComponent>
          </View>
        </RowComponent>
        {auth.is_premium === 0 && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              flex: 0,
              backgroundColor: appColors.white,
              opacity: 0.92,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
            }}>
            <View
              style={{
                width: 24,
                height: 24,
                backgroundColor: appColors.primary,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 12,
              }}>
              <Fontisto name="locked" size={14} color={appColors.white} />
            </View>

            <TextComponent
              text="Upgrade to Premium "
              font={fontFamilys.bold}
              styles={{textDecorationLine: 'underline'}}
              flex={0}
            />
            <TextComponent
              text="for full food ratings"
              font={fontFamilys.bold}
              flex={0}
            />
          </View>
        )}
      </View>
    ) : (
      <></>
    );
  };

  const renderScoreCircle = () => {
    const total = groceryList.reduce((a, b) => (a + b.qty ? b.qty : 1), 0);
    const itemGood = groceryList.filter(
      element => element.thumb_type === 'Good',
    );
    const itemNormal = groceryList.filter(
      element => element.thumb_type === 'Normal',
    );
    const itemBad = groceryList.filter(element => element.thumb_type === 'Bad');

    const totalGood = itemGood.reduce((a, b) => (a + b.qty ? b.qty : 1), 0);
    const totalNormal = itemNormal.reduce((a, b) => (a + b.qty ? b.qty : 1), 0);
    const totalBad = itemBad.reduce((a, b) => (a + b.qty ? b.qty : 1), 0);

    return groceryList && groceryList.length > 0 && total ? (
      <View>
        <ChartPieItem
          total={`${
            Math.floor((totalGood / total) * 100) +
            Math.floor(((totalNormal / total) * 100) / 2)
          }`}
          size={size ?? 24}
          fontSize={size ? size - 14 : 14}
          data={{
            values: [
              (totalGood / total) * 100,
              (totalNormal / total) * 100,
              (totalBad / total) * 100,
            ],
          }}
          radius={0.9}
        />
      </View>
    ) : (
      <></>
    );
  };

  return type || type === 'circle' ? (
    renderScoreCircle()
  ) : (
    <>
      <SectionComponent>
        <CardContent
          isShadow
          color={appColors.white}
          styles={{padding: 12, marginVertical: 8, marginBottom: 0}}>
          <RowComponent>
            <RowComponent justify="flex-start" styles={{flex: 1}}>
              <TitleComponent text="List Score" flex={0} size={18} />
              <SpaceComponent width={4} />
              <Button
                icon={
                  <AntDesign
                    name="infocirlceo"
                    size={14}
                    color={appColors.gray}
                  />
                }
                onPress={() => setIsVisibleModalInfoScore(true)}
              />
            </RowComponent>
            <Button
              text="Improve Score"
              textSize={14}
              textColor={appColors.primary}
              onPress={() => navigation.navigate('ImproveScore')}
            />
          </RowComponent>
          <SpaceComponent height={12} />
          {renderListScore()}
        </CardContent>
      </SectionComponent>
      <ModalInfoScore
        visible={isVisibleModalInfoScore}
        onClose={() => setIsVisibleModalInfoScore(false)}
      />
    </>
  );
};

export default CardScore;
