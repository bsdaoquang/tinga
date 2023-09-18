import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const VideoPlayer = ({id}: {id: string}) => {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state: any) => {
    if (state === 'ended') {
      setPlaying(false);
      // Alert.alert('video has finished playing!');
    }
  }, []);

  return (
    <View style={{minHeight: 200}}>
      <YoutubePlayer
        height={200}
        contentScale={1}
        play={playing}
        videoId={id}
        onChangeState={onStateChange}
      />
    </View>
  );
};

export default VideoPlayer;
