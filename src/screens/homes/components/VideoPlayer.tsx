import React, {useCallback, useState} from 'react';
import {Image, View} from 'react-native';
import {VideoModel} from '../../../Models/VideoModel';
import {appSize} from '../../../constants/appSize';
import YoutubePlayer from 'react-native-youtube-iframe';
import {Container} from '../../../components';

const VideoPlayer = ({route, navigation}: any) => {
  const {video}: {video: VideoModel} = route.params;

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state: any) => {
    if (state === 'ended') {
      setPlaying(false);
      // Alert.alert('video has finished playing!');
    }
  }, []);

  return (
    <Container back title={video.name}>
      <YoutubePlayer
        videoId={`${video.code}`}
        contentScale={1}
        height={appSize.height}
      />
    </Container>
  );
};

export default VideoPlayer;
