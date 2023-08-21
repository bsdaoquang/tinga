import React from 'react';
import {Container, TextComponent} from '../../components';
import PieChart from 'react-native-pie-chart';

const ProfileScreen = () => {
  const widthAndHeight = 250;
  const series = [15, 15, 70];
  const sliceColor = ['#F15D59', '#FFD432', '#AAC54E'];

  return (
    <Container barStyle="dark-content">
      <TextComponent text="Profile" flex={0} />
      <PieChart
        widthAndHeight={100}
        series={series}
        sliceColor={sliceColor}
        coverRadius={0.85}
      />
    </Container>
  );
};

export default ProfileScreen;
