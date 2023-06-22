import React, { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { DataContext } from '../../context/DataContext';
import { Searchbar } from 'react-native-paper';
import AxiosInstance from '../../api/AxiosInstance';

const LivrosEditora = ({ imagem, nomeLivro, codigoLivro }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Livro', { livroId: codigoLivro });
  }
  
  return (
    <TouchableOpacity onPress={handlePress}>
        <View style={styles.itemLivros}>
          <Image 
            style={styles.itemPhoto}
            source={{ uri: `data:image/png;base64,${imagem}` }}
          />
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemTextLivros}>{nomeLivro}</Text>
            <Text style={styles.itemTextLivros}>ver livro</Text>
          </View>
        </View>
    </TouchableOpacity>
  )
};

const Editora = ({ route }) => {
  const { dadosUsuario } = useContext(DataContext);
  const [editora, setEditora] = useState(null);
  const editoraId = route.params?.editoraId;

  const [searchQuery, setSearchQuery] = React.useState('');
  const [livrosFiltrados, setLivrosFiltrados] = useState([]);

  const onChangeSearch = query => setSearchQuery(query);

  useEffect(() => {
    getEditoraById();
  }, []);

  useEffect(() => {
    if (editora && editora.listaLivrosDTO) {
      const filteredLivros = editora.listaLivrosDTO.filter(item => item.nomeLivro.toLowerCase().includes(searchQuery.toLowerCase()));
      setLivrosFiltrados(filteredLivros);
    }
  }, [searchQuery, editora]);

  const getEditoraById = async () => {
    try {
      const response = await AxiosInstance.get(`/editoras/${editoraId}`, {
        headers: { Authorization: `Bearer ${dadosUsuario?.token}` },
      });
      setEditora(response.data);
    } catch (error) {
      console.log('Ocorreu um erro ao recuperar os dados da Editora: ' + error);
    }
  };

  if (!editora) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando editora...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.nomeEditora}>{editora.nomeEditora}</Text>
      <Searchbar
          placeholder="Busque pelo nome do livro"
          style={styles.searchBar}
          onChangeText={onChangeSearch}
          value={searchQuery}
      /> 
      <View style={styles.itemsContainer}>
        {livrosFiltrados.length === 0 ? (
          <Text style={styles.sectionHeader}>Nenhum livro encontrado</Text>
        ) : (
          <FlatList
              data={livrosFiltrados}
              renderItem={({ item }) => <LivrosEditora imagem={item.imagem} nomeLivro={item.nomeLivro} codigoLivro={item.codigoLivro} />}
              keyExtractor={item => item.codigoLivro}
              showsHorizontalScrollIndicator={false}
          />
        )}
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
  itemsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  sectionHeader: {
    fontSize: 20,
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
  searchBar: {
    margin: 10,
  },
});

export default Editora;