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

function ModalLivro({ visible, hideModal, livro }) {
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    flex: 1,
    margin: 30,
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
      <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Text style={{ marginVertical: 5, marginHorizontal: 10 }}>{livro.nomeLivro}</Text>
        <Image
          style={{ width: 200, height: 200, borderRadius: 13 }}
          source={{ uri: `data:image/png;base64,${livro.img}` }}
        />
        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text>R$ 564</Text>
          <TouchableOpacity style={{ color: '#07261d' }} onPress={() => console.log("comprar pressionado")}>
            <Text style={{ color: '#07261d' }}>COMPRAR</Text>
          </TouchableOpacity >
          <View style={{ display: 'flex', flexDirection: 'row', padding: 5 }}>
            <Text>FAVORITAR</Text>
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
      </View>
    </Modal>
  );
}
export default ModalLivro;
