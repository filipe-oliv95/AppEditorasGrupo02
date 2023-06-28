import React, { useContext, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { CartContext } from '../../context/CartContext';
import { AppearanceContext } from '../../context/AppearanceContext';
import { sharedStyles, darkStyles, lightStyles } from '../../themes/index';
import { StyleSheet, View, Text, FlatList, Image, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';

const Carrinho = () => {
  const { carrinho, quantidade, removerDoCarrinho, limparCarrinho } = useContext(CartContext);
  const navigation = useNavigation();
  const [isPixChecked, setPixChecked] = useState(false);
  const [isCardChecked, setCardChecked] = useState(false);
  const { isEnabled } = useContext(AppearanceContext);
  const style = isEnabled ? lightStyles : darkStyles;

  const togglePixCheckbox = () => {
    setPixChecked(!isPixChecked);
    if (isCardChecked) setCardChecked(!isCardChecked);
  };

  const toggleCardCheckbox = () => {
    setCardChecked(!isCardChecked);
    if (isPixChecked) setPixChecked(!isPixChecked);
  };


  const finalizarCompra = () => {
    if (quantidade === 0) {
      alert("Não há livros no carrinho, adicione antes de clicar em confirmar!")
    }
    else {
      alert("Compra realizada com sucesso");
      limparCarrinho();
      setTimeout(() => {
        navigation.navigate('Inicio');
      }, 2200);
    }
  }

  return (
    <SafeAreaView style={[sharedStyles.container, style.container, { flex: 1 }]}>
      <StatusBar style="light" />
      <View style={{ display: 'flex', flexDirection: 'column' }}>
        <View style={styles.title}>
          <FontAwesome5 name="shopping-cart" size={24} color="#089A6E" />
          <Text style={[sharedStyles.headerThree, style.headerThree]}>CARRINHO</Text>
        </View>
        <View style={{ width: '100%', height: 1, backgroundColor: '#9D9A9A' }}></View>
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
        ListEmptyComponent={
          <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 50, color: 'grey' }}>
            O carrinho está vazio.
          </Text>
        }
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
      <View style={[sharedStyles.headerThree, style.headerThree, { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 10, alignItems: 'center' }]}>
        <Text style={[sharedStyles.headerThree, style.headerThree, { fontWeight: 'bold', fontSize: 20 }]} >Total de itens: {quantidade}</Text>
        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' }}>
          <Text style={[sharedStyles.headerThree, style.headerThree, , { fontWeight: 'bold', fontSize: 20 }]} >Pagamento:</Text>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={isPixChecked}
              onValueChange={togglePixCheckbox}
              color={isPixChecked ? '#51cba6' : undefined}
            />
            <Text style={[sharedStyles.headerThree, style.headerThree, { fontWeight: 'bold', fontSize: 10 }]} >Pix:</Text>
          </View>

          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={isCardChecked}
              onValueChange={toggleCardCheckbox}
              color={isCardChecked ? '#51cba6' : undefined}
            />
            <Text style={[sharedStyles.headerThree, style.headerThree, { fontWeight: 'bold', fontSize: 10 }]} >Cartão de crédito:</Text>
          </View>
        </View>
        <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: '#089A6E', marginBottom: 10, borderRadius: 13, width: 220, alignItems: 'center', height: 30, justifyContent: 'center' }} onPress={finalizarCompra}>
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
  container2: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },

});

export default Carrinho;