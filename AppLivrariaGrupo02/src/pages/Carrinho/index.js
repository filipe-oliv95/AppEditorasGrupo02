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
    <SafeAreaView>
      <StatusBar style="light" />
      <Text style={styles.h1}>CARRINHO</Text>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  h1: {
    fontSize: 60,
  }

});

export default Carrinho;