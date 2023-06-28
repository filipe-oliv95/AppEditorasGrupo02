import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, StatusBar, SafeAreaView } from 'react-native';
import { DataContext } from '../../context/DataContext';
import { Searchbar } from 'react-native-paper';
import AxiosInstance from '../../api/AxiosInstance';
import { Entypo } from '@expo/vector-icons';
import ModalLivro from '../ModalLivro';
import { AppearanceContext } from '../../context/AppearanceContext';
import { sharedStyles, darkStyles, lightStyles } from '../../themes/index';
import { Divider } from '@rneui/themed';


const Editora = ({ route }) => {
  const { dadosUsuario } = useContext(DataContext);
  const [editora, setEditora] = useState(null);
  const editoraId = route.params?.editoraId;
  
  const [searchQuery, setSearchQuery] = React.useState('');
  const [livrosFiltrados, setLivrosFiltrados] = useState([]);
  
  const [dadosLivro, setDadosLivro] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [livro, setLivro] = React.useState([]);
  
  const { isEnabled } = useContext(AppearanceContext);
  
  const style = isEnabled ? lightStyles : darkStyles;
  
  const showModal = ({ id, nomeAutor }) => {
    const livro = dadosLivro.find(livro => livro.codigoLivro === id);
    setLivro({... livro, nomeAutor});
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
  
  const LivrosEditora = ({ imagem, nomeLivro, id, showModal, nomeAutor }) => {
  
    const handlePress = () => {
      showModal({ id, nomeAutor });
    }
  
    return (
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.containerItem}>
          <View style={{paddingRight: 20, width: 115, display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
              <Image
                style={sharedStyles.imgLivroSearch}
                source={{ uri: `data:image/png;base64,${imagem}` }}
              />
          </View>
          <View style={styles.itemTextContainer}>
            <View style={styles.itemBox}>
              <Text style={[sharedStyles.text, {marginBottom: 20, fontSize: 18}]}>{nomeLivro}</Text>
              <Text style={sharedStyles.textGrey}>ver livro</Text>
            </View>
          </View>
          <Entypo style={styles.icon} name="chevron-thin-right" size={35} color={isEnabled ? '#000' : '#fff'} />
        </View>
        <Divider color={'#9D9A9A'}/>
      </TouchableOpacity>
    )
  };
  return (
    <SafeAreaView style={[sharedStyles.container, style.container, {flex: 1}]}>
      <StatusBar style="light" />
      <Text style={[sharedStyles.headerTwo, {margin: 10}]}>{editora.nomeEditora}</Text>
      <Searchbar
        placeholder="Busque pelo nome do livro"
        style={styles.searchBar}
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <View style={styles.itemsContainer}>
        {livrosFiltrados.length === 0 ? (
          <Text style={style.textOne}>Nenhum livro encontrado</Text>
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
  containerItem: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    marginLeft: 30,
    alignItems: 'center',


},
  itemTextLivros: {
    color: '#66d2b1',
    fontSize: 16,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  itemTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  searchBar: {
    margin: 10,
  },
  icon: {
    marginLeft: 'auto',
    marginRight: 15,
  },
  itemBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 10,
},
});

export default Editora;