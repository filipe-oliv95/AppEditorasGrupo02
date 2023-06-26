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
import { FontAwesome } from '@expo/vector-icons';

function ModalLivro({ visible, hideModal, livro }) {

  const containerStyle = {
    backgroundColor: '#07261d',
    padding: 5,
    flex: 1,
    margin: 30,
    borderRadius: 13,
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 5,
  };

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
      <View style={{ height: '100%', display: 'flex', justifyContent: 'space-around', flexDirection: 'column', alignItems: 'center', backgroundColor: '#a8e5d3', padding: 10, borderRadius: 13, borderTopLeftRadius: 5, borderBottomRightRadius: 5, }}>
        <FontAwesome style={{ position: 'absolute', right: 0, top: 0, padding: 15 }} onPress={hideModal} name="close" size={30} color="black" />
        <Text style={{ color: '#04140f', fontWeight: 'bold', fontSize: 25, }}>{livro.nomeLivro}</Text>
        <Image
          style={{ width: 250, height: 250, borderRadius: 13, borderTopLeftRadius: 5, borderBottomRightRadius: 5, }}
          source={{ uri: `data:image/png;base64,${livro.img}` }}
        />
        <Text style={{ marginVertical: 5, marginHorizontal: 10 }}>{livro.nomeAutor}</Text>
        <Text style={{ color: '#04140f', fontSize: 25, fontWeight: 'bold' }}>R$ 564</Text>
        <TouchableOpacity style={{ backgroundColor: '#07261d', borderRadius: 13, width: 250, alignItems: 'center', height: 40, justifyContent: 'center' }} onPress={() => console.log("comprar pressionado")}>
          <Text style={{ borderRadius: 13, color: '#66d2b1', padding: 7 }}>COMPRAR</Text>
        </TouchableOpacity >
        <View style={{ display: 'flex', flexDirection: 'row', padding: 5 }}>
          <Text style={{ color: '#04140f', fontSize: 16 }}>FAVORITAR</Text>
          <TouchableOpacity onPress={() => addToFavorites()}>
            <Icon
              name='heart'
              size={20}
              color='#4CCB68'
            />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => console.log("adicionar aos favoritos")}></TouchableOpacity> */}
        </View>
      </View>
    </Modal>
  );
}
export default ModalLivro;
