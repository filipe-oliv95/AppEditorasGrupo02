import { AntDesign, Feather } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabRoutes from './tab.routes';
import { Logout } from '../pages/Logout';

const Drawer = createDrawerNavigator();

function DrawerRoutes() {
    return (
        <Drawer.Navigator initialRouteName={'Login'}>
            <Drawer.Screen
                name='Main'
                component={TabRoutes}
                options={{
                    drawerIcon: ({ color, size }) => <Feather name='home' color={color} size={size} />,
                    drawerLabel: 'G2 LIVRARIA'
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