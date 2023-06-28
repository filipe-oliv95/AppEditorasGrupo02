import React, { createContext, useState } from "react";

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [quantidade, setQuantidade] = useState(0);

  console.log("Adicionado ao carrinho")
  const adicionarAoCarrinho = (item) => {
    setCarrinho(carrinhoAtual => [...carrinhoAtual, item]);
    setQuantidade(quantidadeCarrinho => quantidadeCarrinho + 1);
  }
  // console.log(carrinho)
  console.log(quantidade)

  const removerDoCarrinho = (codigoLivro) => {
    setCarrinho(carrinhoAtual => carrinhoAtual.filter(item => item.codigoLivro !== codigoLivro));
    setQuantidade(quantidadeCarrinho => quantidadeCarrinho - 1);
  }

  return (
    <CartContext.Provider
      value={{ carrinho, quantidade, adicionarAoCarrinho, removerDoCarrinho }}>
      {children}
    </CartContext.Provider>
  )
}