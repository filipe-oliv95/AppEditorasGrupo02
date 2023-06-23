
import { createStackNavigator } from '@react-navigation/stack';
// import { Feather } from '@expo/vector-icons'
import Editora from "../pages/Editora";
import Livro from "../pages/Livro";
import Login from "../pages/Login";
import LoadingScreen from "../pages/Loading";
import DrawerRoutes from './drawer.routes';

const Stack = createStackNavigator();

function StackRoutes() {
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
                name='Home'
                component={DrawerRoutes}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='Editora'
                component={Editora}
            />
            <Stack.Screen
                name='Livro'
                component={Livro}
            />
        </Stack.Navigator>
    )
}

export default StackRoutes;