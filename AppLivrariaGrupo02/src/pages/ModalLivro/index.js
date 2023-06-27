import React, { useEffect, useState, useContext } from 'react';
import { Modal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import { Entypo, Fontisto, AntDesign } from '@expo/vector-icons';
import { AppearanceContext } from '../../context/AppearanceContext';
import { sharedStyles, darkStyles, lightStyles } from '../../themes/index';
import StarRating from 'react-native-star-rating-widget';


function ModalLivro({ visible, hideModal, livro }) {
  const { colorScheme } = useContext(AppearanceContext);
  const style = colorScheme === 'light' ? lightStyles : darkStyles;
  const [rating, setRating] = useState(4.5);
  
  const containerStyle = {
    backgroundColor: 'rgba(16, 16, 16, 0.8)',
    flex: 1,
  };

  // console.log(livro.autorDTO.nomeAutor) // autorDTO não está chegando aqui

  // await AsyncStorage.clear(); // NÃO REMOVER, limpa AsyncStorage se der "Row too big to fit into CursorWindow"
  const addToFavorites = async () => {
    try {
      let favoriteBooks = await AsyncStorage.getItem('favoriteBooks');
      favoriteBooks = favoriteBooks == null ? [] : JSON.parse(favoriteBooks);

      if (favoriteBooks.some(item => item.codigoLivro === livro.codigoLivro)) {
        alert('O livro já está na lista de favoritos!');
      } else {
        const livroToSave = {  // para reduzir os dados salvos no asyncstorage salva apenas id          
          codigoLivro: livro.codigoLivro,
        }
        favoriteBooks.push(livroToSave);
        await AsyncStorage.setItem('favoriteBooks', JSON.stringify(favoriteBooks));
        alert('Livro adicionado aos favoritos!');
      }
    } catch (error) {
      console.log('Ocorreu um erro ao favoritar o livro: ' + error);
    }
  };


  return (
    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
      <View style={{backgroundColor: '#fff',
                    flex: 1,
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50,
                    marginHorizontal: 20,
                    marginTop: 20,
                    padding: 20,
                  }}>
        <View style={{ height: '100%', display: 'flex', justifyContent: 'space-around', flexDirection: 'column', alignItems: 'center', padding: 10, borderRadius: 13, borderTopLeftRadius: 5, borderBottomRightRadius: 5 }}>
          <Text style={sharedStyles.headerTwo}>{livro.nomeLivro}</Text>
          <View style= {{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Entypo name="arrow-left" onPress={hideModal} size={40} color="#08513C" />
            <Image
              style={sharedStyles.imgLivroModal}
              source={{ uri: `data:image/png;base64,${livro.img}` }}
            />
            <Fontisto name="favorite" size={40} color="#08513C" onPress={() => addToFavorites()} />
          </View>
          <View style={{width: 200, height: 1, backgroundColor: '#9D9A9A' }}></View>
          <StarRating rating={rating} onChange={setRating}/>
          {/* <Text style={{ marginVertical: 5, marginHorizontal: 10 }}>{livro.autorDTO.nomeAutor}</Text> */}
          <Text style={{ color: '#04140f', fontSize: 25, fontWeight: 'bold' }}>R$ 564</Text>
          <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: '#089A6E', borderRadius: 13, width: 250, alignItems: 'center', height: 50, justifyContent: 'center' }} onPress={() => console.log("comprar pressionado")}>
            <Text style={{ color:'#fff', fontWeight: 'bold', fontSize: 16, }}>Adicionar ao carrinho</Text>
            <AntDesign style={{ paddingLeft: 15}} name="shoppingcart" size={25} color="#fff" />
          </TouchableOpacity >
        </View>
      </View>
    </Modal>
  );
}
export default ModalLivro;
