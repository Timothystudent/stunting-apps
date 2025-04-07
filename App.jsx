// import React from 'react';
// import { StatusBar } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// import SplashWrapper from './src/components/SplashWrapper';
// import LandingPage from './src/components/LandingPage';
// import LoginScreen from './src/components/LoginScreen';
// import DetailWilayah from './src/components/DetailWilayah';
// import MainTabNavigator from './src/navigation/MainTabNavigator';

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
//       <NavigationContainer>
//         <Stack.Navigator
//           initialRouteName="Splash"
//           screenOptions={{
//             headerStyle: {
//               backgroundColor: '#fff',
//               elevation: 4, // Android shadow
//               shadowColor: '#000', // iOS shadow
//               shadowOpacity: 0.2,
//               shadowOffset: { width: 0, height: 2 },
//               shadowRadius: 4,
//             },
//             headerTintColor: '#000',
//             headerTitleStyle: {
//               fontWeight: 'bold',
//               color: '#000',
//             },
//             headerTitleAlign: 'left',
//           }}
//         >
//           <Stack.Screen
//             name="Splash"
//             component={SplashWrapper}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="Landing"
//             component={LandingPage}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="Login"
//             component={LoginScreen}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//   name="Main"
//   component={MainTabNavigator}
//   options={{ headerShown: false }} // Ini WAJIB ditambahkan!
// />

//           <Stack.Screen
//             name="DetailWilayah"
//             component={DetailWilayah}
//             options={{ title: 'Detail Wilayah' }}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </>
//   );
// };

// export default App;

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import MapView from './src/components/MapView';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <NavigationContainer>
        <MapView />
      </NavigationContainer>
    </>
  );
};

export default App;
