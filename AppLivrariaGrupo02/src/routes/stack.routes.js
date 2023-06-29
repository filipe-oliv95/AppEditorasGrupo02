
import { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import { Feather } from '@expo/vector-icons'
import Cadastro from '../pages/Cadastro';
import Editora from "../pages/Editora";
import Livro from "../pages/Livro";
import Login from "../pages/Login";
import LoadingScreen from "../pages/Loading";
import DrawerRoutes from './drawer.routes';
import { AppearanceContext } from '../context/AppearanceContext';
const Stack = createStackNavigator();

function StackRoutes() {
    const { isEnabled } = useContext(AppearanceContext);

    return (
        <Stack.Navigator initialRouteName='LoadingScreen'>
            <Stack.Screen
                name='LoadingScreen'
                component={LoadingScreen}
                options={{
                    headerShown: false,

                }}
            />
            <Stack.Screen
                name='Login'
                component={Login}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='Cadastro'
                component={Cadastro}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='Home'
                component={DrawerRoutes}
                options={{
                    headerShown: false,
                }}
            />
            {/* alterou aqui a cor do header desses */}
            <Stack.Screen
                name='Editora'
                component={Editora}
                options={{
                    headerStyle: {
                        backgroundColor: isEnabled ? '#fff' : '#000'
                    },
                    headerTintColor: '#089A6E',
                }}
            />
            <Stack.Screen
                name='Livro'
                component={Livro}
                options={{
                    headerStyle: {
                        backgroundColor: isEnabled ? '#fff' : '#000'
                    },
                    headerTintColor: '#089A6E',
                }}
            />
        </Stack.Navigator>
    )
}

export default StackRoutes;