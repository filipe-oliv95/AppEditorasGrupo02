import React, { createContext, useState } from "react";

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);

  const totalQuantidade = carrinho.reduce((total, item) => total + item.quantidade, 0);

  console.log("Adicionado ao carrinho")
  const adicionarAoCarrinho = (item) => {
    if (!carrinho.some((cartItem) => cartItem.codigoLivro === item.codigoLivro)) {
      setCarrinho(carrinhoAtual => [...carrinhoAtual, { ...item, quantidade: 1 }]);
    } else {
      alert("Este livro já está no carrinho!");
    }
  }

  console.log("Quantidade CartContext" + totalQuantidade)

  const removerDoCarrinho = (codigoLivro) => {
    setCarrinho(carrinho.filter(item => item.codigoLivro !== codigoLivro));
  }

  const aumentarQuantidade = (codigoLivro) => {
    setCarrinho(carrinho.map(item => item.codigoLivro === codigoLivro ? { ...item, quantidade: item.quantidade + 1 } : item));
  };

  const diminuirQuantidade = (codigoLivro) => {
    let carrinhoAtualizado = carrinho.map(item => item.codigoLivro === codigoLivro ? { ...item, quantidade: item.quantidade > 1 ? item.quantidade - 1 : 1 } : item);
    setCarrinho(carrinhoAtualizado);
  };

  const limparCarrinho = () => {
    setCarrinho([]);
  }

  return (
    <CartContext.Provider
      value={{ carrinho, totalQuantidade, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho, aumentarQuantidade, diminuirQuantidade }}>
      {children}
    </CartContext.Provider>
  )
}
