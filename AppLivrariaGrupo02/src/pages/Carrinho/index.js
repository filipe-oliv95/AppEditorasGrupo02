import React, { useContext } from "react";
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { CartContext } from '../../context/CartContext';
import { AppearanceContext } from '../../context/AppearanceContext';
import { sharedStyles, darkStyles, lightStyles } from '../../themes/index';
import { StyleSheet, View, Text, FlatList, Image, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';;

const Carrinho = ({ navigation }) => {
  const { carrinho, quantidade, removerDoCarrinho, limparCarrinho } = useContext(CartContext);
  const { colorScheme } = useContext(AppearanceContext);
  const style = colorScheme === 'light' ? lightStyles : darkStyles;

  const finalizarCompra = () => {
    if (quantidade === 0) {
      alert("Não há livros no carrinho, adicione antes de clicar em confirmar!")
    }
    else {
      alert("Compra realizada com sucesso");
      limparCarrinho();
      navigation.navigate('Home');
    }
  }

  return (
    <SafeAreaView style={[sharedStyles.container, style.container, { flex: 1 }]}>
      <StatusBar style="light" />
      <View style={styles.title}>
        <FontAwesome5 name="shopping-cart" size={24} color="#089A6E" />
        <Text style={[sharedStyles.headerThree, style.headerThree]}>Carrinho</Text>
      </View>
      <FlatList
        data={carrinho}
        keyExtractor={(item) => item.codigoLivro.toString()}
        renderItem={({ item }) => (
          <View style={styles.contentContainer}>
            <Text style={styles.itemTextLivros}>{item.nomeLivro}</Text>
            <Image
              style={styles.itemPhoto}
              source={{ uri: `data:image/png;base64,${item.img}` }}
            />
            <View style={styles.itemContent}>
              <Text style={styles.itemTextLivros}>{item.autorDTO.nomeAutor}</Text>
              <TouchableOpacity onPress={() => removerDoCarrinho(item.codigoLivro)}>
                <FontAwesome5 name="trash" size={24} color="#089A6E" />
              </TouchableOpacity>
            </View>
          </View>
        )
        }
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
      <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 24 }} >Total de itens: {quantidade}</Text>
        <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: '#089A6E', borderRadius: 13, width: 220, alignItems: 'center', height: 30, justifyContent: 'center' }} onPress={finalizarCompra}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, }}>Finalizar compra</Text>
          <MaterialCommunityIcons style={{ paddingLeft: 15 }} name="hand-heart" size={25} color="#fff" />
        </TouchableOpacity >
      </View>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#51cba6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    gap: 5,
    marginLeft: 10,
  },
  contentContainer: {
    padding: 15,
    borderRadius: 13,
    display: 'flex',
    gap: 10,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
    position: 'relative',
  },
  itemContent: {
    // margin: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },
  itemTextLivros: {
    color: '#66d2b1',
    fontSize: 18,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  itemPhoto: {
    width: 200,
    height: 200,
    borderRadius: 13,
  },

});

export default Carrinho;