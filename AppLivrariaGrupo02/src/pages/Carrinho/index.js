import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  Image,
  FlatList,
  StatusBar,
  SafeAreaView
} from 'react-native';





const Carrinho = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text style={{ fontSize: 30 }} >CARRINHO EM CONSTRUÇÃO</Text>
      {/* <Text style={styles.sectionHeader}>Favoritos</Text>
      <FlatList
        data={favoriteBooks}
        keyExtractor={(item) => item.codigoLivro.toString()}
        renderItem={({ item }) => (
          <View style={styles.contentContainer}>
            <Text style={styles.itemTextLivros}>{item.nomeLivro}</Text>
            <Image
              style={styles.itemPhoto}
              source={{ uri: `data:image/png;base64,${item.img}` }}
            />
            {(
              <StarRating
                rating={rating[item.codigoLivro] || 0}
                onChange={(newRating) => setRating({ ...rating, [item.codigoLivro]: newRating })}
              />
            )}
            <View style={styles.itemContent}>
              <Text style={styles.itemTextLivros}>{item.autorDTO.nomeAutor}</Text>
            </View>
            <TouchableOpacity onPress={() => handleRemove(item.codigoLivro)}>
              <FontAwesome5 name="heart-broken" size={24} color="#66d2b1" />
            </TouchableOpacity> */}
      {/* </View>
        )}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      /> */}
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

});

export default Carrinho;