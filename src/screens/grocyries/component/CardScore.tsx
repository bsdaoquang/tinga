import {View, Text} from 'react-native';
import React, {useState} from 'react';
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

interface Props {
  isHide?: boolean;
  listScore: Scoredetails;
}

const CardScore = (props: Props) => {
  const {isHide, listScore} = props;

  const [isVisibleModalInfoScore, setIsVisibleModalInfoScore] = useState(false);
  const navigation: any = useNavigation();
  const auth = useSelector(authSelector);

  const renderListScore = (item: Scoredetails) => {
    const total =
      item.green_quantity * 1 +
      item.red_quantity * 1 +
      item.orange_quantity * 1;

    return (
      <View>
        <RowComponent>
          <ChartPieItem
            total={`${item.list_score}`}
            size={74}
            fontSize={28}
            data={{
              values: [item.green_line, item.orange_line, item.red_line],
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
                text={` ${((item.green_quantity / total) * 100).toFixed(0)}%`}
                size={12}
                flex={0}
              />
              <TextComponent
                text={` (${item.green_quantity}) Great Choices`}
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
                text={` ${((item.orange_quantity / total) * 100).toFixed(0)}%`}
                size={12}
                flex={0}
              />
              <TextComponent
                text={` (${item.orange_quantity}) Good`}
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
                text={` ${((item.red_quantity / total) * 100).toFixed(0)}%`}
                size={12}
                flex={0}
              />
              <TextComponent
                text={` (${item.red_quantity}) Limit`}
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
    );
  };
  return (
    <>
      <SectionComponent>
        {!isHide && (
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
            {listScore ? renderListScore(listScore) : <></>}
          </CardContent>
        )}
      </SectionComponent>
      <ModalInfoScore
        visible={isVisibleModalInfoScore}
        onClose={() => setIsVisibleModalInfoScore(false)}
      />
    </>
  );
};

export default CardScore;
