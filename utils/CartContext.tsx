import { Product } from './interface';
import React, { createContext, useState } from 'react';

type ConstextType = {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
};

export const CartContext = createContext<ConstextType>({} as ConstextType);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const addProduct = (product: Product) => {
    product.Quantite = 1;
    const productArr = cart;
    setCart([...productArr, product]);
  };
  const removeProduct = (product: Product) => {
    const newcart = cart.filter((addedproduct) => addedproduct.id !== product.id);
    setCart(newcart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addProduct,
        removeProduct,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
