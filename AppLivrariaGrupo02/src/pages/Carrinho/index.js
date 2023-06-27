import React, { useContext } from "react";
import { FontAwesome5 } from '@expo/vector-icons';
import { CartContext } from '../../context/CartContext';
import { AppearanceContext } from '../../context/AppearanceContext';
import { sharedStyles, darkStyles, lightStyles } from '../../themes/index';
import { StyleSheet, View, Text, FlatList, Image, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';;

const Carrinho = () => {
  const { carrinho, quantidade } = useContext(CartContext);
  const { colorScheme } = useContext(AppearanceContext);
  const style = colorScheme === 'light' ? lightStyles : darkStyles;

  return (
    <SafeAreaView style={[sharedStyles.container, style.container, { flex: 1 }]}>
      <StatusBar style="light" />
      <View style={styles.title}>
        <FontAwesome5 name="shopping-cart" size={24} color="#089A6E" />
        <Text style={[sharedStyles.headerThree, style.headerThree]}>Carrinho</Text>
      </View>
      <Text style={{ fontSize: 30 }} >Total de itens no carrinho: {quantidade}</Text>
      <Text style={styles.sectionHeader}>Favoritos</Text>
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
            </View>
            <TouchableOpacity onPress={() => handleRemove(item.codigoLivro)}>
              <FontAwesome5 name="heart-broken" size={24} color="#66d2b1" />
            </TouchableOpacity>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
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
    justifyContent: 'flex-start',
    padding: 10,
    gap: 5,
    marginLeft: 10,
  },

});

export default Carrinho;