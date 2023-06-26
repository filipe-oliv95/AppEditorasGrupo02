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
import { StyleSheetConsumer } from "styled-components";

const Login = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { armazenarDadosUsuario } = useContext(DataContext);
    const [hidePass, setHidePass] = useState(true);
    const [error, setError] = useState("");
    const { colorScheme } = useContext(AppearanceContext);
  
    const styles = colorScheme === 'light' ? lightStyles : darkStyles;

    const handleLogin = async () => {
        console.log(`E-mail: ${email} - Senha: ${senha}`);

        try {
            if (!email | !senha) {
                setError("Preencha todos os campos");
                return;
            }

            const resultado = await AxiosInstance.post('/auth/signin', {
                username: email,
                password: senha
            });

            if (resultado.status === 200) {
                var jwtToken = resultado.data;
                armazenarDadosUsuario(jwtToken["accessToken"]);
                navigation.navigate("Home");
            } else {
                console.log('erro ao realizar o login');
            }
        } catch (error) {
            console.log('erro durante o processo de login: ' + error);
            setError("E-mail ou senha incorretos");
        }
    }

    return (
        <SafeAreaView style={[sharedStyles.container, styles.container]}>
            <StatusBar style="light" />
            <Image
            style={{ width: 150, height: 100, marginBottom: 15,}}
            source={{
                uri: 'https://i.imgur.com/Mbm6xQl.png'
            }}
            ></Image>
    
            <Text style={[sharedStyles.headerTwo, styles.headerTwo]} >Bem Vindo(a)</Text>

            <View style={style.inputContainer}>
                <Text style={[sharedStyles.text, styles.text]} >Email:</Text>
                    <TextInput
                        style={[style.input, error && style.inputError]}
                        placeholder=''
                        onChangeText={setEmail}
                        value={email}
                    />
            </View>
            <View style={style.inputContainer}>
                <Text style={[sharedStyles.text, styles.text]} >Senha:</Text>
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
                            <Ionicons name="eye" color="#07261d" size={18}/>
                            :
                            <Ionicons name="eye-off" color="#07261d" size={18} />
                        }
                    </TouchableOpacity>
                </View>
                <Text style={{ color: 'red', margin: 'auto', paddingTop: 10}}>{error}</Text>
                <TouchableOpacity style={style.button} onPress={() => handleLogin()} >
                    <Text style={style.txtButton}>Login</Text>
                </TouchableOpacity>
                <Text style={[sharedStyles.textWhite, styles.textWhite]} >Não possui conta? Registre-se <Text style={{color: '#089A6E'}}>aqui</Text></Text>
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

export default Login;