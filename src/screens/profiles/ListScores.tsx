import {View, Text, SectionList} from 'react-native';
import React, {useState} from 'react';
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
import {ModalInfoScore} from '../../modals';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {appColors} from '../../constants/appColors';
import {Score} from '../../Models/Score';
import {GoodIcon, GreatIcon, LimitIcon} from '../../assets/svg';
import {fontFamilys} from '../../constants/fontFamily';

const ListScores = () => {
  const [isVisibleModalInfo, setIsVisibleModalInfo] = useState(false);

  const scores = [
    {
      date: 'May 15th, 2023',
      data: [
        {
          id: 'score1',
          total: 85,
          dataScore: {
            great: 70,
            good: 20,
            limit: 10,
          },
        },
      ],
    },
    {
      date: 'May 15th, 2023',
      data: [
        {
          id: 'score1',
          total: 85,
          dataScore: {
            great: 70,
            good: 20,
            limit: 10,
          },
        },
      ],
    },
    {
      date: 'May 15th, 2023',
      data: [
        {
          id: 'score1',
          total: 85,
          dataScore: {
            great: 70,
            good: 20,
            limit: 10,
          },
        },
      ],
    },
    {
      date: 'May 15th, 2023',
      data: [
        {
          id: 'score1',
          total: 85,
          dataScore: {
            great: 70,
            good: 20,
            limit: 10,
          },
        },
      ],
    },
  ];

  const renderScoreItem = (item: any) => (
    <CardContent
      isShadow
      styles={{padding: 20, marginHorizontal: 16, marginBottom: 22}}
      color={appColors.white}>
      <RowComponent>
        <ChartPieItem
          total={80}
          size={100}
          fontSize={40}
          data={{values: [70, 20, 10]}}
          radius={0.9}
        />
        <View
          style={{
            flex: 1,
            paddingLeft: 12,
          }}>
          <RowComponent>
            <GreatIcon />
            <TitleComponent text=" 70%" size={12} flex={0} />
            <TextComponent
              text={` (14) Great Choices`}
              size={12}
              font={fontFamilys.regular}
            />
          </RowComponent>
          <SpaceComponent height={6} />
          <RowComponent>
            <GoodIcon />
            <TitleComponent text=" 70%" size={12} flex={0} />
            <TextComponent
              text={` (14) Great Choices`}
              size={12}
              font={fontFamilys.regular}
            />
          </RowComponent>

          <SpaceComponent height={6} />
          <RowComponent>
            <LimitIcon />
            <TitleComponent text=" 70%" size={12} flex={0} />
            <TextComponent
              text={` (14) Great Choices`}
              size={12}
              font={fontFamilys.regular}
            />
          </RowComponent>
        </View>
      </RowComponent>
    </CardContent>
  );

  return (
    <Container back>
      <SectionComponent>
        <RowComponent>
          <TitleComponent size={20} text="All List Scores" />
          <Button
            icon={
              <AntDesign name="infocirlceo" size={20} color={appColors.gray} />
            }
            onPress={() => setIsVisibleModalInfo(true)}
          />
        </RowComponent>
      </SectionComponent>

      <SectionList
        sections={scores}
        keyExtractor={(item, index) => `notification${item.id + index}`}
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
      <ModalInfoScore
        visible={isVisibleModalInfo}
        onClose={() => setIsVisibleModalInfo(false)}
      />
    </Container>
  );
};

export default ListScores;
