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
import { AuthProvider } from './src/contexts/auth';

function App(): JSX.Element {

  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor='#36393f' barStyle='light-content' translucent={false} />
        <Routes/>
      </AuthProvider>
    </NavigationContainer>
  )
}

export default App;
