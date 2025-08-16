// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import DrinkDetailScreen from './src/screens/DrinkDetailScreen'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Bem-vindo ao Elixir' }}
        />
        <Stack.Screen 
          name="DrinkDetail" 
          component={DrinkDetailScreen} 
          options={{ title: 'Detalhes do Drink' }}
        /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}