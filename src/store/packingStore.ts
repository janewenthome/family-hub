import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PackingState } from '../types';

export const usePackingStore = create<PackingState>()(
  persist(
    (set, get) => ({
      checkedItems: {},
      toggleItem: (itemId: string) =>
        set((state) => ({
          checkedItems: {
            ...state.checkedItems,
            [itemId]: !state.checkedItems[itemId],
          },
        })),
      resetAll: () => set({ checkedItems: {} }),
      getProgress: (categoryId, items) => {
        const checkedItems = get().checkedItems;
        const categoryItems = items || [];
        const total = categoryItems.length;
        const checked = categoryItems.filter((item) => checkedItems[item.id]).length;
        return { checked, total };
      },
      getTotalProgress: (categories) => {
        const checkedItems = get().checkedItems;
        let total = 0;
        let checked = 0;
        categories.forEach((cat) => {
          const catItems = cat.items || [];
          total += catItems.length;
          checked += catItems.filter((item) => checkedItems[item.id]).length;
        });
        return { checked, total };
      },
    }),
    {
      name: 'family-hub-packing',
    }
  )
);
