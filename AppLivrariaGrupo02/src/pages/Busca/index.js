import React, { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { DataContext } from '../../context/DataContext';
import { ScrollView } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import AxiosInstance from '../../api/AxiosInstance';
import { Ionicons, Entypo } from '@expo/vector-icons';

import {
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native';


const ItemEditora = ({ img, nomeEditora, id, destaque }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('EditoraLivros', { editoraId: id });
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.containerItem}>
                <Image
                    style={destaque ? styles.destaqueItemPhoto : styles.itemPhoto}
                    source={{ uri: `data:image/png;base64,${img}` }}
                />
                <View style={styles.itemTextContainer}>
                    <View style={styles.itemBox}>
                        <Text style={styles.itemTitle}>{nomeEditora}</Text>
                        <Text style={styles.itemTextName}>Editora</Text>
                    </View>
                </View>
                <Entypo style={styles.icon} name="arrow-with-circle-right" size={40} color="#66d2b1" />
            </View>
        </TouchableOpacity>
    )
};

const ItemLivro = ({ img, nomeLivro, nomeAutor, nomeEditora, id }) => {

    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('Livro', { livroId: id });
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.containerItem}>
                <Image
                    style={styles.itemPhoto}
                    source={{ uri: `data:image/png;base64,${img}` }}
                />
                <View style={styles.itemTextContainer}>
                    <View style={styles.itemBox}>
                        <Text style={styles.itemTitle}>{nomeLivro}</Text>
                        <Text style={styles.itemTextName}>{nomeAutor}</Text>
                        <Text style={styles.itemTextName}>{nomeEditora}</Text>
                    </View>
                </View>
                <Entypo style={styles.icon} name="arrow-with-circle-right" size={40} color="#66d2b1" />
            </View>
        </TouchableOpacity>
    )
};

const Busca = () => {
    const { dadosUsuario } = useContext(DataContext);
    const [dadosEditora, setDadosEditora] = useState([]);
    const [dadosLivro, setDadosLivro] = useState([]);

    const [searchQuery, setSearchQuery] = React.useState('');
    const [editorasFiltradas, setEditorasFiltradas] = useState([]);
    const [livrosFiltrados, setLivrosFiltrados] = useState([]);

    const onChangeSearch = query => setSearchQuery(query);

    useEffect(() => {
        getAllEditoras();
        getAllLivros();
    }, [])

    console.log(dadosEditora)

    useEffect(() => {
        if (dadosEditora) {
            const filteredEditoras = dadosEditora.filter(item => item.nomeEditora.toLowerCase().includes(searchQuery.toLowerCase()));
            setEditorasFiltradas(filteredEditoras);
        }
    }, [searchQuery, dadosEditora]);

    useEffect(() => {
        if (dadosLivro) {
            const filteredLivros = dadosLivro.filter(item => item.nomeLivro.toLowerCase().includes(searchQuery.toLowerCase()));
            setLivrosFiltrados(filteredLivros);
        }
    }, [searchQuery, dadosEditora]);

    const getAllEditoras = async () => {
        await AxiosInstance.get(
            '/editoras',
            { headers: { 'Authorization': `Bearer ${dadosUsuario?.token}` } }
        ).then(resultado => {
            setDadosEditora(resultado.data);
        }).catch((error) => {
            console.log('Ocorreu um erro ao recuperar os dados das Editoras: ' + error);
        })
    }
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

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <View style={{ flex: 1 }}>
                <Searchbar
                    placeholder="Busque por título ou editora"
                    style={styles.searchBar}
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
                <Text style={styles.sectionHeader}>Resultado:</Text>
                {(editorasFiltradas.length === 0 && livrosFiltrados.length === 0) ? (
                    <Text style={styles.errorText}>Nenhum item encontrado</Text>
                ) : (
                    <View style={styles.float}>
                        <FlatList
                            data={livrosFiltrados}
                            renderItem={({ item }) => <ItemLivro nomeAutor={item.autorDTO.nomeAutor} nomeEditora={item.editoraDTO.nomeEditora} nomeLivro={item.nomeLivro} img={item.img} id={item.codigoLivro} />}
                            keyExtractor={item => item.codigoLivro}
                            showsHorizontalScrollIndicator={false}
                        />
                        <FlatList
                            data={editorasFiltradas}
                            renderItem={({ item }) => <ItemEditora nomeEditora={item.nomeEditora} img={item.img} id={item.codigoEditora} />}
                            keyExtractor={item => item.codigoEditora}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                )}
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 0,
        backgroundColor: '#51cba6',
    },
    searchBar: {
        margin: 10,
        backgroundColor: '#a8e5d3',
    },
    sectionHeader: {
        fontWeight: '800',
        fontSize: 18,
        color: '#04140f',
        marginTop: 20,
        marginLeft: 10,
    },
    itemPhoto: {
        width: 100,
        height: 100,
        backgroundColor: '#a8e5d3',
        borderRadius: 5,
        borderBottomLeftRadius: 13
    },
    float: {
        height: '80%',
    },
    destaqueItemPhoto: {
        width: 400,
        height: 200,
        borderRadius: 13,
    },
    containerItem: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#07261d',
        margin: 10,
        padding: 0,
        alignItems: 'center',
        borderRadius: 13,
        borderTopLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    itemTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    itemTitle: {
        fontSize: 20,
        color: '#66d2b1',
    },
    itemTextName: {
        fontSize: 15,
        color: '#66d2b1',
    },
    itemBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 10,
    },
    errorText: {
        color: 'grey',
        marginLeft: 10,
        fontSize: 18,
    },
    icon: {
        marginLeft: 'auto',
        marginRight: 15,
    },

});

export default Busca;