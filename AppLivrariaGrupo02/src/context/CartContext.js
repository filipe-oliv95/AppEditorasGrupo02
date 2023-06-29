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

  const aumentarQuantidade = (codigoLivro) => {
    setCarrinho(carrinhoAtual => carrinhoAtual.map(item => item.codigoLivro === codigoLivro ? { ...item, quantidade: item.quantidade + 1 } : item));
    setQuantidade(quantidadeCarrinho => quantidadeCarrinho + 1);
  };

  const diminuirQuantidade = (codigoLivro) => {
    let carrinhoAtualizado = carrinho.map(item => item.codigoLivro === codigoLivro ? { ...item, quantidade: item.quantidade - 1 } : item);
    let reduzirItem = carrinhoAtualizado.find(item => item.codigoLivro === codigoLivro);
    if (reduzirItem.quantidade === 0) {
      carrinhoAtualizado = carrinhoAtualizado.filter(item => item.codigoLivro !== codigoLivro);
    }
    setCarrinho(carrinhoAtualizado);
    setQuantidade(quantidadeCarrinho => quantidadeCarrinho - 1);
  };

  const limparCarrinho = () => {
    setCarrinho([]);
    setQuantidade(0);
  }

  return (
    <CartContext.Provider
      value={{ carrinho, quantidade, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho, aumentarQuantidade, diminuirQuantidade }}>
      {children}
    </CartContext.Provider>
  )
}