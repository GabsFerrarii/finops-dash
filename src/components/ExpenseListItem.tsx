import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Expense } from '../store/useStore';
import { Server, Layout, Database, CircleDollarSign, Edit2, Trash2 } from 'lucide-react-native';

interface ExpenseListItemProps {
  item: Expense;
  onEdit: (item: Expense) => void;
  onDelete: (id: string) => void;
}

export const ExpenseListItem = ({ item, onEdit, onDelete }: ExpenseListItemProps) => {
  const getIcon = () => {
    switch (item.category) {
      case 'Infra':
      case 'Infraestrutura':
        return <Server size={20} color="#0ea5e9" />;
      case 'Hospedagem':
        return <Layout size={20} color="#a855f7" />;
      case 'Database':
        return <Database size={20} color="#f59e0b" />;
      default:
        return <CircleDollarSign size={20} color="#64748b" />;
    }
  };

  return (
    <View className="flex-row items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl mb-3 shadow-lg">
      <View className="w-10 h-10 rounded-full bg-slate-950 items-center justify-center border border-slate-800 mr-4">
        {getIcon()}
      </View>
      
      <View className="flex-1">
        <Text className="text-slate-200 font-bold text-base" numberOfLines={1}>{item.description}</Text>
        <Text className="text-slate-500 text-xs mt-0.5">{item.category}</Text>
      </View>
      
      <View className="items-end mr-4">
        <Text className="text-emerald-400 font-bold">
          R$ {(item.amount || 0).toFixed(2)}
        </Text>
      </View>
      
      <View className="flex-row">
        <TouchableOpacity 
          className="p-2 bg-slate-800 rounded-full mr-2"
          onPress={() => onEdit(item)}
        >
          <Edit2 size={14} color="#94a3b8" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="p-2 bg-rose-950 rounded-full"
          onPress={() => onDelete(item.id)}
        >
          <Trash2 size={14} color="#f43f5e" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
