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
import { AppearanceContext } from '../../context/AppearanceContext';
import { sharedStyles, darkStyles, lightStyles } from '../../themes/index';
import { Divider } from '@rneui/themed';

const Busca = () => {
    const { dadosUsuario } = useContext(DataContext);
    const [dadosEditora, setDadosEditora] = useState([]);
    const [dadosLivro, setDadosLivro] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [resultadosFiltrados, setResultadosFiltrados] = useState([]);
    const [visible, setVisible] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [livro, setLivro] = React.useState([]);
    const { colorScheme } = useContext(AppearanceContext);
    
    const style = colorScheme === 'light' ? lightStyles : darkStyles;
    
    const ItemEditora = ({ img, nomeEditora, id }) => {
        const navigation = useNavigation();
    
        const handleEditoraPress = () => {
            navigation.navigate('Editora', { editoraId: id });
        }
    
    
        return (
            <TouchableOpacity onPress={handleEditoraPress}>
                <View style={[styles.containerItem]}>
                    <View style={{paddingRight: 20, width: 115, display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                        <Image
                            style={sharedStyles.imgEditora}
                            source={{ uri: `data:image/png;base64,${img}` }}
                        />
                    </View>
                    <View style={styles.itemTextContainer}>
                        <View style={styles.itemBox}>
                            <Text style={[sharedStyles.text, {marginBottom: 20, fontSize: 18}]}>{nomeEditora}</Text>
                            <Text style={sharedStyles.textGrey}>Editora</Text>
                        </View>
                    </View>
                    <Entypo style={styles.icon} name="chevron-thin-right" size={35} color="#fff" />
                </View>
                <Divider color={'#9D9A9A'}/>
            </TouchableOpacity>
        )
    };
    
    const ItemLivro = ({ img, nomeLivro, nomeAutor, id, showModal }) => {
        const handlePress = () => {
            showModal({ id });
        }
    
    
        return (
            <TouchableOpacity onPress={handlePress}>
                <View style={styles.containerItem}>
                    <View style={{paddingRight: 20, width: 115, display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                        <Image
                            style={sharedStyles.imgLivroSearch}
                            source={{ uri: `data:image/png;base64,${img}` }}
                        />
                    </View>
                    <View style={styles.itemTextContainer}>
                        <View style={styles.itemBox}>
                            <Text style={[sharedStyles.text, {marginBottom: 20, fontSize: 18}]}>{nomeLivro}</Text>
                            <Text style={sharedStyles.textGrey}>{nomeAutor}</Text>
                        </View>
                    </View>
                    <Entypo style={styles.icon} name="chevron-thin-right" size={35} color="#fff" />
                </View>
                <Divider color={'#9D9A9A'}/>
            </TouchableOpacity>
        )
    };
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
        <SafeAreaView style={[sharedStyles.container, style.container, {flex: 1}]}>
            <StatusBar style='light' />
            <View style={{ flex: 1 }}>
                <Searchbar
                    placeholder="Busque por título, editora ou autor"
                    style={styles.searchBar}
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
                {resultadosFiltrados.some(section => section.data.length > 0) ? (
                    <SectionList
                        sections={resultadosFiltrados}
                        renderItem={({ item }) =>
                            item.hasOwnProperty('nomeLivro') ? (
                                <ItemLivro
                                    nomeAutor={item.autorDTO.nomeAutor}
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

    searchBar: {
        margin: 10,
    },
    sectionHeader: {
        fontWeight: '800',
        fontSize: 18,
        color: '#fff',
        marginTop: 20,
        marginLeft: 10,
    },
    itemPhoto: {
        width: 100,
        height: 100,
        borderRadius: 5,
        borderBottomLeftRadius: 13
    },
    containerItem: {
        display: 'flex',
        flexDirection: 'row',
        margin: 10,
        marginLeft: 30,
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