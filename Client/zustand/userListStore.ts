import { create } from 'zustand';
import { GET_USER_LIST } from './apiUrls';

interface UserListStoreProps {
  filterData: any[];
  userListData: any[];
  search: string;
  setSearch: (search: string) => void;
  fetchPosts: () => Promise<void>;
  searchFilter: (text: string) => void;
}


//zustand for UserListStore
const UserListStore = create<UserListStoreProps>(set => ({
  filterData: [],
  userListData: [],
  search: '',
  setSearch: (search) => set({ search }),
  fetchPosts: async () => {
    try {
      const response = await fetch(GET_USER_LIST, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      set({ userListData: data, filterData: data });
    } catch (err) {
      console.error('Error in fetching the data', err);
    }
  },
  searchFilter: (text) => set((state) => {
    const searchData = text.toLowerCase();
    const newData = state.userListData.filter((item) => {
      const itemName = item.name ? item.name.toLowerCase() : '';
      return itemName.includes(searchData);
    });
    return { filterData: newData, search: text };
  }),

}));

export default UserListStore;
