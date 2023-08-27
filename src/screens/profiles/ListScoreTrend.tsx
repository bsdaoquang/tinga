import {View, Text} from 'react-native';
import React from 'react';
import {
  ButtonComponent,
  Container,
  SectionComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {LineChart} from 'react-native-chart-kit';
import {appSize} from '../../constants/appSize';
import {appColors} from '../../constants/appColors';

const ListScoreTrend = ({navigation}: any) => {
  const dataChart = {
    labels: ['04/01', '04/07', '04/14', '04/22', '05/02', '05/15'],
    datasets: [
      {
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
        ],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: appColors.white,
    backgroundGradientFrom: 'rgba(255, 255, 255, 1)',
    backgroundGradientTo: 'rgba(255, 255, 255, 0)',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(195, 203, 92,  ${opacity})`,
    labelColor: () => appColors.gray,
    strokeWidth: 4,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
    },
  };

  return (
    <Container back>
      <SectionComponent>
        <TitleComponent text="List Score Trends" flex={0} size={20} />
      </SectionComponent>
      <View
        style={{
          padding: 1,
          marginTop: 12,
          marginBottom: 24,
        }}>
        <LineChart
          data={dataChart}
          chartConfig={chartConfig}
          width={appSize.width}
          height={220}
          bezier
        />
      </View>
      <SectionComponent>
        <ButtonComponent
          text="View All List Scores"
          onPress={() => navigation.navigate('ListScores')}
        />
      </SectionComponent>
    </Container>
  );
};

export default ListScoreTrend;
