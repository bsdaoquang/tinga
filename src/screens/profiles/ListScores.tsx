import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SectionList, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ListScore, Scoredetails} from '../../Models/Score';
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
import {fontFamilys} from '../../constants/fontFamily';
import {ModalInfoScore} from '../../modals';
import {DateTime} from '../../utils/DateTime';
import handleGetData from '../../apis/productAPI';

const ListScores = ({navigation, route}: any) => {
  const [items, setItems] = useState<ListScore[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleModalInfo, setIsVisibleModalInfo] = useState(false);
  const [scoreData, setScoreData] = useState<
    {
      date: string;
      data: Scoredetails[];
    }[]
  >([]);

  useEffect(() => {
    getRecentsListScore();
  }, []);

  useEffect(() => {
    if (items && items.length > 0) {
      const section: {date: string; data: Scoredetails[]}[] = [];
      items.forEach(item => {
        const date = DateTime.getDateString(item.created_at);
        const data: Scoredetails[] = [];
        const values = items.filter(
          element => DateTime.getDateString(element.created_at) === date,
        );

        if (values.length > 0) {
          values.forEach(val => data.push(val.scoredetails));
        }

        section.push({
          date,
          data,
        });
      });
      setScoreData(section);
    }
  }, [items]);

  const getRecentsListScore = async () => {
    const api = `/allListScore`;

    try {
      const res: any = await handleGetData.handleUser(api);

      res && res.length > 0 && setItems(res);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const renderScoreItem = (item: Scoredetails) => {
    const total = item.green_line + item.red_line + item.orange_line;
    return (
      <CardContent
        isShadow
        styles={{padding: 20, marginHorizontal: 16, marginBottom: 22}}
        color={appColors.white}>
        <RowComponent>
          <ChartPieItem
            total={`${item.list_score}`}
            size={100}
            fontSize={40}
            data={{values: [item.green_line, item.orange_line, item.red_line]}}
            radius={0.9}
          />
          <View
            style={{
              flex: 1,
              paddingLeft: 12,
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
                text={` ${(item.green_line / total) * 100}%`}
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
                text={` ${(item.orange_line / total) * 100}%`}
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
                text={` ${(item.red_line / total) * 100}%`}
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
      </CardContent>
    );
  };

  return (
    <Container back>
      {isLoading ? (
        <SectionComponent>
          <ActivityIndicator />
        </SectionComponent>
      ) : (
        <>
          <SectionComponent>
            <RowComponent>
              <TitleComponent size={20} text="All List Scores" />
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
          </SectionComponent>

          <SectionList
            showsVerticalScrollIndicator={false}
            sections={scoreData}
            keyExtractor={(item, index) => `notification${index}`}
            renderItem={({item}) => renderScoreItem(item)}
            renderSectionHeader={({section: {date}}) => (
              <RowComponent
                styles={{
                  paddingHorizontal: 16,
                  marginBottom: 10,
                }}>
                <TextComponent text={date} size={14} />
                <Button
                  text="View List"
                  textSize={14}
                  textColor={appColors.success2}
                  onPress={() => {}}
                />
              </RowComponent>
            )}
          />
        </>
      )}

      <ModalInfoScore
        visible={isVisibleModalInfo}
        onClose={() => setIsVisibleModalInfo(false)}
      />
    </Container>
  );
};

export default ListScores;
