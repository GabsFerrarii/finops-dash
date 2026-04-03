import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Expense = {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
};

type StoreState = {
  expenses: Expense[];
  isLoading: boolean;
  addExpense: (expense: Omit<Expense, 'id' | 'date'>) => void;
  updateExpense: (id: string, updates: Partial<Expense>) => void;
  removeExpense: (id: string) => void;
  loadFromStorage: () => Promise<void>;
  resetStore: () => Promise<void>;
};

const MOCK_DATA: Expense[] = [
  { id: '1', description: 'AWS EC2 + RDS', amount: 450.00, category: 'Infra', date: new Date().toISOString() },
  { id: '2', description: 'Google Cloud Storage', amount: 120.50, category: 'Infra', date: new Date().toISOString() },
  { id: '3', description: 'Vercel Pro', amount: 100.00, category: 'Infra', date: new Date().toISOString() },
  { id: '4', description: 'Starten Host (Hospedagem RN)', amount: 49.90, category: 'Infra', date: new Date().toISOString() },
  { id: '5', description: 'MongoDB Atlas', amount: 230.00, category: 'Database', date: new Date().toISOString() },
];

export const useStore = create<StoreState>((set, get) => ({
  expenses: [],
  isLoading: true,
  addExpense: (expense) => {
    const newExpense: Expense = {
      ...expense,
      id: Math.random().toString(36).substring(2, 11) + Date.now().toString(36),
      date: new Date().toISOString(),
    };
    set((state) => {
      const updated = [newExpense, ...state.expenses];
      AsyncStorage.setItem('@expenses', JSON.stringify(updated));
      return { expenses: updated };
    });
  },
  updateExpense: (id, updates) => {
    set((state) => {
      const updated = state.expenses.map(e => e.id === id ? { ...e, ...updates } : e);
      AsyncStorage.setItem('@expenses', JSON.stringify(updated));
      return { expenses: updated };
    });
  },
  removeExpense: (id) => {
    set((state) => {
      const updated = state.expenses.filter(e => e.id !== id);
      AsyncStorage.setItem('@expenses', JSON.stringify(updated));
      return { expenses: updated };
    });
  },
  loadFromStorage: async () => {
    try {
      const stored = await AsyncStorage.getItem('@expenses');
      if (stored) {
        let parsed: Expense[] = JSON.parse(stored);
        
        let needsUpdate = false;
        parsed = parsed.map(exp => {
          let newCat = exp.category;
          if (newCat === 'Infraestrutura' || newCat === 'Hospedagem') {
            newCat = 'Infra';
            needsUpdate = true;
          }
          return { ...exp, category: newCat };
        });

        if (needsUpdate) {
          await AsyncStorage.setItem('@expenses', JSON.stringify(parsed));
        }

        set({ expenses: parsed, isLoading: false });
      } else {
        await AsyncStorage.setItem('@expenses', JSON.stringify(MOCK_DATA));
        set({ expenses: MOCK_DATA, isLoading: false });
      }
    } catch (e) {
      console.error('Failed to load expenses', e);
      set({ isLoading: false });
    }
  },
  resetStore: async () => {
    set({ isLoading: true });
    await AsyncStorage.removeItem('@expenses');
    await AsyncStorage.setItem('@expenses', JSON.stringify(MOCK_DATA));
    set({ expenses: MOCK_DATA, isLoading: false });
  }
}));
