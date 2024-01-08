import React from 'react';
import {FlatList, View} from 'react-native';
import {Container, SpaceComponent, TitleComponent} from '../../components';
import VideoComponent from './components/VideoComponent';

const VideosScreen = ({route, navigation}: any) => {
  const {videos} = route.params;

  return (
    <Container back title="Videos">
      <FlatList
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        data={videos}
        renderItem={({item}) => (
          <View style={{padding: 16}}>
            <TitleComponent text={item.name} flex={0} />
            <SpaceComponent height={8} />

            <VideoComponent item={item} isVideo />
          </View>
        )}
      />
    </Container>
  );
};

export default VideosScreen;
