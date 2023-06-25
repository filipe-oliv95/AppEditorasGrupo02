import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import AxiosInstance from '../../api/AxiosInstance';
import { DataContext } from '../../context/DataContext';
import StarRating from 'react-native-star-rating-widget';
import ModalLivro from '../ModalLivro';
import { Divider } from '@rneui/themed';
import { FontAwesome5, FontAwesome, Entypo } from '@expo/vector-icons';

import {
    FlatList,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';


const ItemEditora = ({ img, nomeEditora, id, destaque, showStars }) => {
    const navigation = useNavigation();
    const [rating, setRating] = useState(4.5);

    const handlePress = () => {
        navigation.navigate('Editora', { editoraId: id });
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.itemEditora}>
                <Image
                    style={destaque ? styles.destaqueItemPhoto : styles.itemPhoto}
                    source={{ uri: `data:image/png;base64,${img}` }}
                />
                {showStars && (
                    <StarRating
                        rating={rating}
                        onChange={setRating}
                    />
                )}

                <View style={styles.itemTextContainerEditora}>
                    <Text style={styles.itemTextEditoras}>{nomeEditora}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
};

const ItemLivro = ({ img, nomeLivro, id, showModal }) => {

    const handlePress = () => {
        showModal({ id });
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.itemLivro}>
                <Image
                    style={styles.itemPhotoLivro}
                    source={{ uri: `data:image/png;base64,${img}` }}
                />
                <View style={styles.itemTextContainerLivro}>
                    <Text style={styles.itemTextLivro}>{nomeLivro}</Text>
                </View>
            </View>

        </TouchableOpacity>
    )
};

const Home = () => {
    const { dadosUsuario } = useContext(DataContext);
    const [dadosEditora, setDadosEditora] = useState([]);
    const [dadosLivro, setDadosLivro] = useState([]);
    const [dadosAutor, setDadosAutor] = useState([]);
    const [visible, setVisible] = React.useState(false);
    const [livro, setLivro] = React.useState([]);


    const showModal = ({ id }) => {
        const livro = dadosLivro.find(livro => livro.codigoLivro === id);
        setLivro(livro);
        setVisible(true);
    };
    const hideModal = () => setVisible(false);
    // console.log(livro)

    //NAO CONSIGO ACESSOAR O NOME DO AUTOR . Ta aparecendo
    // console.log(livro.autorDTO);

    useEffect(() => {
        getAllEditoras();
        getAllLivros();
        getAllAutores();
    }, [])

    // adicionei a consulta para autores para poder adicionar na renderização
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

    const getAllAutores = async () => {
        await AxiosInstance.get(
            '/autores',
            { headers: { 'Authorization': `Bearer ${dadosUsuario?.token}` } }
        ).then(resultado => {
            setDadosAutor(resultado.data);
        }).catch((error) => {
            console.log('Ocorreu um erro ao recuperar os dados dos autores: ' + error);
        })
    }
    // ta imprimindo correto mas não pega
    console.log(dadosAutor)

    const containerStyle = { backgroundColor: 'white', padding: 20, flex: 1, margin: 30 };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <View style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.title}>
                        <FontAwesome5 name="book-reader" size={24} color="#07261d" />
                        <Text style={styles.sectionHeader}>EDITORAS</Text>
                    </View>
                    <Divider />
                    <FlatList
                        data={dadosEditora}
                        renderItem={({ item }) => <ItemEditora nomeEditora={item.nomeEditora} img={item.img} id={item.codigoEditora} />}
                        keyExtractor={item => item.codigoEditora}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                    <View style={styles.title}>
                        <Entypo name="book" size={24} color="#07261d" />
                        <Text style={styles.sectionHeader}>LIVROS</Text>
                    </View>
                    <Divider />
                    <FlatList
                        data={dadosLivro}
                        renderItem={({ item }) => <ItemLivro nomeLivro={item.nomeLivro} img={item.img} id={item.codigoLivro} showModal={showModal} hideModal={hideModal} visible={visible} />}
                        keyExtractor={item => item.codigoLivro}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                    <View style={styles.title}>
                        <FontAwesome name="trophy" size={24} color="#07261d" />
                        <Text style={styles.sectionHeader}>DESTAQUE</Text>
                    </View>
                    <Divider />
                    {dadosEditora.length > 0 &&
                        <ItemEditora
                            nomeEditora={dadosEditora[0].nomeEditora}
                            img={dadosEditora[0].img}
                            id={dadosEditora[0].codigoEditora}
                            destaque={true}
                            showStars={true}
                        />
                    }
                </ScrollView>
                {/*Modal que estava importando do React Native Paper*/}
                {/* <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Text style={{ marginVertical: 5, marginHorizontal: 10 }}>{livro.nomeLivro}</Text>
                        <Image
                            style={{ width: 200, height: 200, borderRadius: 13 }}
                            source={{ uri: `data:image/png;base64,${livro.img}` }}
                        />
                        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ marginVertical: 5, marginHorizontal: 10 }}>{livro.autorDTO.nomeAutor}</Text>
                            <Text style={styles.txt}>R$ 564</Text>
                            <TouchableOpacity style={{ color: '#07261d' }} onPress={() => console.log("comprar pressionado")} >
                                <Text style={{ color: '#07261d' }}>COMPRAR</Text>
                            </TouchableOpacity >
                            <View style={{ display: 'flex', flexDirection: 'row', padding: 5 }}>
                                <Text>FAVORITAR</Text>
                                <TouchableOpacity onPress={() => addToFavorites()}>
                                    <FontAwesome
                                        name='heart'
                                        size={20}
                                        color='#4CCB68'
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal> */}
            </View>
            <ModalLivro visible={visible} hideModal={hideModal} livro={livro} />
        </SafeAreaView>
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
    title: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
        gap: 5,
        marginLeft: 10,
    },
    sectionHeader: {
        fontWeight: '800',
        fontSize: 18,
        color: '#07261d',
    },
    itemPhoto: {
        width: 200,
        height: 200,
        backgroundColor: '#a8e5d3',
        borderRadius: 13,
    },
    itemPhotoLivro: {
        width: 200,
        height: 200,
        backgroundColor: '#a8e5d3',
        borderTopLeftRadius: 13,
        borderTopRightRadius: 13,
    },
    destaqueItemPhoto: {
        width: '100%',
        height: 200,
        backgroundColor: '#a8e5d3',
        borderRadius: 13,
    },
    itemEditora: {
        margin: 10,
        position: 'relative',
    },
    itemTextEditoras: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 18,
    },
    itemTextContainerEditora: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 13,
    },
    itemLivro: {
        margin: 10,
    },
    itemTextLivro: {
        color: '#66d2b1',
        fontSize: 18,
        marginVertical: 5,
        marginHorizontal: 10,
    },
    itemTextContainerLivro: {
        width: 200,
        backgroundColor: '#07261d',
        borderBottomStartRadius: 5,
        borderBottomEndRadius: 5,
    },
    errorText: {
        color: 'grey',
        marginLeft: 10,
        fontSize: 18,
    },
    starsContainer: {
        position: 'absolute',
        bottom: -9,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
        zIndex: 1,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 10,
    },
    starUnselected: {
        color: '#888',
        marginHorizontal: 2,
    },
    starSelected: {
        color: 'black',
    }
});

export default Home;