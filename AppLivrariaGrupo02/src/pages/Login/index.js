import { StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
 } 
 from "react-native";

 import { useState, useContext } from "react";
 import  AxiosInstance  from "../../api/AxiosInstance";
 import { DataContext } from "../../context/DataContext";

 const Login = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const {armazenarDadosUsuario} = useContext(DataContext);

    const handleLogin = async () => {
        console.log(`E-mail: ${email} - Senha: ${senha}`);

        try{
            const resultado = await AxiosInstance.post('/auth/signin',{
                username: email,
                password: senha
            });

            if(resultado.status === 200){
                var jwtToken = resultado.data;
                armazenarDadosUsuario(jwtToken["accessToken"]);

                navigation.navigate("Main");
            }else{
                console.log('erro ao realizar o login');
            }
        }catch(error){
            console.log('erro durante o processo de login: ' + error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.txt} >Bem Vindo</Text>
            <Text style={styles.txtinput} >Email:</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
            />
            <Text style={styles.txtinput} >Senha:</Text>
            <TextInput
                style={styles.input}
                placeholder="Senha"
                onChangeText={setSenha}
                value={senha}
            />
            <TouchableOpacity style={styles.button} onPress={() => handleLogin()} >
                <Text style={styles.txtButton}>Login</Text>
            </TouchableOpacity>
        </View>
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#04140f',
    },
    txtinput: {
        color: '#04140f',
    },
    input: {
        backgroundColor: '#a8e5d3',
        borderRadius: 13,
        width: 200,
        height: 30, 
        margin: 5,
        padding: 3,
        borderTopLeftRadius: 2,
        borderBottomRightRadius: 2,
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#07261d',
        marginTop: 10,
        width: 90,
        height: 45,
        borderRadius: 13,
    },
    txtButton: {
        color: '#66d2b1',
    },
 })

 export default Login;