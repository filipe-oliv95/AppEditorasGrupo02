import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 

const LoadingScreen = ({ navigation }) => {
  const [count, setCount] = useState(2);

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text style={{fontSize: 50, fontFamily: 'notoserif'}} >LIVRARIA</Text>
      <Image 
        style ={{ width: 300, height: 200}}
        source={{
          uri: 'https://i.imgur.com/Mbm6xQl.png',
        }}></Image>
      <Entypo name="book" size={35} color="black" 
        style={{ position: 'absolute', right: 0, bottom: 0, margin: 10, marginRight: 50}}
      />
      <ActivityIndicator style={{ position: 'absolute', right: 0, bottom: 0, margin: 10}} size="large" color="#04140F" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#51cba6',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default LoadingScreen;