import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, SafeAreaView } from 'react-native';
import { DataContext } from '../../context/DataContext';
import { CartContext } from '../../context/CartContext';
import AxiosInstance from '../../api/AxiosInstance';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Livro = ({ route }) => { // JA PODE REMOVER LIVRO
  const { dadosUsuario } = useContext(DataContext);
  const { adicionarAoCarrinho } = useContext(CartContext);
  const [livro, setLivro] = useState(null);
  const livroId = route.params?.livroId;

  useEffect(() => {
    getLivroById();
  }, []);

  const getLivroById = async () => {
    // await AsyncStorage.clear(); // NÃO REMOVER, limpa AsyncStorage se der "Row too big to fit into CursorWindow"
    try {
      const response = await AxiosInstance.get(`/livros/${livroId}`, {
        headers: { Authorization: `Bearer ${dadosUsuario?.token}` },
      });
      setLivro(response.data);
    } catch (error) {
      console.log('Ocorreu um erro ao recuperar os dados de Livro: ' + error);
    }
  };

  if (!livro) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando livro...</Text>
      </View>
    );
  }

  const addToFavorites = async () => {
    try {
      let favoriteBooks = await AsyncStorage.getItem('favoriteBooks');
      favoriteBooks = favoriteBooks == null ? [] : JSON.parse(favoriteBooks);

      if (favoriteBooks.some(item => item.codigoLivro === livro.codigoLivro)) {
        alert('O livro já está na lista de favoritos!');
      } else {
        const livroToSave = {  // para reduzir os dados salvos no asyncstorage salva apenas id          
          codigoLivro: livro.codigoLivro,
        }
        favoriteBooks.push(livroToSave);
        await AsyncStorage.setItem('favoriteBooks', JSON.stringify(favoriteBooks));
        alert('Livro adicionado aos favoritos!');
      }
    } catch (error) {
      console.log('Ocorreu um erro ao favoritar o livro: ' + error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.contentContainer}>
        <Text style={styles.itemTextLivros}>{livro.nomeLivro}</Text>
        <Image
          style={styles.itemPhoto}
          source={{ uri: `data:image/png;base64,${livro.img}` }}
        />
        <View style={styles.itemContent}>
          <Text style={styles.itemTextLivros}>{livro.autorDTO.nomeAutor}</Text>
          <Text style={styles.txt}>R$ 564</Text>
          <TouchableOpacity style={styles.button} onPress={() => adicionarAoCarrinho(livro)} >
            <Text style={styles.txtButton}>COMPRAR</Text>
          </TouchableOpacity >
          <View style={styles.favoriteBtn}>
            <Text style={styles.txt}>FAVORITAR</Text>
            <TouchableOpacity onPress={addToFavorites}>
              <Icon
                name='heart'
                size={20}
                color='#4CCB68'
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  contentContainer: {
    padding: 15,
    backgroundColor: '#07261d',
    borderRadius: 13,
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
  loadingText: {
    fontSize: 18,
    color: '#555',
  },
  nomeEditora: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  enderecoEditora: {
    fontSize: 18,
    marginBottom: 10,
  },
  itemPhoto: {
    width: 200,
    height: 200,
    backgroundColor: '#a8e5d3',
    borderRadius: 13,
  },
  itemTextLivros: {
    color: '#66d2b1',
    fontSize: 18,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  txt: {
    color: '#66d2b1',
    marginRight: 5,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a8e5d3',
    padding: 5,
    // marginTop: 10,
    width: '100%',
    height: 30,
    borderRadius: 13,
  },
  txtButton: {
    color: '#07261d',
  },
  favoriteBtn: {
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
  }
});

export default Livro;