import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { PlusCircle, Search } from 'lucide-react-native';
import { parseInvoiceText } from '../utils/parser';
import { useStore } from '../store/useStore';

export const SmartInputArea = () => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { addExpense } = useStore();

  const previews = parseInvoiceText(text);

  const handleAddAll = () => {
    previews.forEach(preview => {
      addExpense({
        description: preview.description.substring(0, 30),
        amount: preview.amount,
        category: preview.category,
      });
    });
    setText('');
  };

  return (
    <View className="mb-6 rounded-2xl bg-slate-900 border border-slate-800 p-4">
      <Text className="text-slate-400 font-semibold mb-2">Smart Input (Colar Múltiplos)</Text>
      <View
        className={`bg-slate-950 rounded-xl p-3 border ${
          isFocused ? 'border-sky-500' : 'border-slate-800'
        }`}
      >
        <TextInput
          className="text-slate-300 text-base"
          multiline
          placeholder="Ex: Vercel R$ 110 AWS 540,00"
          placeholderTextColor="#475569"
          value={text}
          onChangeText={setText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ minHeight: 80, textAlignVertical: 'top' }}
        />
      </View>

      {previews.length > 0 && (
        <View className="mt-4 p-4 rounded-xl bg-emerald-950/30 border border-emerald-900/50">
          <View className="flex-row items-center mb-3">
            <Search size={16} color="#34d399" />
            <Text className="text-emerald-400 font-bold ml-2">Candidatos ({previews.length})</Text>
          </View>
          
          <View className="max-h-48 mb-3">
            <ScrollView showsVerticalScrollIndicator={true} nestedScrollEnabled={true}>
              {previews.map((preview) => (
                <View key={preview.id} className="mb-2 border-b border-emerald-900/30 pb-2">
                  <Text className="text-slate-200 font-bold">{preview.description}</Text>
                  <Text className="text-slate-300">Valor: <Text className="text-white font-bold">R$ {(preview.amount || 0).toFixed(2)}</Text></Text>
                  <Text className="text-slate-300">Categoria: <Text className="text-sky-400 font-bold">{preview.category}</Text></Text>
                  <Text className="text-slate-500 text-xs italic">{preview.reason}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          <TouchableOpacity
            className="flex-row justify-center items-center bg-emerald-500 rounded-lg p-3"
            onPress={handleAddAll}
          >
            <PlusCircle size={20} color="#020617" />
            <Text className="text-slate-950 font-bold ml-2 text-base">Salvar Todos</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
