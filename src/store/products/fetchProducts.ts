// import { fetchAllProducts } from '@/utils'
import { create } from "zustand";
import { initialData } from "@/seed/seed";
import { Product } from "@/interfaces";

interface State {
  products: Product[];
  isLoading: boolean;
  error: any;
}

interface Actions {
  fetchData: () => Promise<void>;
}

// const url =
//   'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=es&lang=es&currentpage=0&pagesize=30'
// const options = {
//   method: 'GET',
//   headers: {
//     'x-rapidapi-key': 'cbb3c606d5msh5444dd9e7f27566p1884d1jsn7ad42a5005fa',
//     'x-rapidapi-host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com'
//   }
// }

export const useProductsStore = create<State & Actions>()((set, get) => ({
  products: [],
  isLoading: false,
  error: null,
  fetchData: async () => {
    try {
      set({ isLoading: true, error: null });

      // const { results } = await fetchAllProducts()
      // const response = await fetch(url, options)

      // if (!response.ok) {
      //   const error = new Error('An error ocurred while feching the data')
      //   throw error
      // }
      // const { results } = (await response.json()) as SeedProducts
      // set({ products: results, isLoading: false })

      set({ products: initialData.products, isLoading: false });
    } catch (error) {
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },
}));
