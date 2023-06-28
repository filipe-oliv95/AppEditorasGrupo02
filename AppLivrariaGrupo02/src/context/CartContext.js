import React, { createContext, useState } from "react";

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [quantidade, setQuantidade] = useState(0);

  console.log("Adicionado ao carrinho")
  const adicionarAoCarrinho = (item) => {  // verifica se tem item no carrinho, se não houver, o livro é adicionado
    if (!carrinho.some((cartItem) => cartItem.codigoLivro === item.codigoLivro)) {
      setCarrinho(carrinhoAtual => [...carrinhoAtual, item]);
      setQuantidade(quantidadeCarrinho => quantidadeCarrinho + 1);
    } else {
      alert("Este livro já está no carrinho!");
    }
  }
  // console.log(carrinho)
  console.log(quantidade)

  const removerDoCarrinho = (codigoLivro) => {
    setCarrinho(carrinhoAtual => carrinhoAtual.filter(item => item.codigoLivro !== codigoLivro));
    setQuantidade(quantidadeCarrinho => quantidadeCarrinho - 1);
  }

  const limparCarrinho = () => {
    setCarrinho([]);
    setQuantidade(0);
  }

  return (
    <CartContext.Provider
      value={{ carrinho, quantidade, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho }}>
      {children}
    </CartContext.Provider>
  )
}