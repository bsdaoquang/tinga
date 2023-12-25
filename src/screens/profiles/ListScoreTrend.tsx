import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import handleGetData from '../../apis/productAPI';
import {DateTime} from '../../utils/DateTime';

const ListScoreTrend = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataChart, setDataChart] = useState<{
    labels: string[];
    datasets: {
      data: number[];
    }[];
  }>();

  useEffect(() => {
    getListTrend();
  }, []);

  const getListTrend = async () => {
    const api = `/listTrend`;

    setIsLoading(true);

    try {
      const res: any = await handleGetData.handleUser(api);

      if (res && res.length > 0) {
        const labs: string[] = [];
        const data: number[] = [];

        res.forEach((item: any) => {
          labs.push(DateTime.getShortDate(item.created_at));
          data.push(item.list_score);
        });

        setDataChart({
          labels: labs,
          datasets: [
            {
              data,
            },
          ],
        });

        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
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
      {isLoading ? (
        <SectionComponent>
          <ActivityIndicator />
        </SectionComponent>
      ) : dataChart ? (
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
      ) : (
        <TextComponent text="Data not found!" />
      )}
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
