import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home } from '../pages/Home';
import { Search } from '../pages/Search';
import { Profile } from '../pages/Profile';

const Tab  = createBottomTabNavigator()

export function AppRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Search' component={Search} />
      <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  )
}

