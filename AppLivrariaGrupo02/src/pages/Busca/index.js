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
    View
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import AxiosInstance from '../../api/AxiosInstance';
import { DataContext } from '../../context/DataContext';

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
                <Entypo style={styles.icon} name="arrow-with-circle-right" size={40} color="grey" />
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
                <Entypo style={styles.icon} name="arrow-with-circle-right" size={40} color="grey" />
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

    const onChangeSearch = query => setSearchQuery(query);

    // filtra os livros e editoras conforme a busca
    useEffect(() => {
        if (dadosEditora && dadosLivro) {
            const filteredLivros = dadosLivro.filter(item =>
                item.nomeLivro.toLowerCase().includes(searchQuery.toLowerCase())
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

    useFocusEffect(
        React.useCallback(() => {
            getAllEditoras();
            getAllLivros();
        }, [])
    )
    // console.log(dadosEditora)

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
        <SafeAreaView style={styles.container}>
            <StatusBar style='light' />
            <View style={{ flex: 1 }}>
                <Searchbar
                    placeholder="Busque por título ou editora"
                    style={styles.searchBar}
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
                <Text style={styles.sectionHeader}>Resultado:</Text>
                {(resultadosFiltrados.length === 0) ? (
                    <Text style={styles.errorText}>Nenhum item encontrado</Text>
                ) : (
                    <View>
                        <SectionList
                            sections={resultadosFiltrados}
                            renderSectionHeader={({ section: { title } }) => (
                                <Text style={styles.sectionHeader}>{title}</Text>
                            )}
                            renderItem={({ item }) =>
                                item.hasOwnProperty('autorDTO') ? (
                                    <ItemLivro
                                        nomeAutor={item.autorDTO.nomeAutor}
                                        nomeEditora={item.editoraDTO.nomeEditora}
                                        nomeLivro={item.nomeLivro}
                                        img={item.img}
                                        id={item.codigoLivro}
                                        onPress={() => handleLivroPress(item.codigoLivro)}
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
                                item.hasOwnProperty('autorDTO')
                                    ? item.codigoLivro.toString()
                                    : item.codigoEditora.toString()
                            }
                        />
                    </View>
                )}
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
        borderRadius: 10,
    },
    destaqueItemPhoto: {
        width: 400,
        height: 200,
        borderRadius: 13,
    },
    containerItem: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        margin: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    itemTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    itemTitle: {
        fontSize: 20,
    },
    itemTextName: {
        fontSize: 15,
        color: 'grey',
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