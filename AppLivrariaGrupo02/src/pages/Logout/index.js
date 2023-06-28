import React, { useEffect, useState, useContext } from 'react';
import { Image } from 'react-native';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View
} from "react-native";
import { AppearanceContext } from '../../context/AppearanceContext';
import { sharedStyles, darkStyles, lightStyles } from '../../themes/index';

export function Logout({ navigation }) {
  const [count, setCount] = useState(10);
  const { isEnabled } = useContext(AppearanceContext);
  
  const style = isEnabled ? lightStyles : darkStyles;

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    if (count === 0) {
      clearInterval(timer);
      navigation.navigate('Login'); // Redirecionamento para a página de login
    }

    return () => clearInterval(timer);
  }, [count, navigation]);

  const handleLoginPage = () => {
    try {
      navigation.navigate("Login");
    } catch (error) {
      console.log('erro para abrir a tela de login ' + error);
    }
  }

  return (
    <SafeAreaView style={[sharedStyles.container, style.container, {flex: 1, flexDirection: 'column', alignItems:'center', justifyContent:'space-between'}]}>
      <View style={styles.contentContainer}>
        <StatusBar style="light" />
        <Text style={[sharedStyles.headerOne, style.headerOne]} >Tenha um bom dia!</Text>
        <Image 
        style ={{ width: 300, height: 200}}
        source={{
          uri: 'https://i.imgur.com/Mbm6xQl.png',
        }}></Image>
        <Text style={[sharedStyles.text, style.text, { fontSize: 18 }]} >Você será redirecionado para a tela de login em </Text>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 10}}>
          <Text style={[sharedStyles.text, style.text, { fontSize: 20 }]}>{ count } </Text>
          <ActivityIndicator style={{ margin: 10}} size="large" color='#089A6E' />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => handleLoginPage()} >
          <Text style={sharedStyles.textWhite}>Ou clique aqui para retornar agora</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    textAlign: 'center',
  },
  txt: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#04140f',
  },
  containerButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#089A6E',
    marginTop: 20,
    width: '100%',
    height: 50,
    borderRadius: 13,
  },
})