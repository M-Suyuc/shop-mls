import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };

  addProducToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProductFromCart: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  persist(
    devtools((set, get) => ({
      cart: [],

      getTotalItems: () => {
        const { cart } = get();

        return cart.reduce((acc, product) => acc + product.quantity, 0);
      },

      getSummaryInformation: () => {
        const { cart } = get();
        const subTotal = cart.reduce(
          (acc, product) => acc + product.quantity * product.price,
          0
        );
        //? 👇 Impuestos
        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce(
          (acc, product) => acc + product.quantity,
          0
        );

        return {
          subTotal,
          tax,
          total,
          itemsInCart,
        };
      },

      addProducToCart: (product: CartProduct) => {
        const { cart } = get();

        const productInCart = cart.some(
          (p) => p.id === product.id && p.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        const updateCartProducts = cart.map((p) => {
          if (p.id === product.id && p.size === product.size) {
            return {
              ...p,
              quantity: p.quantity + product.quantity,
            };
          }

          return p;
        });

        set({ cart: updateCartProducts });
      },

      updateProductQuantity: (product: CartProduct, quantity) => {
        // console.log(product, quantity);
        const { cart } = get();

        const updateCartProducts = cart.map((p) => {
          if (p.id === product.id && p.size === product.size) {
            return {
              ...p,
              quantity: quantity,
            };
          }

          return p; //! Si no es el producto que buscamos  lo regresamos en camnio si si tienne la condicon de arriba del if actualizamos el quantity
        });

        set({ cart: updateCartProducts });
      },

      removeProductFromCart: (product: CartProduct) => {
        const { cart } = get();

        const updateCartProducts = cart.filter(
          (p) => p.id !== product.id || p.size !== product.size
        );

        set({ cart: updateCartProducts });
      },
    })),
    {
      name: "cart-mls-shop",
    }
  )
);
