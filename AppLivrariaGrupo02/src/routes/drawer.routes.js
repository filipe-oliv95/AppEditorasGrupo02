import { AntDesign, Feather } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabRoutes from './tab.routes';
import { Logout } from '../pages/Logout';

const Drawer = createDrawerNavigator();

function DrawerRoutes() {
    return (    // altera aqui a cor do icone hamburguer
        <Drawer.Navigator initialRouteName={'Login'} screenOptions={{ title: '', headerTintColor: 'rgba(255, 255, 255, 0.9)' }}>
            <Drawer.Screen
                name='Main'
                component={TabRoutes}
                options={{
                    drawerIcon: ({ color, size }) => <Feather name='home' color={color} size={size} />,
                    drawerLabel: 'G2 LIVRARIA',
                    headerStyle: {
                        backgroundColor: '#07261d',
                    } // AQUI ALTERA A COR DO HEADER HOME
                }}
            />

            <Drawer.Screen
                name='Logout'
                component={Logout}
                options={{
                    drawerIcon: ({ color, size }) => <AntDesign name='logout' color={color} size={size} />,
                    headerShown: false,
                    drawerLabel: 'Logout'
                }}
            />
        </Drawer.Navigator>
    )
}

export default DrawerRoutes;