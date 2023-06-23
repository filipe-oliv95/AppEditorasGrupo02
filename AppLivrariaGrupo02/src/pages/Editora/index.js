import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, StatusBar, SafeAreaView } from 'react-native';
import { DataContext } from '../../context/DataContext';
import { Searchbar } from 'react-native-paper';
import AxiosInstance from '../../api/AxiosInstance';
import { Entypo } from '@expo/vector-icons';
import ModalLivro from '../ModalLivro';

const LivrosEditora = ({ imagem, nomeLivro, id, showModal }) => {

  const handlePress = () => {
    showModal({ id });
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
        <Entypo style={styles.icon} name="arrow-with-circle-right" size={40} color="#66d2b1" />
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

  const [dadosLivro, setDadosLivro] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [livro, setLivro] = React.useState([]);

  const showModal = ({ id }) => {
    const livro = dadosLivro.find(livro => livro.codigoLivro === id);
    setLivro(livro);
    setVisible(true);
};

  const hideModal = () => setVisible(false);
      
  useEffect(() => {
      getEditoraById();
      getAllLivros();
  }, [])

  const onChangeSearch = query => setSearchQuery(query);

  useEffect(() => {
    if (editora && editora.listaLivrosDTO) {
      const filteredLivros = editora.listaLivrosDTO.filter(item => item.nomeLivro.toLowerCase().includes(searchQuery.toLowerCase()));
      setLivrosFiltrados(filteredLivros);
    }
  }, [searchQuery, editora]);

  const getAllLivros = async () => {
    await AxiosInstance.get(
        '/livros',
        { headers: { 'Authorization': `Bearer ${dadosUsuario?.token}` } }
    ).then(resultado => {
        setDadosLivro(resultado.data);
    }).catch((error) => {
        console.log('Ocorreu um erro ao recuperar os dados dos Livros: ' + error);
    })
  }

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
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
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
            renderItem={({ item }) => <LivrosEditora imagem={item.imagem} nomeLivro={item.nomeLivro} id={item.codigoLivro} showModal={showModal} hideModal={hideModal} visible={visible}/>}
            keyExtractor={item => item.codigoLivro}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      <ModalLivro visible={visible} hideModal={hideModal} livro={livro} />
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#51cba6',
  },
  itemsContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    width: '100%',
    height: '80%',
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
    padding: 10,
    color: '#07261d',
  },
  enderecoEditora: {
    fontSize: 18,
    marginBottom: 10,
  },
  itemPhoto: {
    width: 100,
    height: 100,
    backgroundColor: '#a8e5d3',
    borderRadius: 5,
    borderBottomLeftRadius: 13
  },
  itemLivros: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#07261d',
    marginVertical: 10,
    padding: 0,
    alignItems: 'center',
    borderRadius: 13,
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  itemTextLivros: {
    color: '#66d2b1',
    fontSize: 16,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  itemTextContainer: {
    backgroundColor: '#07261d',
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
  },
  searchBar: {
    margin: 10,
    backgroundColor: '#a8e5d3',
  },
  icon: {
    marginLeft: 'auto',
    marginRight: 15,
  },
});

export default Editora;