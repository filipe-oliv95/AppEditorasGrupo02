import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../context/DataContext';
import Header from '../../components/Header';
import { StyleSheet, View, Text, FlatList, Image, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance from '../../api/AxiosInstance';
import { useFocusEffect } from '@react-navigation/native';

const Favoritos = () => {
  const { dadosUsuario } = useContext(DataContext);
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  // tem que usar esse useFocus para disparar getFavorite sempre que entrar nos Favoritos
  useFocusEffect(
    React.useCallback(() => {
      getFavoriteBooks();
    }, [])
  );

  const getFavoriteBooks = async () => {
    try {  // busca apenas o id no AsyncStorage
      const storedFavoriteBooksIds = await AsyncStorage.getItem('favoriteBooks');
      const favoriteBooksIds = storedFavoriteBooksIds == null ? [] : JSON.parse(storedFavoriteBooksIds);

      const favoriteBooks = [];
      for (const id of favoriteBooksIds) { // busca pelos id nos favoritos da pessoa para renderizar a lista
        const response = await AxiosInstance.get(`/livros/${id.codigoLivro}`, {
          headers: { Authorization: `Bearer ${dadosUsuario?.token}` },
        });
        favoriteBooks.push(response.data);
      }
      setFavoriteBooks(favoriteBooks);

    } catch (error) {
      console.log('Ocorreu um erro ao recuperar os livros favoritos: ' + error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.sectionHeader}>Favoritos</Text>
      <FlatList
        data={favoriteBooks}
        keyExtractor={(item) => item.codigoLivro.toString()}
        renderItem={({ item }) => (
          <View style={styles.contentContainer}>
            <Text style={styles.itemTextLivros}>{item.nomeLivro}</Text>
            <Image
              style={styles.itemPhoto}
              source={{ uri: `data:image/png;base64,${item.img}` }}
            />
            <View style={styles.itemContent}>
              <Text style={styles.itemTextLivros}>{item.autorDTO.nomeAutor}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    fontSize: 30,

  },
  contentContainer: {
    padding: 15,
    backgroundColor: 'white',
    borderColor: '#555',
    borderWidth: 1,
    display: 'flex',
    gap: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  itemContent: {
    // margin: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },
  itemPhoto: {
    width: 200,
    height: 200,
  },
  itemTextLivros: {
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 18,
    marginVertical: 5,
    marginHorizontal: 10,
  },
});

export default Favoritos;