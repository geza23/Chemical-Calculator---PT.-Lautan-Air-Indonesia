// Aplikasi Kalkulasi Flow & Dosis + Loading Chemical
// PT Lautan Air Indonesia - React Native (Expo)

import React, { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function App() {
  const [volume, setVolume] = useState(0);
  const [waktu, setWaktu] = useState(1);
  const [flowLph, setFlowLph] = useState(0);
  const [lphInput, setLphInput] = useState(0);

  const [airVolume, setAirVolume] = useState(1000);
  const [sciPercent] = useState(2);
  const [zpPercent] = useState(15);

  // Flow kalkulasi: (mL ÷ detik) × 3.6 = LPH
  const calculateFlow = () => {
    const flow = (volume / waktu) * 3.6;
    setFlowLph(flow.toFixed(2));
  };

  // Dosis kalkulasi: ppm = (flow (LPH) / recirculation rate (m3/h)) × 1.000.000
  const calculateDose = () => {
    const dosis = (lphInput / 11200) * 1e6;
    return dosis.toFixed(2);
  };

  // Loading chemical dari persentase larutan
  const calculateLoad = (percent) => {
    return ((percent / 100) * airVolume).toFixed(2);
  };

  return (
    <ScrollView className="p-4 bg-blue-50 min-h-screen">
      <View className="items-center mb-4">
        <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Lautan_Luas_Logo.png' }} style={{ width: 100, height: 100 }} resizeMode="contain" />
        <Text className="text-xl font-bold text-blue-800 mt-2">PT Lautan Air Indonesia</Text>
      </View>

      <Tabs defaultValue="flow">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="flow">Flow & Dosis</TabsTrigger>
          <TabsTrigger value="loading">Loading Chemical</TabsTrigger>
        </TabsList>

        {/* Flow & Dosis */}
        <TabsContent value="flow">
          <Card className="mb-4">
            <CardContent className="space-y-2">
              <Text className="font-bold text-blue-700">Hitung Flow</Text>
              <Label>Pengurangan Volume (mL)</Label>
              <Input keyboardType="numeric" onChangeText={(v) => setVolume(parseFloat(v) || 0)} />
              <Label>Waktu (detik)</Label>
              <Input keyboardType="numeric" onChangeText={(v) => setWaktu(parseFloat(v) || 1)} />
              <Text className="text-blue-700">Flow: {flowLph} LPH</Text>
              <Text onPress={calculateFlow} className="text-white bg-blue-600 px-4 py-2 rounded text-center">
                Hitung Flow
              </Text>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-2">
              <Text className="font-bold text-blue-700">Hitung Dosis</Text>
              <Label>Flow (LPH)</Label>
              <Input keyboardType="numeric" onChangeText={(v) => setLphInput(parseFloat(v) || 0)} />
              <Text className="text-blue-700">Dosis: {calculateDose()} ppm</Text>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Loading Chemical */}
        <TabsContent value="loading">
          <Card className="mb-4">
            <CardContent className="space-y-2">
              <Text className="font-bold text-blue-700">SCI 45 - Larutan 2%</Text>
              <Label>Volume Air (Liter)</Label>
              <Input keyboardType="numeric" value={airVolume.toString()} onChangeText={(v) => setAirVolume(parseFloat(v) || 0)} />
              <Text className="text-blue-700">Chemical Dibutuhkan: {calculateLoad(sciPercent)} L</Text>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-2">
              <Text className="font-bold text-blue-700">ZP 35 - Larutan 15%</Text>
              <Label>Volume Air (Liter)</Label>
              <Input keyboardType="numeric" value={airVolume.toString()} onChangeText={(v) => setAirVolume(parseFloat(v) || 0)} />
              <Text className="text-blue-700">Chemical Dibutuhkan: {calculateLoad(zpPercent)} L</Text>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </ScrollView>
  );
}
