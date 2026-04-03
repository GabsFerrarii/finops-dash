import './global.css'; // NativeWind v4 requires this
import React, { useEffect } from 'react';
import { View, StatusBar, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from './src/store/useStore';
import { SummaryCard } from './src/components/SummaryCard';
import { CategoryChart } from './src/components/CategoryChart';
import { SmartInputArea } from './src/components/SmartInputArea';
import { ExpenseList } from './src/components/ExpenseList';

export default function App() {
  const { loadFromStorage, isLoading, resetStore } = useStore();

  useEffect(() => {
    loadFromStorage();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 bg-slate-950 justify-center items-center">
        <Text className="text-emerald-400">Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-slate-950">
        <StatusBar barStyle="light-content" backgroundColor="#020617" />
        <View className="flex-1 px-5 pt-8">
          <ExpenseList 
            ListHeaderComponent={
              <View className="mb-2">
                <View className="mb-6 flex-row justify-between items-center">
                  <View>
                    <Text className="text-3xl font-black text-white tracking-tight">FinOps <Text className="text-emerald-400">Dash</Text></Text>
                    <Text className="text-slate-400 mt-1">Gestão de custos em nuvem</Text>
                  </View>
                  <TouchableOpacity onPress={resetStore} className="bg-slate-900 px-3 py-2 rounded-lg border border-slate-700">
                    <Text className="text-slate-300 font-bold text-xs">RESET</Text>
                  </TouchableOpacity>
                </View>
                <SummaryCard />
                <CategoryChart />
                <SmartInputArea />
              </View>
            }
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
