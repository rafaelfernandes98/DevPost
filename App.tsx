/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Routes } from './src/routes';
import { StatusBar } from 'react-native';

function App(): JSX.Element {

  return (
    <NavigationContainer>
      <StatusBar backgroundColor='#36393f' barStyle='light-content' translucent={false} />
      <Routes/>
    </NavigationContainer>
  )
}

export default App;
