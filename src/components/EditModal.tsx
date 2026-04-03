import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Expense, useStore } from '../store/useStore';
import { Save, X } from 'lucide-react-native';

interface EditModalProps {
  visible: boolean;
  item: Expense | null;
  onClose: () => void;
}

export const EditModal = ({ visible, item, onClose }: EditModalProps) => {
  const { updateExpense } = useStore();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (item) {
      setDescription(item.description);
      setAmount(item.amount.toString());
    }
  }, [item]);

  const handleSave = () => {
    if (item) {
      const parsedAmount = parseFloat(amount.replace(',', '.'));
      if (!isNaN(parsedAmount)) {
        updateExpense(item.id, { description, amount: parsedAmount });
        onClose();
      }
    }
  };

  if (!item) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-end bg-slate-950/80"
      >
        <View className="bg-slate-900 rounded-t-3xl border-t border-slate-800 p-6 shadow-2xl">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold text-white">Editar Despesa</Text>
            <TouchableOpacity onPress={onClose} className="p-2 bg-slate-800 rounded-full">
              <X size={20} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          <View className="mb-4">
            <Text className="text-slate-400 mb-2 font-medium">Descrição</Text>
            <TextInput
              className="bg-slate-950 border border-slate-800 text-slate-200 p-4 rounded-xl text-base"
              value={description}
              onChangeText={setDescription}
              placeholderTextColor="#475569"
            />
          </View>

          <View className="mb-8">
            <Text className="text-slate-400 mb-2 font-medium">Valor (R$)</Text>
            <TextInput
              className="bg-slate-950 border border-slate-800 text-sky-400 font-bold p-4 rounded-xl text-base"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholderTextColor="#475569"
            />
          </View>

          <TouchableOpacity
            className="bg-emerald-500 rounded-xl p-4 flex-row justify-center items-center"
            onPress={handleSave}
          >
            <Save size={20} color="#020617" />
            <Text className="text-slate-950 font-bold text-lg ml-2">Salvar Alterações</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
