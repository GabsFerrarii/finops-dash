import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useStore, Expense } from '../store/useStore';
import { ExpenseListItem } from './ExpenseListItem';
import { EditModal } from './EditModal';

interface ExpenseListProps {
  ListHeaderComponent?: React.ReactElement;
}

export const ExpenseList = ({ ListHeaderComponent }: ExpenseListProps) => {
  const { expenses, removeExpense } = useStore();
  const [editingItem, setEditingItem] = useState<Expense | null>(null);

  const handleEdit = (item: Expense) => {
    setEditingItem(item);
  };

  const handleDelete = (id: string) => {
    removeExpense(id);
  };

  return (
    <View className="flex-1">
      <FlatList
        data={expenses}
        keyExtractor={(item, index) => `expense-${item.id}-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            {ListHeaderComponent}
            <Text className="text-slate-400 font-semibold mb-4 mt-2">Despesas Recentes</Text>
          </>
        }
        ListEmptyComponent={
          <View className="items-center justify-center p-8 border border-slate-800 border-dashed rounded-2xl bg-slate-900/50">
            <Text className="text-slate-500 text-center">Nenhuma despesa adicionada ainda.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <ExpenseListItem 
            item={item} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        )}
      />

      <EditModal 
        visible={!!editingItem} 
        item={editingItem} 
        onClose={() => setEditingItem(null)} 
      />
    </View>
  );
};
