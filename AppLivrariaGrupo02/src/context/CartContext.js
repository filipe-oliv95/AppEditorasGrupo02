import React, { createContext, useState } from "react";

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [quantidade, setQuantidade] = useState(0);

  const adicionarAoCarrinho = () => {
    setQuantidade({

    })

  }

  return (
    <CartContext.Provider
      value={{ quantidade, adicionarAoCarrinho }}>
      {children}
    </CartContext.Provider>

  )
}