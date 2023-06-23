import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View
} from "react-native";
import { FontAwesome, Entypo } from '@expo/vector-icons';

export function Logout({ navigation }) {
  const [count, setCount] = useState(10);

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
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <StatusBar style="light" />
        <Text style={styles.txt} >Tenha um bom dia!</Text>
        <FontAwesome name="handshake-o" size={48} color="black" />
        <Text style={styles.txt} >Você será redirecionado para a tela de login em </Text>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 10}}>
          <Text style={{ fontSize: 20 }}>{ count } </Text>
          <ActivityIndicator style={{ margin: 10}} size="large" color="#04140F" />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => handleLoginPage()} >
          <Text style={{ color: '#66d2b1', fontSize: 16 }}>Ou clique aqui para retornar agora</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#51cba6',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    backgroundColor: '#07261d',
    marginTop: 20,
    width: '100%',
    height: 50,
    borderRadius: 13,
  },
})