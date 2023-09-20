import React, {useCallback, useState} from 'react';
import {Image, View} from 'react-native';
import {VideoModel} from '../../../Models/VideoModel';
import {appSize} from '../../../constants/appSize';
import YoutubePlayer from 'react-native-youtube-iframe';

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
    <YoutubePlayer
      videoId={`${video.code}`}
      contentScale={1}
      height={appSize.height}
    />
  );
};

export default VideoPlayer;
