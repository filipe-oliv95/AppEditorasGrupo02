import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather, AntDesign  } from '@expo/vector-icons'

import TabRoutes from './tab.routes';
import StackRoutes from './stack.routes';

const Drawer = createDrawerNavigator();

function DrawerRoutes () {
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
                    component={StackRoutes}
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