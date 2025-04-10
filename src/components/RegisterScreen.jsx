import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const kecamatanList = [
  'Airmadidi',
  'Kalawat',
  'Dimembe',
  'Talawaan',
  'Wori',
  'Likupang Barat',
  'Likupang Timur',
  'Likupang Selatan',
  'Kauditan',
  'Kema',
];

const RegisterScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleNext = () => {
    switch (step) {
      case 1:
        if (!name.trim()) return alert('Nama harus diisi');
        break;
      case 2:
        if (!birthDate.trim()) return alert('Tanggal lahir harus diisi');
        break;
      case 3:
        if (!kecamatan) return alert('Pilih kecamatan terlebih dahulu');
        break;
      case 4:
        if (!gender) return alert('Pilih jenis kelamin');
        break;
      case 5:
        if (!email.trim()) return alert('Email harus diisi');
        break;
      case 6:
        if (!password.trim()) return alert('Password harus diisi');
        break;
      case 7:
        if (confirmPassword !== password) return alert('Konfirmasi password tidak cocok');
        navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
        return;
      default:
        return;
    }
    setStep(step + 1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Text style={styles.title}>Siapa nama kamu?</Text>
            <TextInput
              style={styles.input}
              placeholder="Nama Lengkap"
              value={name}
              onChangeText={setName}
            />
          </>
        );
      case 2:
        return (
          <>
            <Text style={styles.title}>Tanggal lahir kamu?</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh: 12-08-2002"
              value={birthDate}
              onChangeText={setBirthDate}
            />
          </>
        );
      case 3:
        return (
          <>
            <Text style={styles.title}>Kecamatan tempat tinggal</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={kecamatan}
                onValueChange={(itemValue) => setKecamatan(itemValue)}
                style={Platform.OS === 'android' ? {} : { height: 150 }}
              >
                <Picker.Item label="-- Pilih Kecamatan --" value="" />
                {kecamatanList.map((item, index) => (
                  <Picker.Item label={item} value={item} key={index} />
                ))}
              </Picker>
            </View>
          </>
        );
      case 4:
        return (
          <>
            <Text style={styles.title}>Jenis kelamin kamu</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={gender}
                onValueChange={(value) => setGender(value)}
                style={Platform.OS === 'android' ? {} : { height: 150 }}
              >
                <Picker.Item label="-- Pilih Jenis Kelamin --" value="" />
                <Picker.Item label="Laki-laki" value="Laki-laki" />
                <Picker.Item label="Perempuan" value="Perempuan" />
              </Picker>
            </View>
          </>
        );
      case 5:
        return (
          <>
            <Text style={styles.title}>Email kamu</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </>
        );
      case 6:
        return (
          <>
            <Text style={styles.title}>Buat password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.eyeIcon}>{showPassword ? '👁️‍🗨️' : '👁️'}</Text>
              </TouchableOpacity>
            </View>
          </>
        );
      case 7:
        return (
          <>
            <Text style={styles.title}>Konfirmasi password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Konfirmasi Password"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Text style={styles.eyeIcon}>{showConfirmPassword ? '👁️‍🗨️' : '👁️'}</Text>
              </TouchableOpacity>
            </View>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        {renderStepContent()}
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>{step < 7 ? 'Selanjutnya' : 'Daftar'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  innerContainer: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  inputPassword: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  eyeIcon: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#0047AB',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});

export default RegisterScreen;
