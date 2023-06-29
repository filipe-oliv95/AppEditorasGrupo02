import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image
}
  from "react-native";

import React, { useState, useContext } from "react";
import AxiosInstance from "../../api/AxiosInstance";
import { DataContext } from "../../context/DataContext";
import { Ionicons } from '@expo/vector-icons';
import { AppearanceContext } from '../../context/AppearanceContext';
import { sharedStyles, darkStyles, lightStyles } from '../../themes/index';

const Cadastro = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  // const [confSenha, setConfSenha] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [error, setError] = useState('');
  const { isEnabled } = useContext(AppearanceContext);

  const styles = isEnabled ? lightStyles : darkStyles;


  const handleSignup = async () => {
    if (!nome | !email | !senha) {
      setError("preencha todos os campos");
      return;
      // } else if (senha !== confSenha) {
      //   setError("as senhas não são iguais");
      //   return;
    } else if (senha.length < 6) {
      setError("a senha tem que ter mais que seis dígitos");
      return;
      // } else if (nome.length > 11) {
      //   setError("O nome escolhido é muito grande!");
      //   return;
    }

    try {
      await AxiosInstance.post("/auth/signup", {
        username: nome,
        email: email,
        password: senha,
        role: ["user"],
      });

      alert("usuário cadatrado com sucesso! Você será redirecionado para login");
      navigation.navigate("/login");
    } catch (error) {
      console.log('erro durante o processo de cadastro: ' + error);
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
          placeholder=''
          onChangeText={setNome}
          value={nome}
        />
      </View>
      <View style={style.inputContainer}>
        <Text style={[sharedStyles.textOne, styles.textOne]} >Email</Text>
        <TextInput
          style={[style.input, error && style.inputError]}
          placeholder=''
          onChangeText={setEmail}
          value={email}
        />
      </View>
      <View style={style.inputContainer}>
        <Text style={[sharedStyles.textOne, styles.textOne]} >Senha:</Text>
        <View style={style.inputArea}>
          <TextInput
            style={[style.inputSenha, error && style.inputError]}
            placeholder=''
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

        {/* <Text style={[sharedStyles.textOne, styles.textOne]} >Repetir senha:</Text>
        <View style={style.inputArea}>
          <TextInput
            style={[style.inputSenha, error && style.inputError]}
            placeholder=''
            onChangeText={setConfSenha}
            value={confSenha}
            secureTextEntry={hidePass}
          />
          <TouchableOpacity style={style.icon} onPress={() => setHidePass(!hidePass)}>
            {hidePass ?
              <Ionicons name="eye" color="#07261d" size={18} />
              :
              <Ionicons name="eye-off" color="#07261d" size={18} />
            }
          </TouchableOpacity>
        </View> */}
        <View style={{ display: 'flex', alignItems: 'center' }}>
          <Text style={{ color: 'red', margin: 'auto', paddingTop: 10 }}>{error}</Text>
          <TouchableOpacity style={style.button} onPress={() => handleSignup()} >
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