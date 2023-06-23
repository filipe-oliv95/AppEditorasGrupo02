import { Modal } from 'react-native-paper';

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
  
    return (
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#a8e5d3', borderRadius: 13, borderTopLeftRadius: 5, borderBottomRightRadius: 5, }}>
          <Text style={{ marginVertical: 5, marginHorizontal: 10, color: '#04140f', fontSize: 20,}}>{livro.nomeLivro}</Text>
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
              <TouchableOpacity onPress={() => console.log("adicionar aos favoritos")}></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  export default ModalLivro;
  