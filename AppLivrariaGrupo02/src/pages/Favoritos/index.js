import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favoritos = () => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    getFavoriteBooks();
  }, []);

  const getFavoriteBooks = async () => {
    try {
      const storedFavoriteBooks = await AsyncStorage.getItem('favoriteBooks');
      setFavoriteBooks(storedFavoriteBooks == null ? [] : JSON.parse(storedFavoriteBooks));
    } catch (error) {
      console.log('Ocorreu um erro ao recuperar os livros favoritos: ' + error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>Favoritos</Text>
      <FlatList
        data={favoriteBooks}
        keyExtractor={(item) => item.codigoLivro.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image
              style={styles.itemPhoto}
              source={{ uri: `data:image/png;base64,${item.img}` }}
            />
            <Text>{item.nomeLivro}</Text>
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemPhoto: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});

export default Favoritos;