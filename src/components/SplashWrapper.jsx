import React from 'react';
import SplashScreen from './SplashScreen';

const SplashWrapper = ({ navigation }) => {
  const handleFinish = () => {
    navigation.replace('Landing'); // Ganti ke halaman selanjutnya
  };

  return <SplashScreen onFinish={handleFinish} />;
};

export default SplashWrapper;
