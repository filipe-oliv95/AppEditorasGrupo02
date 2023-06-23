import React, { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import { StyleSheet, View, Text, FlatList, Image, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance from '../../api/AxiosInstance';
import { useFocusEffect } from '@react-navigation/native';
import StarRating from 'react-native-star-rating-widget';
import { FontAwesome5 } from '@expo/vector-icons';


const Favoritos = () => {
  const { dadosUsuario } = useContext(DataContext);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [rating, setRating] = useState({});

  // tem que usar esse useFocus para disparar getFavorite sempre que entrar nos Favoritos
  useFocusEffect(
    React.useCallback(() => {
      getFavoriteBooks();
    }, [])
  );

  const handleRemove = async (id) => {
    try {
      let favoriteBooksIds = await AsyncStorage.getItem('favoriteBooks');
      favoriteBooksIds = favoriteBooksIds == null ? [] : JSON.parse(favoriteBooksIds);

      const updatedFavoriteBooksIds = favoriteBooksIds.filter(livroId => livroId.codigoLivro !== id);
      await AsyncStorage.setItem('favoriteBooks', JSON.stringify(updatedFavoriteBooksIds));

      setFavoriteBooks(favoriteBooks.filter(livro => livro.codigoLivro !== id));
    } catch (error) {
      console.log('Failed to remove book: ' + error);
    }
  };


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
    <SafeAreaView style={styles.container}>
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
            {(
              <StarRating
                rating={rating[item.codigoLivro] || 0}
                onChange={(newRating) => setRating({ ...rating, [item.codigoLivro]: newRating })}
              />
            )}
            <View style={styles.itemContent}>
              <Text style={styles.itemTextLivros}>{item.autorDTO.nomeAutor}</Text>
            </View>
            <TouchableOpacity onPress={() => handleRemove(item.codigoLivro)}>
              <FontAwesome5 name="heart-broken" size={24} color="#66d2b1" />
            </TouchableOpacity>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#51cba6',
  },
  sectionHeader: {
    marginTop: 15,
    fontSize: 30,
    color: '#04140f',
  },
  contentContainer: {
    padding: 15,
    backgroundColor: '#07261d',
    borderRadius: 13,
    display: 'flex',
    gap: 10,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 13,
  },
  itemTextLivros: {
    color: '#66d2b1',
    fontSize: 18,
    marginVertical: 5,
    marginHorizontal: 10,
  },
});

export default Favoritos;