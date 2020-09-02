console.disableYellowBox = true;
import React, { useState } from 'react';
import { PersistGate } from 'redux-persist/es/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';

import { Provider } from 'react-redux';
import { store, persistor } from './src/Store';

import MainStack from './src/navigators/MainStack';

export default function App() {

  const [theme, setTheme] = useState(store.getState().userReducer.theme);

  store.subscribe(() => {
    setTheme(store.getState().userReducer.theme);
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <ThemeProvider theme={theme}>
            <MainStack />
          </ThemeProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}