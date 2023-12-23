import {View, Text} from 'react-native';
import React from 'react';
import PieChart from 'react-native-pie-chart';
import TitleComponent from './TitleComponent';

interface ChartData {
  values: number[];
  colors?: string[];
}

interface Props {
  total?: string;
  data: ChartData;
  size?: number;
  fontSize?: number;
  radius?: number;
}

const ChartPieItem = (props: Props) => {
  const {total, data, size, fontSize, radius} = props;

  // green, orange, red
  const colors = data.colors ?? ['#AAC54E', '#FFD432', '#F15D59'];
  const containerSize = size ?? 80;
  const stroke = radius ?? 0.85;
  return (
    <View
      style={{
        width: containerSize,
        height: containerSize,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <PieChart
        widthAndHeight={containerSize}
        series={data.values}
        sliceColor={colors}
        coverRadius={stroke}
      />
      <TitleComponent
        text={total ?? '--'}
        flex={0}
        size={fontSize ?? 28}
        styles={{position: 'absolute', left: 0, right: 0, textAlign: 'center'}}
      />
    </View>
  );
};

export default ChartPieItem;
