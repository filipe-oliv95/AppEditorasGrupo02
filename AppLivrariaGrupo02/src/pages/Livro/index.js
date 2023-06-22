import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { DataContext } from '../../context/DataContext';
import AxiosInstance from '../../api/AxiosInstance';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      <View style={styles.contentContainer}>
        <Image
          style={styles.itemPhoto}
          source={{ uri: `data:image/png;base64,${livro.img}` }}
        />
        <View style={styles.itemContent}>
          <Text style={styles.itemTextLivros}>{livro.nomeLivro}</Text>
          <Text style={styles.itemTextLivros}>{livro.autorDTO.nomeAutor}</Text>
          <Text>R$ 564</Text>
          <TouchableOpacity style={styles.button} onPress={() => console.log("comprar pressionado")} >
            <Text style={styles.txtButton}>COMPRAR</Text>
          </TouchableOpacity>
          <View style={styles.favoriteBtn}>
            <Text>FAVORITAR</Text>
            <Icon
              name='heart'
              size={20}
              color='rgba(120, 255, 255, 0.9)'
            />
          </View>
        </View>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 15,
    backgroundColor: 'white',
    borderColor: '#555',
    borderWidth: 1,
    display: 'flex',
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContent: {
    // margin: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // height: '100%',
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
  itemTextLivros: {
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 18,
    marginVertical: 5,
    marginHorizontal: 10,
  },

  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#07261d',
    // marginTop: 10,
    width: '100%',
    height: 30,
    borderRadius: 13,
  },
  txtButton: {
    color: '#66d2b1',
  },
  favoriteBtn: {
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
  }
});

export default Livro;