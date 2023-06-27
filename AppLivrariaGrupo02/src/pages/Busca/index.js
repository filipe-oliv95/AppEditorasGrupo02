import { Entypo } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
    SectionList,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import AxiosInstance from '../../api/AxiosInstance';
import { DataContext } from '../../context/DataContext';
import ModalLivro from '../ModalLivro';

const ItemEditora = ({ img, nomeEditora, id }) => {
    const navigation = useNavigation();

    const handleEditoraPress = () => {
        navigation.navigate('Editora', { editoraId: id });
    }

    console.log(nomeEditora)

    return (
        <TouchableOpacity onPress={handleEditoraPress}>
            <View style={styles.containerItem}>
                <Image
                    style={styles.itemPhoto}
                    source={{ uri: `data:image/png;base64,${img}` }}
                />
                <View style={styles.itemTextContainer}>
                    <View style={styles.itemBox}>
                        <Text style={styles.itemTitle}>{nomeEditora}</Text>
                        <Text style={styles.itemTextName}>Editora</Text>
                    </View>
                </View>
                <Entypo style={styles.icon} name="arrow-with-circle-right" size={40} color="grey" />
            </View>
        </TouchableOpacity>
    )
};

const ItemLivro = ({ img, nomeLivro, nomeAutor, nomeEditora, id, showModal }) => {
    const handlePress = () => {
        showModal({ id });
    }

    // console.log(nomeAutor)
    // console.log("TESTANDO")

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
    const [resultadosFiltrados, setResultadosFiltrados] = useState([]);
    const [visible, setVisible] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [livro, setLivro] = React.useState([]);

    const onChangeSearch = query => setSearchQuery(query);

    const showModal = ({ id, nomeAutor }) => {
        const livro = dadosLivro.find(livro => livro.codigoLivro === id);
        setLivro({ ...livro, nomeAutor });
        setVisible(true);
    };
    const hideModal = () => setVisible(false);

    useFocusEffect(
        React.useCallback(() => {
            getAllEditoras();
            getAllLivros();
        }, [])
    )
    // console.log(dadosEditora)

    // filtra os livros e editoras conforme a busca
    useEffect(() => {
        if (dadosEditora && dadosLivro) {
            const filteredLivros = dadosLivro.filter(item =>
                item.nomeLivro.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.autorDTO.nomeAutor.toLowerCase().includes(searchQuery.toLowerCase())
            );
            const filteredEditoras = dadosEditora.filter(item =>
                item.nomeEditora.toLowerCase().includes(searchQuery.toLowerCase())
            );
            const filteredResults = [
                { title: 'Livros', data: filteredLivros },
                { title: 'Editoras', data: filteredEditoras }
            ];
            setResultadosFiltrados(filteredResults);
        }
    }, [searchQuery, dadosEditora, dadosLivro]);

    // console.log(resultadosFiltrados)

    const getAllEditoras = async () => {
        setIsLoading(true);
        await AxiosInstance.get(
            '/editoras',
            { headers: { 'Authorization': `Bearer ${dadosUsuario?.token}` } }
        ).then(resultado => {
            setDadosEditora(resultado.data);
            setIsLoading(false);
        }).catch((error) => {
            console.log('Ocorreu um erro ao recuperar os dados das Editoras: ' + error);
            setIsLoading(false);
        })
    }
    const getAllLivros = async () => {
        setIsLoading(true); // Similar changes for other requests
        await AxiosInstance.get(
            '/livros',
            { headers: { 'Authorization': `Bearer ${dadosUsuario?.token}` } }
        ).then(resultado => {
            setDadosLivro(resultado.data);
            setIsLoading(false);
        }).catch((error) => {
            console.log('Ocorreu um erro ao recuperar os dados dos Livros: ' + error);
            setIsLoading(false);
        })
    }

    // resultadosFiltrados.some(section => section.data.length > 0) ?
    {/* verifica se a section tem dado, se não tiver avisa "nenhum resultado" */ }

    // verifica as requisições sendo realizadas
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{ marginTop: 20 }}>As requisições estão sendo realizadas</Text>
            </View>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='light' />
            <View style={{ flex: 1 }}>
                <Searchbar
                    placeholder="Busque por título, editora ou autor"
                    style={styles.searchBar}
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
                <Text style={styles.sectionHeader}>Resultado:</Text>
                {resultadosFiltrados.some(section => section.data.length > 0) ? (
                    <SectionList
                        sections={resultadosFiltrados}
                        renderSectionHeader={({ section: { title } }) => (
                            <Text style={styles.sectionHeader}>{title}</Text>
                        )}
                        renderItem={({ item }) =>
                            item.hasOwnProperty('nomeLivro') ? (
                                <ItemLivro
                                    nomeAutor={item.autorDTO.nomeAutor}
                                    nomeEditora={item.editoraDTO.nomeEditora}
                                    nomeLivro={item.nomeLivro}
                                    img={item.img}
                                    id={item.codigoLivro}
                                    onPress={() => handleLivroPress(item.codigoLivro)}
                                    showModal={() => showModal({ id: item.codigoLivro, nomeAutor: item.autorDTO.nomeAutor })}
                                />
                            ) : (
                                <ItemEditora
                                    nomeEditora={item.nomeEditora}
                                    img={item.img}
                                    id={item.codigoEditora}
                                    onPress={() => handleEditoraPress(item.codigoEditora)}
                                />
                            )
                        }
                        keyExtractor={item =>
                            item.hasOwnProperty('nomeLivro')
                                ? item.codigoLivro.toString()
                                : item.codigoEditora.toString()
                        }
                    />
                ) : (
                    <Text style={styles.errorText}>Nenhum item encontrado</Text>
                )}
                <ModalLivro visible={visible} hideModal={hideModal} livro={livro} />
            </View>
        </SafeAreaView >
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
    containerItem: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#07261d',
        margin: 10,
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