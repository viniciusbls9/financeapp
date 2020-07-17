console.disableYellowBox = true;
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';

import dark from './src/themes/dark';
import light from './src/themes/light';

import MainStack from './src/navigators/MainStack';

// import Config from './src/pages/configurations/Configurations';

export default function App() {

  const [theme, setTheme] = useState(light);

  function toggleTheme () {
    setTheme(theme.title === 'light' ? dark : light);
  };

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        {/* <Config toggleTheme={toggleTheme} /> */}
          <MainStack />
      </NavigationContainer>
    </ThemeProvider>
  );
}