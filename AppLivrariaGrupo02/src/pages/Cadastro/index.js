import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";
import { AppearanceContext } from '../../context/AppearanceContext';
import { DataContext } from "../../context/DataContext";
import { darkStyles, lightStyles, sharedStyles } from '../../themes/index';

const Cadastro = ({ navigation }) => {
  const [nome, setNome] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [hidePass, setHidePass] = useState(true);
  const [error, setError] = useState('');
  const { isEnabled } = useContext(AppearanceContext);
  const { armazenarDadosUsuario } = useContext(DataContext);
  const styles = isEnabled ? lightStyles : darkStyles;

  const handleSignup = async () => {
    console.log("A")
    if (!nome | !email | !senha) {
      setError("preencha todos os campos");
      return;
    } else if (senha.length < 6) {
      setError("a senha tem que ter mais que seis dígitos");
      return;
    }

    try {
      const resultado = await AxiosInstance.post('/auth/signup', {
        username: nome,
        email: email,
        password: senha,
        role: ["user"]
      });

      if (resultado.status === 200) {
        console.log(resultado)
        try {
          const resultadoSignin = await AxiosInstance.post('/auth/signin', {
            username: nome,
            password: senha
          });
          console.log(nome)
          console.log(senha)

          if (resultadoSignin.status === 200) {
            var jwtToken = resultadoSignin.data;
            armazenarDadosUsuario(jwtToken["accessToken"]);
            navigation.navigate('Home');
          } else {
            console.log('erro ao realizar o login');
          }
        } catch {
          console.log(error);
          setError("Ocorreu um erro login.");
        }
      }
      else {
        console.log("Erro ao realizar o cadastro")
      }
    } catch (error) {
      console.log(error);
      setError("Ocorreu um erro ao salvar os dados.");
    }
  };

  return (
    <SafeAreaView style={[sharedStyles.container, styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <StatusBar style="light" />
      <Image
        style={{ width: 150, height: 100, marginBottom: 15, }}
        source={{
          uri: 'https://i.imgur.com/Mbm6xQl.png'
        }}
      ></Image>
      <Text style={[sharedStyles.headerTwo, styles.headerTwo]} >Cadastro do cliente</Text>
      <View style={style.inputContainer}>
        <Text style={[sharedStyles.textOne, styles.textOne]} >Nome</Text>
        <TextInput
          style={[style.input, error && style.inputError]}
          placeholder='Nome usuário'
          onChangeText={setNome}
          value={nome}
        />
      </View>
      <View style={style.inputContainer}>
        <Text style={[sharedStyles.textOne, styles.textOne]} >Email</Text>
        <TextInput
          style={[style.input, error && style.inputError]}
          placeholder='Email'
          onChangeText={setEmail}
          value={email}
        />
      </View>
      <View style={style.inputContainer}>
        <Text style={[sharedStyles.textOne, styles.textOne]} >Senha:</Text>
        <View style={style.inputArea}>
          <TextInput
            style={[style.inputSenha, error && style.inputError]}
            placeholder='Senha'
            onChangeText={setSenha}
            value={senha}
            secureTextEntry={hidePass}
          />
          <TouchableOpacity style={style.icon} onPress={() => setHidePass(!hidePass)}>
            {hidePass ?
              <Ionicons name="eye" color="#07261d" size={18} />
              :
              <Ionicons name="eye-off" color="#07261d" size={18} />
            }
          </TouchableOpacity>
        </View>
        <View style={{ display: 'flex', alignItems: 'center' }}>
          <Text style={{ color: 'red', margin: 'auto', paddingTop: 10 }}>{error}</Text>
          <TouchableOpacity style={style.button} onPress={handleSignup} >
            <Text style={style.txtButton}>Confirmar cadastro</Text>
          </TouchableOpacity>
          <Text style={[sharedStyles.textOne, styles.textOne, { marginTop: 10 }]} >Já possui conta? Faça login <Text style={{ color: '#089A6E' }} onPress={() => navigation.navigate("Login")}>aqui</Text></Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({

  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 40,
    paddingTop: 20,
  },

  txtinput: {
    fontSize: 16,
    color: '#04140f',
  },

  input: {
    backgroundColor: '#EFFCF8',
    borderRadius: 15,
    width: '100%',
    height: 50,
    paddingHorizontal: 5,
  },
  inputArea: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputSenha: {
    backgroundColor: '#EFFCF8',
    borderRadius: 15,
    flex: 1,
    width: '100%',
    height: 50,
    paddingRight: 40,
    paddingHorizontal: 5,
    position: 'relative',
  },
  inputError: {
    backgroundColor: '#FFD4D4',
  },
  icon: {
    width: 40,
    height: 40,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    right: 0,
    borderRadius: 15,
    paddingRight: 10,

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
  txtButton: {
    color: '#fff',
    fontSize: 18,
  },
})

export default Cadastro;