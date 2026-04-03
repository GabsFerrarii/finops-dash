import React from 'react';
import { View, Text } from 'react-native';
import { useStore } from '../store/useStore';
import { Activity, Calendar, Zap } from 'lucide-react-native';

export const SummaryCard = () => {
  const { expenses } = useStore();

  const totalMonthly = expenses.reduce((sum, item) => sum + item.amount, 0);
  const burnRate = totalMonthly / 720; // Aproximadamente 720 horas em um mês
  const annualProjection = totalMonthly * 12;

  const formatCurrency = (val: number) => `R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <View className="mb-6 rounded-3xl bg-slate-900 border border-slate-800 p-5 overflow-hidden">
      {/* Decorative background element */}
      <View className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full -mr-10 -mt-10 blur-2xl" />

      <Text className="text-slate-400 text-sm font-semibold mb-1 uppercase tracking-wider">Custo Mensal</Text>
      <Text className="text-4xl font-extrabold text-emerald-400 mb-6">
        {formatCurrency(totalMonthly)}
      </Text>

      <View className="flex-row justify-between pt-4 border-t border-slate-800">
        <View className="flex-1 mr-2">
          <View className="flex-row items-center mb-1">
            <Zap size={14} color="#0ea5e9" opacity={0.8} />
            <Text className="text-slate-500 text-xs ml-1 font-medium">Burn Rate/Hora</Text>
          </View>
          <Text className="text-sky-500 font-bold text-base">
            {formatCurrency(burnRate)}
          </Text>
        </View>

        <View className="flex-1 ml-2">
          <View className="flex-row items-center mb-1">
            <Calendar size={14} color="#f43f5e" opacity={0.8} />
            <Text className="text-slate-500 text-xs ml-1 font-medium">Projeção Anual</Text>
          </View>
          <Text className="text-slate-300 font-bold text-base">
            {formatCurrency(annualProjection)}
          </Text>
        </View>
      </View>
    </View>
  );
};
