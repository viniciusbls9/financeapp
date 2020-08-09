console.disableYellowBox = true;
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';

import { Provider } from 'react-redux';
import Store from './src/Store';

import MainStack from './src/navigators/MainStack';

// import Config from './src/pages/configurations/Configurations';

export default function App() {

  const [theme, setTheme] = useState(Store.getState().userReducer.theme);

  Store.subscribe(() => {
    setTheme(Store.getState().userReducer.theme);
  });


  return (
    <Provider store={Store}>
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <MainStack />
        </ThemeProvider>
      </NavigationContainer>
    </Provider>
  );
}