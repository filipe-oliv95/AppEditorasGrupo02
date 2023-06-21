import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { DataContext } from '../../context/DataContext';
import AxiosInstance from '../../api/AxiosInstance';

const Livro = ({ route }) => {
  const { dadosUsuario } = useContext(DataContext);
  const [livro, setLivro] = useState(null);
  const livroId = route.params?.livroId;

  useEffect(() => {
    getLivroById();
  }, []);

  const getLivroById = async () => {
    try {
      const response = await AxiosInstance.get(`/livros/${livroId}`, {
        headers: { Authorization: `Bearer ${dadosUsuario?.token}` },
      });
      setLivro(response.data);
    } catch (error) {
      console.log('Ocorreu um erro ao recuperar os dados de Livro: ' + error);
    }
  };

  // if (editora && editora.listaLivrosDTO) {
  //   console.log(editora.listaLivrosDTO);
  //   console.log(editora.listaLivrosDTO[0].imagem);
  // }

  if (!livro) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando livro...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.itemLivros}>
          <Image 
            style={styles.itemPhoto}
            source={{ uri: `data:image/png;base64,${livro.img}` }}
          />
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemTextLivros}>{livro.nomeLivro}</Text>
            <Text style={styles.itemTextLivros}>{livro.codigoLivro}</Text>
          </View>
        </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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
  },
  itemLivros: {
    margin: 10,
  },
  itemTextLivros: {
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 18,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  itemTextContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
  },
});

export default Livro;