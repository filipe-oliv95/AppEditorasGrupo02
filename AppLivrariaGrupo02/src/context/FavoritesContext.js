import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { getValueFor } from '../services/DataService';

export const FavoritesContext = createContext({});

export const FavoritesProvider = ({ children }) => {
  const [contagemFavoritos, setcontagemFavoritos] = useState(0);

  const contagemFavAtualizada = async () => {
    const livrosFavArmazenados = await getValueFor('favoriteBooks');
    const novaContagem = livrosFavArmazenados ? JSON.parse(livrosFavArmazenados).length : 0;
    setcontagemFavoritos(novaContagem);
    await SecureStore.setItemAsync('contagemFavoritos', String(novaContagem));
  };

  useEffect(() => {
    contagemFavAtualizada();
  }, []);

  return (
    <FavoritesContext.Provider
      value={{ contagemFavoritos, contagemFavAtualizada }}>
      {children}
    </FavoritesContext.Provider>
  )
}
