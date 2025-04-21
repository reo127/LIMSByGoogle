// store/useStore.ts
import { create } from 'zustand';
import { Tabs } from '@/enums/nabItems';

type Store = {
  appBarOpen: boolean;
  activeTab: Tabs;
  setActiveTab: (tab: Tabs) => void;
  setAppBarClose: () => void;
  setAppBarOpen: () => void;
};

const useStore = create<Store>((set) => ({
  appBarOpen: false,
  activeTab: Tabs.Home, 
  setActiveTab: (tab) => set(() => ({ activeTab: tab })),
  setAppBarClose: () => set(() => ({ appBarOpen: false })),
  setAppBarOpen: () => set(() => ({ appBarOpen: true })),
}));

export default useStore;
