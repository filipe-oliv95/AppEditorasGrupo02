import { AntDesign, Entypo, Fontisto } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Modal } from 'react-native-paper';
import StarRating from 'react-native-star-rating-widget';
import { FavoritesContext } from '../../context/FavoritesContext';
import { CartContext } from '../../context/CartContext';
import { getValueFor, saveIncremental } from '../../services/DataService';
import { sharedStyles } from '../../themes/index';

function ModalLivro({ visible, hideModal, livro }) {

  const { adicionarAoCarrinho } = useContext(CartContext);
  const { contagemFavAtualizada } = useContext(FavoritesContext);

  const [rating, setRating] = useState(4.5);
  const [dadosLivrosSecStore, setdadosLivrosSecStore] = useState();

  const containerStyle = {
    backgroundColor: 'rgba(16, 16, 16, 0.8)',
    flex: 1,
  };

  const addToFavorites = async (key, value) => {
    console.log('addToFavorites no ModalLivro:', saveIncremental); // entra na funcao
    console.log('livro.codigoLivro:', value);  // correto codigoLivro

    await saveIncremental(key, value);
    console.log('Livro adicionado aos favoritos.');
    setdadosLivrosSecStore(await getValueFor('favoriteBooks'));
    console.log('Estado atualizado com novos favoritos.');

    contagemFavAtualizada();
    console.log('Contagem favoritos atualizada.');

    console.log("codigoLivro dentro do addToFavorites" + livro.codigoLivro)
  }

  useEffect(() => {
    const getFavoriteBooks = async () => {
      let storedFavoriteBooks = await getValueFor('favoriteBooks');
      console.log('livro')
      storedFavoriteBooks = storedFavoriteBooks == null ? [] : JSON.parse(storedFavoriteBooks);
      setdadosLivrosSecStore(storedFavoriteBooks);
    };

    getFavoriteBooks();
  }, [livro]);

  return (
    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>

      <View style={{
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        marginHorizontal: 20,
        marginTop: 20,
        padding: 20,
      }}>
        <View style={{ height: '100%', display: 'flex', justifyContent: 'space-around', flexDirection: 'column', alignItems: 'center', padding: 10, borderRadius: 13, borderTopLeftRadius: 5, borderBottomRightRadius: 5 }}>
          <Text style={[sharedStyles.headerTwo, { color: '#08513C' }]}>{livro.nomeLivro}</Text>
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Entypo name="chevron-left" style={{ width: 40 }} onPress={hideModal} size={50} color="#08513C" />
            <Image
              style={sharedStyles.imgLivroModal}
              source={{ uri: `data:image/png;base64,${livro.img}` }}
            />
            <Fontisto name="favorite" style={{ width: 40 }} size={40} color="#08513C" onPress={() => addToFavorites('favoriteBooks', livro.codigoLivro)} />
          </View>
          <View style={{ width: 200, height: 1, backgroundColor: '#9D9A9A' }}></View>
          <StarRating color={'#FFE500'} rating={rating} onChange={setRating} />
          <Text style={[sharedStyles.textGrey, { marginVertical: 5, marginHorizontal: 10 }]}>{livro.nomeAutor}</Text>
          <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: '#089A6E', borderRadius: 13, width: 250, alignItems: 'center', height: 50, justifyContent: 'center' }} onPress={() => adicionarAoCarrinho(livro)}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, }}>Adicionar ao carrinho</Text>
            <AntDesign style={{ paddingLeft: 15 }} name="shoppingcart" size={25} color="#fff" />
          </TouchableOpacity >

        </View>
      </View>
    </Modal>
  );
}
export default ModalLivro;
