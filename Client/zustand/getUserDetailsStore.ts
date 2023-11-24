import { create } from 'zustand';
import { GET_USER_DETAILS } from './apiUrls';

interface UserData {
  image?: string;
  name?: string;
  email?: string;
  age?: number;
  salary?: number;
  description?: string;
}


interface GetUserDetailsStoreProps {
  userData: UserData;
  loading: boolean;
  fetchPosts: (itemId: string | undefined) => Promise<void>;
  setUserData: (data: UserData) => void;
}


//zustand store for GetUserDetailsStore
const GetUserDetailsStore = create<GetUserDetailsStoreProps>((set) => ({
  userData: {},
  loading: true,
  fetchPosts: async (itemId: string | undefined) => {
    try {
      if (itemId) {
        const response = await fetch(`${GET_USER_DETAILS}${itemId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        set((state) => ({ userData: data, loading: false }));
      }
    } catch (err) {
      console.error('Error in fetching the data', err);
      set((state) => ({ loading: false }));
    }
  },
  setUserData: (data) => set((state) => ({ userData: data })),
}));

export default GetUserDetailsStore;