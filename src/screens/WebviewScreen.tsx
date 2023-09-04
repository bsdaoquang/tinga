import React from 'react';
import WebView from 'react-native-webview';
import {Container} from '../components';
import {appColors} from '../constants/appColors';

const WebviewScreen = ({navigation, route}: any) => {
  const {url} = route.params;

  return (
    <Container top={32} backgroundColor={appColors.white}>
      <WebView source={{uri: url}} />
    </Container>
  );
};

export default WebviewScreen;
