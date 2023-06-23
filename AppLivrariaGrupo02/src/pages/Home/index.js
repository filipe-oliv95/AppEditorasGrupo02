import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import AxiosInstance from '../../api/AxiosInstance';
import { DataContext } from '../../context/DataContext';

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
                    <View style={styles.starsContainer}>
                        <MaterialIcons name="star" size={32} style={styles.starSelected} />
                        <MaterialIcons name="star" size={32} style={styles.starSelected} />
                        <MaterialIcons name="star" size={32} style={styles.starSelected} />
                        <MaterialIcons name="star" size={32} style={styles.starSelected} />
                        <MaterialIcons name="star-border" size={32} style={styles.starUnselected} />
                    </View>
                )}

                <View style={styles.itemTextContainerEditora}>
                    <Text style={styles.itemTextEditoras}>{nomeEditora}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
};

const ItemLivro = ({ img, nomeLivro, id }) => {

    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('Livro', { livroId: id });
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

    useEffect(() => {
        getAllEditoras();
        getAllLivros();
    }, [])

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
            <StatusBar style="light" />
            <View style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.sectionHeader}>EDITORAS</Text>
                    <FlatList
                        data={dadosEditora}
                        renderItem={({ item }) => <ItemEditora nomeEditora={item.nomeEditora} img={item.img} id={item.codigoEditora} />}
                        keyExtractor={item => item.codigoEditora}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                    <Text style={styles.sectionHeader}>LIVROS</Text>
                    <FlatList
                        data={dadosLivro}
                        renderItem={({ item }) => <ItemLivro nomeLivro={item.nomeLivro} img={item.img} id={item.codigoLivro} />}
                        keyExtractor={item => item.codigoLivro}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />

                    <Text style={styles.sectionHeader}>DESTAQUE</Text>
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
    sectionHeader: {
        fontWeight: '800',
        fontSize: 18,
        color: '#04140f',
        marginTop: 20,
        marginLeft: 10,
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