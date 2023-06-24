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

const Login = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { armazenarDadosUsuario } = useContext(DataContext);
    const [hidePass, setHidePass] = useState(true);
    const [error, setError] = useState("");

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
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />

            <Image
            style={{ width: 200, height: 150, marginBottom: 15,}}
            source={{
                uri: 'https://i.imgur.com/Mbm6xQl.png'
            }}
            ></Image>
    
            <Text style={styles.txt} >Bem Vindo(a)</Text>

            <View style={styles.campoArea}>
                <Text style={styles.txtinputEmail} >Email:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        onChangeText={setEmail}
                        value={email}
                    />
            </View>
            <View style={styles.campoArea}>
                <Text style={styles.txtinput} >Senha:</Text>
                <View style={styles.inputArea}>
                    <TextInput
                        style={styles.inputSenha}
                        placeholder="Senha"
                        onChangeText={setSenha}
                        value={senha}
                        secureTextEntry={hidePass}
                    />
                    <TouchableOpacity style={styles.icon} onPress={() => setHidePass(!hidePass)}>
                        {hidePass ?
                            <Ionicons name="eye" color="#07261d" size={18}/>
                            :
                            <Ionicons name="eye-off" color="#07261d" size={18} />
                        }
                    </TouchableOpacity>
                </View>
            </View>
            <Text >{error}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleLogin()} >
                <Text style={styles.txtButton}>Login</Text>
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
    campoArea: {
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    txt: {
        fontFamily: 'notoserif',
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#04140f',
    },
    txtinput: {
        fontSize: 16,
        color: '#04140f',
    },
    txtinputEmail: {
        fontSize: 16,
        color: '#04140f',
        paddingLeft: 5,
    },
    input: {
        backgroundColor: '#a8e5d3',
        borderRadius: 13,
        width: 300,
        height: 40,
        margin: 5,
        padding: 3,
        marginTop: 5,
        borderTopLeftRadius: 2,
        borderBottomRightRadius: 2,
    },
    inputArea: {
        flexDirection: 'row',
    },
    inputSenha: {
        backgroundColor: '#a8e5d3',
        borderBottomLeftRadius: 13,
        borderTopLeftRadius: 2,
        width: 260,
        height: 40,
        marginTop: 5,
        padding: 3,
    },
    icon: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a8e5d3',
        marginTop: 5,
        borderBottomRightRadius: 2,
        borderTopRightRadius: 13,

    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#07261d',
        marginTop: 20,
        width: 300,
        height: 50,
        borderRadius: 13,
    },
    txtButton: {
        color: '#66d2b1',
    },
})

export default Login;