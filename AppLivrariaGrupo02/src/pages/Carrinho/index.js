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
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Não há livros no carrinho.',
        text2: 'Adicione antes de clicar em confirmar!'
      })
    }
    else if (!isPixChecked && !isCardChecked) {
      Toast.show({
        type: 'error',
        text1: 'Selecione uma das formas de pagamento.',
        text2: 'Pix ou cartão de crédito'
      })
    } else {
      Toast.show({
        text1: 'Compra realizada com sucesso!',
        text2: 'Volte sempre!'
      })
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
              <View style={{ width: 180, marginLeft: 10 }}>
                <Text style={[sharedStyles.text, { fontSize: 18 }]}>{item.nomeLivro}</Text>
                <Text style={sharedStyles.textGrey}>{item.nomeAutor}</Text>
                <Text style={[sharedStyles.text, { fontSize: 30 }]}>R$ 29.90</Text>

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
      <Toast ref={(ref) => { Toast.setRef(ref) }} />
      <View style={[sharedStyles.headerThree, style.headerThree, { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }]}>
        <View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={[sharedStyles.textGrey, { paddingBottom: 0 }]} >Pagamento:</Text>
            <Checkbox
              style={styles.checkbox}
              value={isPixChecked}
              onValueChange={togglePixCheckbox}
              color={isPixChecked ? '#51cba6' : undefined}
            />
            <Text style={[sharedStyles.textGrey, { fontWeight: 'bold', fontSize: 13, paddingBottom: 0 }]} >Pix</Text>
            <Checkbox
              style={styles.checkbox}
              value={isCardChecked}
              onValueChange={toggleCardCheckbox}
              color={isCardChecked ? '#51cba6' : undefined}
            />
            <Text style={[sharedStyles.textGrey, { fontWeight: 'bold', fontSize: 13, paddingBottom: 0 }]} >Cartão de crédito</Text>
          </View>
        </View>
        <View style={{ width: '100%', height: 1, backgroundColor: '#9D9A9A' }}></View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 70, gap: 10, marginRight: 60 }}>
          <Text style={[sharedStyles.textGrey, { padding: 0 }]} >Subtotal:</Text>
          <Text style={[sharedStyles.headerThree, { fontWeight: 'bold', fontSize: 25, paddingBottom: 0 }]} >R$ {(quantidade * 29.9).toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={{ position: 'absolute', right: 0, bottom: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: '#089A6E', marginBottom: 10, marginRight: 10, borderRadius: 13, width: 90, height: 50 }} onPress={finalizarCompra}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>Finalizar compra</Text>
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
    gap: 10,
  },
  addItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 100,
    gap: 20
  },
  itemContent: {
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