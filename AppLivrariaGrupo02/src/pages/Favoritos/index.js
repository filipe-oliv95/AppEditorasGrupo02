import { useFocusEffect } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import AxiosInstance from '../../api/AxiosInstance';
import { DataContext } from '../../context/DataContext';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { AppearanceContext } from '../../context/AppearanceContext';
import { CartContext } from '../../context/CartContext';
import { FavoritesContext } from '../../context/FavoritesContext';
import { getValueFor, save } from '../../services/DataService';
import { darkStyles, lightStyles, sharedStyles } from '../../themes/index';

const Favoritos = () => {
  const { dadosUsuario } = useContext(DataContext);
  const { adicionarAoCarrinho } = useContext(CartContext);
  const { contagemFavAtualizada } = useContext(FavoritesContext);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [rating, setRating] = useState({});
  const { isEnabled } = useContext(AppearanceContext);
  const [isLoading, setIsLoading] = useState(false);

  const style = isEnabled ? lightStyles : darkStyles;
  // tem que usar esse useFocus para disparar getFavorite sempre que entrar nos Favoritos
  useFocusEffect(
    React.useCallback(() => {
      getFavoriteBooks();
    }, [])
  );

  const handleRemove = async (id) => {
    try {
      let idsLivrosFavoritos = await getValueFor('favoriteBooks');
      idsLivrosFavoritos = idsLivrosFavoritos == null ? [] : JSON.parse(idsLivrosFavoritos);

      const novoIdsLivrosFavoritos = idsLivrosFavoritos.filter(bookId => bookId !== id);

      await save('favoriteBooks', novoIdsLivrosFavoritos);

      setFavoriteBooks(prevState => prevState.filter(book => book.codigoLivro !== id));
      contagemFavAtualizada();  // atualiza contagem na remoção dos favoritos
    } catch (error) {
      console.log('Erro removendo livro dos favoritos: ' + error);
    }
  };

  const getFavoriteBooks = async () => {
    setIsLoading(true);
    try {
      const idsLivrosFavSalvos = await getValueFor('favoriteBooks');
      const idsLivrosFavoritos = idsLivrosFavSalvos == null ? [] : JSON.parse(idsLivrosFavSalvos);
      const favoriteBooks = [];
      for (const id of idsLivrosFavoritos) {
        const response = await AxiosInstance.get(`/livros/${id}`, {
          headers: { Authorization: `Bearer ${dadosUsuario?.token}` },
        });
        favoriteBooks.push(response.data);
      }
      setFavoriteBooks(favoriteBooks);
      setIsLoading(false);

    } catch (error) {
      console.log('Ocorreu um erro ao recuperar os livros favoritos: ' + error);
      setIsLoading(false);
    }
  };

  // console.log("FAVORITOS" + favoriteBooks)
  // console.log('FAVORITOS' + JSON.stringify(favoriteBooks))

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 20 }}>As requisições estão sendo realizadas</Text>
      </View>
    );
  }
  else {
    return (
      <SafeAreaView style={[sharedStyles.container, style.container, { flex: 1 }]}>
        <StatusBar style="light" />
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <View style={styles.title}>
            <FontAwesome5 name="heartbeat" size={24} color="#089A6E" />
            <Text style={[sharedStyles.headerThree, style.headerThree]}>FAVORITOS</Text>
          </View>
          <View style={{ width: '100%', height: 1, backgroundColor: '#9D9A9A' }}></View>
        </View>
        <FlatList
          data={favoriteBooks}
          keyExtractor={(item) => item.codigoLivro}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
              <View style={styles.contentContainer}>
                <Image
                  style={sharedStyles.imgLivroSearch}
                  source={{ uri: `data:image/png;base64,${item.img}` }}
                />
                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 10 }}>
                  <Text style={[sharedStyles.text, { fontSize: 18 }]}>{item.nomeLivro}</Text>
                  {(
                    <StarRating
                      rating={rating[item.codigoLivro] || 0}
                      onChange={(newRating) => setRating({ ...rating, [item.codigoLivro]: newRating })}
                      color="#FFE500"
                    />
                  )}
                  <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: '#089A6E', borderRadius: 13, width: 220, alignItems: 'center', height: 30, justifyContent: 'center' }} onPress={() => adicionarAoCarrinho(item)}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, }}>Adicionar ao carrinho</Text>
                    <AntDesign style={{ paddingLeft: 15 }} name="shoppingcart" size={25} color="#fff" />
                  </TouchableOpacity >
                </View>
                <FontAwesome5 style={{ position: 'absolute', top: 0, right: 0, padding: 20 }} name="heart-broken" size={24} color="#66d2b1" onPress={() => handleRemove(item.codigoLivro)} />
              </View>
              <View style={{ width: '100%', height: 1, backgroundColor: '#9D9A9A' }}></View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 50, color: 'grey' }}>
              Você ainda não possui livros salvos nos seus Favoritos.
            </Text>
          }
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    );
  };
}
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
  title: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    gap: 5,
    marginLeft: 10,
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