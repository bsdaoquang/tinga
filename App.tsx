import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Host} from 'react-native-portalize';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import Router from './src/routers/router';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <Host>
          <Router />
        </Host>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
