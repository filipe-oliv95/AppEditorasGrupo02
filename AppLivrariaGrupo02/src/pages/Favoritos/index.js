import React, { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import { StyleSheet, View, Text, FlatList, Image, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import AxiosInstance from '../../api/AxiosInstance';
import { useFocusEffect } from '@react-navigation/native';
import StarRating from 'react-native-star-rating-widget';

import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { AppearanceContext } from '../../context/AppearanceContext';
import { sharedStyles, darkStyles, lightStyles } from '../../themes/index';
import { getValueFor, deleteLivros, save } from '../../services/DataService';


const Favoritos = () => {
  const { dadosUsuario } = useContext(DataContext);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [rating, setRating] = useState({});
  const { colorScheme } = useContext(AppearanceContext);

  const style = colorScheme === 'light' ? lightStyles : darkStyles;
  // tem que usar esse useFocus para disparar getFavorite sempre que entrar nos Favoritos
  useFocusEffect(
    React.useCallback(() => {
      getFavoriteBooks();
    }, [])
  );

  const handleRemove = async (id) => {
    try {
      let favoriteBooksIds = await getValueFor('favoriteBooks');
      favoriteBooksIds = favoriteBooksIds == null ? [] : JSON.parse(favoriteBooksIds);

      const newFavoriteBooksIds = favoriteBooksIds.filter(bookId => bookId !== id);

      await save('favoriteBooks', newFavoriteBooksIds);

      setFavoriteBooks(prevState => prevState.filter(book => book.codigoLivro !== id));
    } catch (error) {
      console.log('Error removing favorite book: ' + error);
    }
  };

  const getFavoriteBooks = async () => {
    try {
      const storedFavoriteBooksIds = await getValueFor('favoriteBooks');
      const favoriteBooksIds = storedFavoriteBooksIds == null ? [] : JSON.parse(storedFavoriteBooksIds);

      const favoriteBooks = [];
      for (const id of favoriteBooksIds) {
        const response = await AxiosInstance.get(`/livros/${id}`, {
          headers: { Authorization: `Bearer ${dadosUsuario?.token}` },
        });
        favoriteBooks.push(response.data);
      }
      setFavoriteBooks(favoriteBooks);

    } catch (error) {
      console.log('Ocorreu um erro ao recuperar os livros favoritos: ' + error);
    }
  };

  console.log("FAVORITOS" + favoriteBooks)

  return (
    <SafeAreaView style={[sharedStyles.container, style.container, { flex: 1 }]}>
      <StatusBar style="light" />
      <FlatList
        data={favoriteBooks}
        keyExtractor={(item) => item.codigoLivro.toString()}
        renderItem={({ item }) => (
          <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
            <View style={styles.contentContainer}>
              <Image
                style={sharedStyles.imgLivroSearch}
                source={{ uri: `data:image/png;base64,${item.img}` }}
              />
              <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 10 }}>
                <Text style={[sharedStyles.text, { fontSize: 18 }]}>{item.nomeLivro}</Text>
                <Text style={sharedStyles.textGrey}>{item.autorDTO.nomeAutor}</Text>
                {(
                  <StarRating
                    rating={rating[item.codigoLivro] || 0}
                    onChange={(newRating) => setRating({ ...rating, [item.codigoLivro]: newRating })}
                    color="#FFE500"
                  />
                )}
                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: '#089A6E', borderRadius: 13, width: 220, alignItems: 'center', height: 30, justifyContent: 'center' }} onPress={() => console.log("comprar pressionado")}>
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, }}>Adicionar ao carrinho</Text>
                  <AntDesign style={{ paddingLeft: 15 }} name="shoppingcart" size={25} color="#fff" />
                </TouchableOpacity >
              </View>
              <FontAwesome5 style={{ position: 'absolute', top: 0, right: 0, padding: 20 }} name="heart-broken" size={24} color="#66d2b1" onPress={() => handleRemove(item.codigoLivro)} />
            </View>
            <View style={{ width: '100%', height: 1, backgroundColor: '#9D9A9A' }}></View>
          </View>

        )}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  sectionHeader: {
    marginTop: 15,
    fontSize: 30,
    color: '#04140f',
  },
  contentContainer: {
    padding: 15,
    borderRadius: 13,
    display: 'flex',
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    position: 'relative',
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