import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, View, Text, StyleSheet, ActivityIndicator } from 'react-native';

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
      <Text style={styles.txt} >{count}</Text>
      <ActivityIndicator size="large" color="#0000ff" />
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