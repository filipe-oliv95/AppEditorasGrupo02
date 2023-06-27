import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, StatusBar, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import { AppearanceContext } from '../../context/AppearanceContext';
import { sharedStyles, darkStyles, lightStyles } from '../../themes/index';

const LoadingScreen = ({ navigation }) => {
  const [count, setCount] = useState(5);
  const { colorScheme } = useContext(AppearanceContext);
  
  const styles = colorScheme === 'light' ? lightStyles : darkStyles;

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
    <SafeAreaView style={[sharedStyles.container, styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <StatusBar style="light" />
      <Text style={[sharedStyles.headerOne, styles.headerOne]} >LIVRARIA</Text>
      <Image 
        style ={{ width: 300, height: 200}}
        source={{
          uri: 'https://i.imgur.com/Mbm6xQl.png',
        }}></Image>
      <Entypo name="book" size={35} color='#089A6E'
        style={{position: 'absolute', right: 0, bottom: 0, margin: 10, marginRight: 50}}
      />
      <ActivityIndicator style={{ position: 'absolute', right: 0, bottom: 0, margin: 10}} size="large" color="#089A6E" />
    </SafeAreaView>
  );
};


export default LoadingScreen;