import React, { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { DataContext } from '../../context/DataContext';
import { ScrollView } from 'react-native-gesture-handler';
import AxiosInstance from '../../api/AxiosInstance';
import Header from '../../components/Header'
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native';


const ItemEditora = ({ img, nomeEditora, id }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('EditoraLivros', { editoraId: id });
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.itemEditora}>
                <Image
                    style={styles.itemPhoto}
                    source={{ uri: `data:image/png;base64,${img}` }}
                />
                <View style={styles.itemTextContainerEditora}>
                    <Text style={styles.itemTextEditoras}>{nomeEditora}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
};

const ItemLivro = ({ img, nomeLivro }) => {

    return (
        <View style={styles.itemLivro}>
            <Image
                style={styles.itemPhoto}
                source={{ uri: `data:image/png;base64,${img}` }}
            />
            <View style={styles.itemTextContainerLivro}>
                <Text style={styles.itemTextLivro}>{nomeLivro}</Text>
            </View>
        </View>
    )
};

const Home = () => {
    const { dadosUsuario } = useContext(DataContext);
    const [dadosEditora, setDadosEditora] = useState();
    const [dadosLivro, setDadosLivro] = useState();

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
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <Header title='Home'></Header>
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
                        renderItem={({ item }) => <ItemLivro nomeLivro={item.nomeLivro} img={item.img} />}
                        keyExtractor={item => item.codigoLivro}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </ScrollView>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    sectionHeader: {
        fontWeight: '800',
        fontSize: 18,
        color: '#f4f4f4',
        marginTop: 20,
        marginLeft: 10,
    },
    itemPhoto: {
        width: 200,
        height: 200,
    },
    itemEditora: {
        margin: 10,
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
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    itemLivro: {
        margin: 10,
    },
    itemTextLivro: {
        color: 'rgba(0, 0, 0, 0.7)',
        fontSize: 18,
        marginVertical: 5,
        marginHorizontal: 10,
    },
    itemTextContainerLivro: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderBottomStartRadius: 5,
        borderBottomEndRadius: 5,
    },

});

export default Home;