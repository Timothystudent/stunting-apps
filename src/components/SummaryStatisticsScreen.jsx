import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const data = {
  labels: ['Airmadidi', 'Kalawat', 'Dimembe', 'Talawaan'],
  datasets: [
    {
      data: [45, 28, 35, 22],
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 71, 171, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForLabels: {
    fontSize: 10,
  },
};

const SummaryStatisticsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Statistik Keluarga Berisiko Stunting</Text>

      <BarChart
        style={styles.chart}
        data={data}
        width={screenWidth - 30}
        height={250}
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        fromZero
        showValuesOnTopOfBars
      />

      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>Total Kecamatan: 4</Text>
        <Text style={styles.summaryText}>Total Keluarga Berisiko: 130</Text>
        <Text style={styles.summaryText}>Rata-rata per Kecamatan: 32.5</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 30,
    backgroundColor: '#f4f6fa',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0047AB',
    marginBottom: 20,
    textAlign: 'center',
  },
  chart: {
    borderRadius: 10,
  },
  summaryBox: {
    marginTop: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 2,
  },
  summaryText: {
    fontSize: 14,
    marginBottom: 10,
    color: '#333',
  },
});

export default SummaryStatisticsScreen;
