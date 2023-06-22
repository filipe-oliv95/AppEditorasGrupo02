import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  Image,
  FlatList,
  StatusBar,
} from 'react-native';


const Carrinho = () => {
  return (
    <View>
      <StatusBar style="light" />
      <Text style={styles.h1}>CARRINHO</Text>
    </View>
  );
};



const styles = StyleSheet.create({
  h1: {
    fontSize: 60,
  }

});

export default Carrinho;