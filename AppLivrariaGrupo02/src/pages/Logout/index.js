import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';

export function Logout({ navigation }) {

  const handleLoginPage = () => {
    try {
      navigation.navigate("Login");
    } catch (error) {
      console.log('erro para abrir a tela de login ' + error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.txt} >Tenha um bom dia!</Text>
      <FontAwesome name="handshake-o" size={48} color="black" />
      <Text style={styles.txt} >Deseja entrar novamente?</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleLoginPage()} >
        <Text style={styles.txtButton}>Toque aqui para login!</Text>
      </TouchableOpacity>
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
  txt: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
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
    width: 200,
    height: 50,
    borderRadius: 13,
  },
  txtButton: {
    color: '#66d2b1',
  },
})