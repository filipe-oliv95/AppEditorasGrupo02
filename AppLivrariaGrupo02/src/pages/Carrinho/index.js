import React, { useContext, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { CartContext } from '../../context/CartContext';
import { AppearanceContext } from '../../context/AppearanceContext';
import { sharedStyles, darkStyles, lightStyles } from '../../themes/index';
import { StyleSheet, View, Text, FlatList, Image, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import Toast from "react-native-toast-message";

const Carrinho = () => {
  const { carrinho, removerDoCarrinho, limparCarrinho, diminuirQuantidade, aumentarQuantidade } = useContext(CartContext);
  const navigation = useNavigation();
  const [isPixChecked, setPixChecked] = useState(false);
  const [isCardChecked, setCardChecked] = useState(false);
  const { isEnabled } = useContext(AppearanceContext);
  const style = isEnabled ? lightStyles : darkStyles;

  const quantidade = carrinho.reduce((total, item) => total + item.quantidade, 0);

  const togglePixCheckbox = () => {
    setPixChecked(!isPixChecked);
    if (isCardChecked) setCardChecked(!isCardChecked);
  };

  const toggleCardCheckbox = () => {
    setCardChecked(!isCardChecked);
    if (isPixChecked) setPixChecked(!isPixChecked);
    console.log("Quantidade ao clicar toggleCard " + quantidade)  // verificar quantidade atualizada
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
  console.log("Quantidade no Carrinho " + quantidade)  // verificar quantidade atualizada
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
      <Toast ref={(ref) => { Toast.setRef(ref) }} />
      <FlatList style={{ marginTop: 17 }}
        data={carrinho}
        keyExtractor={(item) => item.codigoLivro}
        renderItem={({ item }) => (
          < View style={{ display: 'flex', flexDirection: 'column', marginRight: 10 }}>
            <View style={styles.contentContainer}>
              <Image
                style={sharedStyles.imgLivroSearch}
                source={{ uri: `data:image/png;base64,${item.img}` }}
              />
              <View style={{ width: 200 }}>
                <Text style={[sharedStyles.text, { fontSize: 18 }]}>{item.nomeLivro}</Text>
                <Text style={sharedStyles.textGrey}>{item.nomeAutor}</Text>
                <View style={styles.addItemContainer}>
                  <View style={styles.addItemContainer}>
                    <TouchableOpacity onPress={() => diminuirQuantidade(item.codigoLivro)}>
                      <AntDesign name="minus" size={24} color={isEnabled ? '#000' : '#fff'} />
                    </TouchableOpacity>
                    <Text style={[style.textOne, { fontSize: 25 }]}>{item.quantidade}</Text>
                    <TouchableOpacity onPress={() => aumentarQuantidade(item.codigoLivro)}>
                      <AntDesign name="plus" size={24} color={isEnabled ? '#000' : '#fff'} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.itemContent}>
                <TouchableOpacity onPress={() => {
                  removerDoCarrinho(item.codigoLivro),
                    Toast.show({
                      position: 'top',
                      text1: 'Livro removido!',
                      text2: 'Seu livro foi removido do carrinho com sucesso.'
                    })
                }} >
                  <FontAwesome5 name="trash" size={24} color="#089A6E" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ width: '100%', height: 1, backgroundColor: '#9D9A9A' }}></View>
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
    justifyContent: 'flex-start',
    padding: 10,
    gap: 5,
    marginLeft: 10,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    padding: 15,
    // borderRadius: 13,
    gap: 10,
    // marginTop: 10,
  },
  addItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 100,
    padding: 20,
    gap: 20
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