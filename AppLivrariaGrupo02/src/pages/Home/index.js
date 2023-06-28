import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import AxiosInstance from '../../api/AxiosInstance';
import { DataContext } from '../../context/DataContext';
import StarRating from 'react-native-star-rating-widget';
import ModalLivro from '../ModalLivro';
import { Divider } from '@rneui/themed';
import { FontAwesome5, FontAwesome, Entypo } from '@expo/vector-icons';
import { sharedStyles, darkStyles, lightStyles } from '../../themes';
import { AppearanceContext } from '../../context/AppearanceContext';

import {
    FlatList,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from 'react-native';

const Home = () => {
    const { dadosUsuario } = useContext(DataContext);
    const [dadosEditora, setDadosEditora] = useState([]);
    const [dadosLivro, setDadosLivro] = useState([]);
    const [dadosAutor, setDadosAutor] = useState([]);
    const [visible, setVisible] = React.useState(false);
    const [livro, setLivro] = React.useState([]);
    const [isLoading, setIsLoading] = useState(false); // importante para o loading
    
    const { isEnabled } = useContext(AppearanceContext);
  
    const style = isEnabled ? lightStyles : darkStyles;

    const ItemEditora = ({ img, id, destaque, showStars }) => {
        const navigation = useNavigation();
        const [rating, setRating] = useState(4.5);

        const handlePress = () => {
            navigation.navigate('Editora', { editoraId: id });
        }

        return (
            <TouchableOpacity onPress={handlePress}>
                <View style={styles.itemEditora}>
                    <Image
                        style={destaque ? styles.destaqueItemPhoto : sharedStyles.imgEditora}
                        source={{ uri: `data:image/png;base64,${img}` }}
                    />
                    {showStars && (
                        <StarRating
                            rating={rating}
                            onChange={setRating}
                        />
                    )}
                </View>
            </TouchableOpacity>
        )
    };

    const ItemLivro = ({ img, nomeLivro, id, showModal, nomeAutor }) => {

        const handlePress = () => {
            showModal({ id, nomeAutor });
        }

        return (
            <TouchableOpacity onPress={handlePress}>
                <View style={sharedStyles.itemLivro}>
                    <Image
                        style={sharedStyles.imgLivro}
                        source={{ uri: `data:image/png;base64,${img}` }}
                    />
                    <Text style={[sharedStyles.text, {marginBottom: 10, fontSize: 18}]}>{nomeLivro}</Text>
                    <Text style={sharedStyles.textGrey}>{nomeAutor}</Text>
                </View>

            </TouchableOpacity>
        )
    };

    const showModal = ({ id, nomeAutor }) => {
        const livro = dadosLivro.find(livro => livro.codigoLivro === id);
        setLivro({ ...livro, nomeAutor });
        setVisible(true);
    };

    const hideModal = () => setVisible(false);

    useEffect(() => {
        getAllEditoras();
        getAllLivros();
        getAllAutores();
    }, [])

    // adicionei a consulta para autores para poder adicionar na renderização
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
        setIsLoading(true);
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

    const getAllAutores = async () => {
        setIsLoading(true);
        await AxiosInstance.get(
            '/autores',
            { headers: { 'Authorization': `Bearer ${dadosUsuario?.token}` } }
        ).then(resultado => {
            setDadosAutor(resultado.data);
            setIsLoading(false);
        }).catch((error) => {
            console.log('Ocorreu um erro ao recuperar os dados dos autores: ' + error);
            setIsLoading(false);
        })
    }

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{ marginTop: 20 }}>As requisições estão sendo realizadas</Text>
            </View>
        );
    }
    else {
        return (
            <SafeAreaView style={[sharedStyles.container, style.container]}>
                <StatusBar style="light" />
                <View style={{ flex: 1 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ display: 'flex', flexDirection: 'column' }}>
                            <View style={styles.title}>
                                <FontAwesome5 name="book-reader" size={24} color="#089A6E" />
                                <Text style={[sharedStyles.headerThree, style.headerThree]}>EDITORAS</Text>
                            </View>
                            <View style={{ width: '100%', height: 1, backgroundColor: '#9D9A9A' }}></View>
                        </View>
                        <FlatList
                            data={dadosEditora}
                            renderItem={({ item }) => <ItemEditora nomeEditora={item.nomeEditora} img={item.img} id={item.codigoEditora} />}
                            keyExtractor={item => item.codigoEditora}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                        <View style={{ display: 'flex', flexDirection: 'column' }}>
                            <View style={styles.title}>
                                <Entypo name="book" size={24} color="#089A6E" />
                                <Text style={[sharedStyles.headerThree, style.headerThree]}>LIVROS</Text>
                            </View>
                            <View style={{ width: '100%', height: 1, backgroundColor: '#9D9A9A', marginBottom: 5 }}></View>
                        </View>
                        <FlatList
                            data={dadosLivro}
                            renderItem={({ item }) => <ItemLivro nomeAutor={item.autorDTO.nomeAutor} nomeLivro={item.nomeLivro} img={item.img} id={item.codigoLivro} showModal={showModal} hideModal={hideModal} visible={visible} />}
                            keyExtractor={item => item.codigoLivro}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                        <View style={{ display: 'flex', flexDirection: 'column' }}>
                            <View style={styles.title}>
                                <FontAwesome name="trophy" size={24} color="#089A6E" />
                                <Text style={[sharedStyles.headerThree, style.headerThree]}>DESTAQUE</Text>
                            </View>
                            <View style={{ width: '100%', height: 1, backgroundColor: '#9D9A9A' }}></View>
                        </View>
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
                </View>
                <ModalLivro visible={visible} hideModal={hideModal} livro={livro} />
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 0,
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

    destaqueItemPhoto: {
        width: '100%',
        height: 200,
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
    },
    itemLivro: {
        display: 'flex',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'red',
        margin: 10,
        borderRadius: 13,
    },
    itemTextLivro: {
        fontSize: 18,
        marginVertical: 5,
        marginHorizontal: 10,
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