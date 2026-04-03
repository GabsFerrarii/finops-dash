import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { useStore } from '../store/useStore';

export const CategoryChart = () => {
   const { expenses } = useStore();

   if (!expenses || expenses.length === 0) return null;

   const categoryTotals: Record<string, number> = {};
   let total = 0;

   // Agregar valores por categoria
   expenses.forEach(exp => {
      const amt = exp.amount || 0;
      if (amt > 0) {
         categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + amt;
         total += amt;
      }
   });

   if (total === 0) return null;

   // Ordenar descrescente
   const entries = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
   const maxAmount = entries.length > 0 ? entries[0][1] : 1;

   return (
       <View className="mb-6 rounded-3xl bg-slate-900 border border-slate-800 p-5 overflow-hidden">
           {/* Efeito de luz decorativo */}
           <View className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full -ml-10 -mt-10 blur-2xl" />

           <Text className="text-slate-400 text-sm font-semibold mb-4 uppercase tracking-wider">Distribuição por Categoria</Text>
           
           {entries.map(([cat, amt], index) => {
               // A barra com maior gasto preenche 100% de seu slot, o restante é proporcional a esta
               const percentageOfMax = (amt / maxAmount) * 100;
               // O valor exibido na label é a % do total absoluto
               const percentageOfTotal = Math.round((amt / total) * 100);
               const isTop = index === 0;
               
               // emerald-400 se for o topo, slate-700 se não
               const barColor = isTop ? "#34d399" : "#334155";
               
               return (
                  <View key={`category-${cat}-${index}`} className="mb-4">
                     <View className="flex-row justify-between mb-1">
                        <Text className="text-slate-200 font-medium text-sm">{cat}</Text>
                        <Text className="text-slate-400 font-bold text-sm">{percentageOfTotal}%</Text>
                     </View>
                     <View className="h-3 w-full">
                         <Svg height="12" width="100%">
                            <Rect width="100%" height="12" rx="6" fill="#020617" />
                            <Rect width={`${percentageOfMax}%`} height="12" rx="6" fill={barColor} />
                         </Svg>
                     </View>
                  </View>
               );
           })}
       </View>
   );
};
