import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Image, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import YoutubePlayer from 'react-native-youtube-iframe';
import {ButtonIcon} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {appSize} from '../../../constants/appSize';
import {showToast} from '../../../utils/showToast';
import dashboardAPI from '../../../apis/dashboardAPI';
import {VideoModel} from '../../../Models/VideoModel';

const VideoPlayer = () => {
  const [playing, setPlaying] = useState(false);

  const [videos, setVideos] = useState<VideoModel[]>([]);

  useEffect(() => {
    getVideos();
  }, []);

  const onStateChange = useCallback((state: any) => {
    if (state === 'ended') {
      setPlaying(false);
      // Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  const getVideos = async () => {
    const api = `/videos`;

    try {
      await dashboardAPI.HandleAPI(api).then((res: any) => {
        setVideos(res);
      });
    } catch (error) {
      console.log(`can not get videos for dashboard`);
      showToast('Can not get videos');
    }
  };

  return (
    <View style={{minHeight: 200}}>
      <YoutubePlayer
        height={200}
        contentScale={1}
        play={playing}
        videoId={videos[1].code}
        onChangeState={onStateChange}
      />
    </View>
  );
};

export default VideoPlayer;
