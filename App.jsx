import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import MapView from './src/components/MapView';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <MapView />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // opsional biar nggak ada flicker putih
  },
});

export default App;
