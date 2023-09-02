import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import Router from './src/routers/router';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Host} from 'react-native-portalize';

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
