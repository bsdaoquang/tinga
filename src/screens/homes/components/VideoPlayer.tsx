import React, {useCallback, useState} from 'react';
import {Alert, Image, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import YoutubePlayer from 'react-native-youtube-iframe';
import {ButtonIcon} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {appSize} from '../../../constants/appSize';

const VideoPlayer = () => {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state: any) => {
    if (state === 'ended') {
      setPlaying(false);
      // Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  return (
    <View style={{minHeight: 200}}>
      <YoutubePlayer
        height={200}
        contentScale={1}
        play={playing}
        videoId={'iee2TATGMyI'}
        onChangeState={onStateChange}
      />

      {/* <ButtonIcon
        icon={<Ionicons name="play" size={20} color={appColors.primary} />}
        size={50}
        color={appColors.white}
        onPress={togglePlaying}
        styles={{
          position: 'absolute',
          top: '40%',
          left: (appSize.width - 82) / 2,
        }}
      /> */}
    </View>
  );
};

export default VideoPlayer;
