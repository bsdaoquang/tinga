import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Button,
  CardContent,
  ChartPieItem,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabbarComponent,
  TextComponent,
  TitleComponent,
} from '../../../components';
import {fontFamilys} from '../../../constants/fontFamily';
import {useNavigation} from '@react-navigation/native';
import {ListScore, Score} from '../../../Models/Score';
import handleGetData from '../../../apis/productAPI';
import {DateTime} from '../../../utils/DateTime';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {appColors} from '../../../constants/appColors';
import {global} from '../../../styles/global';
import {useSelector} from 'react-redux';
import {authSelector} from '../../../redux/reducers/authReducer';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {ModalInfoScore} from '../../../modals';
import {appSize} from '../../../constants/appSize';

const AvgScoreComponent = () => {
  const [avgScore, setAvgScore] = useState<Score>();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleModalInfo, setIsVisibleModalInfo] = useState(false);
  const [listScores, setListScores] = useState<ListScore[]>([]);

  const navigation: any = useNavigation();
  const auth = useSelector(authSelector);

  useEffect(() => {
    getAvgScore();
    getRecentsListScore();
  }, []);

  const getAvgScore = async () => {
    const api = `/avgListScore`;
    setIsLoading(true);
    try {
      const res: any = await handleGetData.handleUser(api);

      res && setAvgScore(res);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getRecentsListScore = async () => {
    const api = `/allListScore`;

    try {
      const res: any = await handleGetData.handleUser(api);

      res && setListScores(res);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const renderPercentage = (
    total: number,
    score: number,
    color: string,
    title: string,
  ) => {
    return score ? (
      <View
        style={{
          justifyContent: 'center',
          width: `${(score / total) * 100}%`,
          paddingHorizontal: 2,
        }}>
        <View>
          <TextComponent
            text={score.toFixed(0)}
            flex={0}
            size={10}
            font={fontFamilys.bold}
            styles={{textAlign: 'center'}}
          />
          <View
            style={{
              backgroundColor: color,
              borderRadius: 4,
              height: 18,
              // marginVertical: 4,
              // marginRight: 10,
            }}
          />

          <TextComponent
            line={1}
            text={title}
            flex={0}
            size={10}
            font={fontFamilys.regular}
            styles={{textAlign: 'center'}}
          />
        </View>
      </View>
    ) : null;
  };

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          {avgScore && avgScore.list_score >= 0 ? (
            <SectionComponent>
              <RowComponent styles={{alignItems: 'flex-start'}}>
                <View style={{flex: 1}}>
                  <TitleComponent
                    text="Avg. Grocery List Score"
                    size={20}
                    flex={0}
                  />
                  <TextComponent
                    text={`Based on your last 4 lists. Last updated ${DateTime.getDateString(
                      avgScore?.last_update,
                    )}`}
                    size={10}
                    font={fontFamilys.regular}
                    flex={0}
                  />
                </View>
                <Button
                  icon={
                    <AntDesign
                      name="infocirlceo"
                      size={20}
                      color={appColors.gray}
                    />
                  }
                  onPress={() => setIsVisibleModalInfo(true)}
                />
              </RowComponent>
              <SpaceComponent height={12} />
              <View>
                <CardContent
                  onPress={() => navigation.navigate('ListScoreTrend')}
                  color={appColors.white}
                  isShadow
                  styles={{}}>
                  <View style={global.center}>
                    <ChartPieItem
                      total={`${avgScore?.list_score}`}
                      size={100}
                      fontSize={40}
                      data={{
                        values: [
                          avgScore.green_line,
                          avgScore.orange_line,
                          avgScore.red_line,
                        ],
                      }}
                      radius={0.9}
                    />
                    <RowComponent styles={{marginVertical: 8}}>
                      {avgScore.difference > 0 ? (
                        <AntDesign
                          name="caretup"
                          color={appColors.success1}
                          size={12}
                        />
                      ) : avgScore.difference < 0 ? (
                        <AntDesign
                          name="caretdown"
                          color={appColors.error}
                          size={12}
                        />
                      ) : null}
                      <Text
                        style={[
                          global.text,
                          {
                            fontFamily: fontFamilys.bold,
                            flex: 0,
                          },
                        ]}>
                        {' '}
                        {avgScore.difference}pt{' '}
                        <Text style={{fontFamily: fontFamilys.regular}}>
                          since last list
                        </Text>
                      </Text>
                    </RowComponent>
                  </View>

                  <RowComponent styles={{flex: 1}}>
                    {renderPercentage(
                      avgScore.green_line +
                        avgScore.red_line +
                        avgScore.orange_line,
                      avgScore.green_line,
                      '#AAC54E',
                      'Great Choices',
                    )}
                    {renderPercentage(
                      avgScore.green_line +
                        avgScore.red_line +
                        avgScore.orange_line,
                      avgScore.orange_line,
                      '#FFD97D',
                      'Good',
                    )}
                    {renderPercentage(
                      avgScore.green_line +
                        avgScore.red_line +
                        avgScore.orange_line,
                      avgScore.red_line,
                      '#F15D59',
                      'Limit',
                    )}
                  </RowComponent>
                </CardContent>

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
                      <Fontisto
                        name="locked"
                        size={14}
                        color={appColors.white}
                      />
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
            </SectionComponent>
          ) : (
            <></>
          )}
          {listScores.length > 0 && (
            <SectionComponent>
              <TabbarComponent
                title="Recent List Scores"
                onPress={() =>
                  navigation.navigate('ListScores', {items: listScores})
                }
                seemore
              />
              <RowComponent justify="flex-start">
                {listScores.map((item, index) =>
                  index < 3 &&
                  item.scoredetails.list_score &&
                  (item.scoredetails.green_line ||
                    item.scoredetails.red_line ||
                    item.scoredetails.orange_line) ? (
                    <CardContent
                      key={`dataChart${index}`}
                      isShadow
                      color={appColors.white}
                      styles={{
                        width: (appSize.width - (32 + 12 * 2)) / 3,
                        marginRight: index < 2 ? 12 : 0,
                      }}>
                      <ChartPieItem
                        data={{
                          values: [
                            item.scoredetails.green_line,
                            item.scoredetails.orange_line,
                            item.scoredetails.red_line,
                          ],
                        }}
                        key={item.id}
                        total={`${item.scoredetails.list_score}`}
                        size={70}
                        fontSize={28}
                      />
                    </CardContent>
                  ) : (
                    <></>
                  ),
                )}
              </RowComponent>
            </SectionComponent>
          )}
        </>
      )}
      <ModalInfoScore
        visible={isVisibleModalInfo}
        onClose={() => setIsVisibleModalInfo(false)}
      />
    </View>
  );
};

export default AvgScoreComponent;
