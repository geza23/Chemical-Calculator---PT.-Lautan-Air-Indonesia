
import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function App() {
  const [volume, setVolume] = useState("");
  const [waktu, setWaktu] = useState("");
  const [flowLph, setFlowLph] = useState("");
  const [lphInput, setLphInput] = useState("");

  const [airVolume, setAirVolume] = useState("1000");
  const sciPercent = 2;
  const zpPercent = 15;

  const calculateFlow = () => {
    const flow = (parseFloat(volume || 0) / parseFloat(waktu || 1)) * 3.6;
    setFlowLph(flow.toFixed(2));
  };

  const calculateDose = () => {
    const dosis = (parseFloat(lphInput || 0) / 11200) * 1e6;
    return dosis.toFixed(2);
  };

  const calculateLoad = (percent) => {
    return ((percent / 100) * parseFloat(airVolume || 0)).toFixed(2);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Lautan_Luas_Logo.png' }} style={styles.logo} />
        <Text style={styles.title}>PT Lautan Air Indonesia</Text>
      </View>

      <Text style={styles.sectionTitle}>Hitung Flow</Text>
      <Text>Volume (mL)</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={volume} onChangeText={setVolume} />
      <Text>Waktu (detik)</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={waktu} onChangeText={setWaktu} />
      <TouchableOpacity style={styles.button} onPress={calculateFlow}>
        <Text style={styles.buttonText}>Hitung Flow</Text>
      </TouchableOpacity>
      <Text>Flow: {flowLph} LPH</Text>

      <Text style={styles.sectionTitle}>Hitung Dosis</Text>
      <Text>Flow (LPH)</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={lphInput} onChangeText={setLphInput} />
      <Text>Dosis: {calculateDose()} ppm</Text>

      <Text style={styles.sectionTitle}>SCI 45 - Larutan 2%</Text>
      <Text>Volume Air (Liter)</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={airVolume} onChangeText={setAirVolume} />
      <Text>Chemical Dibutuhkan: {calculateLoad(sciPercent)} L</Text>

      <Text style={styles.sectionTitle}>ZP 35 - Larutan 15%</Text>
      <Text>Volume Air (Liter)</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={airVolume} onChangeText={setAirVolume} />
      <Text>Chemical Dibutuhkan: {calculateLoad(zpPercent)} L</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 50 },
  header: { alignItems: "center", marginBottom: 20 },
  logo: { width: 100, height: 100 },
  title: { fontSize: 18, fontWeight: "bold", color: "#1E3A8A", marginTop: 10 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginTop: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 8, marginVertical: 5 },
  button: { backgroundColor: "#1E3A8A", padding: 10, borderRadius: 5, marginVertical: 10 },
  buttonText: { color: "#fff", textAlign: "center" }
});
