import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashWrapper from './src/components/SplashWrapper';
import LandingPage from './src/components/LandingPage';
import LoginScreen from './src/components/LoginScreen';
import MapView from './src/components/MapView';
import DetailWilayah from './src/components/DetainWilayah';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Splash" component={SplashWrapper} />
          <Stack.Screen name="Landing" component={LandingPage} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Map" component={MapView} />
          <Stack.Screen name="DetailWilayah" component={DetailWilayah} />

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
