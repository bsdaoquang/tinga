import React from 'react';
import {ImageBackground, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {VideoModel} from '../../../Models/VideoModel';
import {appColors} from '../../../constants/appColors';
import {global} from '../../../styles/global';
import {useNavigation} from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';

const VideoComponent = ({
  item,
  isVideo,
}: {
  item: VideoModel;
  isVideo?: boolean;
}) => {
  const navigation: any = useNavigation();

  return isVideo ? (
    item.videotype === 'Youtube' && item.code && item.name && (
      <YoutubePlayer videoId={`${item.code}`} contentScale={1} height={200} />
    )
  ) : (
    <ImageBackground
      source={{uri: item.image}}
      style={{height: 160, justifyContent: 'center', alignItems: 'center'}}
      imageStyle={{borderRadius: 12}}>
      <TouchableOpacity
        style={{
          ...global.shadow,
          width: 50,
          height: 50,
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: appColors.white,
        }}
        onPress={() => navigation.navigate('VideoPlayer', {video: item})}>
        <FontAwesome5 name="play" size={20} color={appColors.primary} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default VideoComponent;
