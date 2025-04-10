import React from 'react';
import { View, Text, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MapView from '../components/MapView';
import ProfileScreen from '../components/ProfileScreen';
import MoreScreen from '../components/MoreScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
    initialRouteName="Map"
      screenOptions={({ route }) => ({
        headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../../assets/images/bkkbn.png')}
              style={{
                width: 35,
                height: 35,
                resizeMode: 'contain',
                marginRight: 8,
              }}
            />
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>
              Stunting Apps
            </Text>
          </View>
        ),
        headerTitleAlign: 'left',
        headerStyle: {
          backgroundColor: '#fff',
          elevation: 4,
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
        },
        headerTintColor: '#000',
        tabBarLabel: '', // Kita akan buat label custom di dalam icon
        tabBarIcon: ({ focused }) => {
          let iconSource;
          let label;

          if (route.name === 'Profile') {
            iconSource = require('../../assets/icons/Profile.png');
            label = 'Profil';
          } else if (route.name === 'Map') {
            iconSource = require('../../assets/icons/Map.png');
            label = 'Map';
          } else if (route.name === 'More') {
            iconSource = require('../../assets/icons/More.png');
            label = 'More';
          }

          return (
            <View style={{ alignItems: 'center' }}>
              <Image
                source={iconSource}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#fff' : '#cce6ff',
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 12,
                  color: focused ? '#fff' : '#cce6ff',
                  marginTop: 2,
                }}
              >
                {label}
              </Text>
            </View>
          );
        },
        tabBarStyle: {
          backgroundColor: '#0094d4',
          height: 75,
          paddingBottom: 5,
          paddingTop: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      })}
    >
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Map" component={MapView} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
