import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DetailWilayah = ({ route, navigation }) => {
  const { id, name, keterangan } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Wilayah</Text>
      <Text style={styles.label}>ID:</Text>
      <Text style={styles.text}>{id}</Text>

      <Text style={styles.label}>Nama Wilayah:</Text>
      <Text style={styles.text}>{name}</Text>

      <Text style={styles.label}>Keterangan:</Text>
      <Text style={styles.text}>{keterangan || "Tidak ada keterangan."}</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>← Kembali ke Peta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
  },
  text: {
    fontSize: 16,
    marginTop: 4,
  },
  button: {
    marginTop: 40,
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailWilayah;
