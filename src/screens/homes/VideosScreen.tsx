import React from 'react';
import {FlatList, View} from 'react-native';
import {Container, SpaceComponent, TitleComponent} from '../../components';
import VideoPlayer from './components/VideoPlayer';

const VideosScreen = ({route, navigation}: any) => {
  const {videos} = route.params;

  return (
    <Container back title="Videos">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={videos}
        renderItem={({item}) => (
          <View style={{padding: 16}}>
            <TitleComponent text={item.name} flex={0} />
            <SpaceComponent height={8} />
            <VideoPlayer id={item.code} />
          </View>
        )}
      />
    </Container>
  );
};

export default VideosScreen;
