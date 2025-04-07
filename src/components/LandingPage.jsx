import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Animated } from 'react-native';
import PagerView from 'react-native-pager-view';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    image: require('../../assets/images/bkkbn.png'),
    text: 'Selamat datang di Aplikasi GIS untuk mendeteksi keluarga berisiko stunting di Minahasa Utara.',
  },
  {
    id: 2,
    image: require('../../assets/images/bkkbn.png'),
    text: 'Data didasarkan pada faktor-faktor seperti jarak kelahiran, pernikahan dini, dan sanitasi.',
  },
  {
    id: 3,
    image: require('../../assets/images/bkkbn.png'),
    text: 'Gunakan aplikasi ini untuk membantu petugas dan keluarga dalam mencegah stunting.',
  },
];

const LandingPage = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const indicatorAnims = useRef(
    slides.map((_, i) => new Animated.Value(i === 0 ? 1 : 0))
  ).current;

  useEffect(() => {
    indicatorAnims.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: index === currentPage ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  }, [currentPage]);

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
      >
        {slides.map((slide, index) => (
          <View key={slide.id} style={styles.slide}>
            <Image source={slide.image} style={styles.logo} resizeMode="contain" />
            <Text style={styles.description}>{slide.text}</Text>
            {index === slides.length - 1 && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.buttonText}>Masuk ke Peta</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </PagerView>

      {/* Indikator dengan animasi */}
      <View style={styles.indicatorContainer}>
        {slides.map((_, index) => {
          const width = indicatorAnims[index].interpolate({
            inputRange: [0, 1],
            outputRange: [8, 20],
          });

          const backgroundColor = indicatorAnims[index].interpolate({
            inputRange: [0, 1],
            outputRange: ['#ccc', '#007bff'],
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.indicator,
                {
                  width,
                  backgroundColor,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  pagerView: { flex: 1 },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  indicator: {
    height: 8,
    borderRadius: 5,
    marginHorizontal: 6,
  },
});

export default LandingPage;
