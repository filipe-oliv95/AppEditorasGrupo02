import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from '../pages/Home'
import Busca from "../pages/Busca";
import Favoritos from "../pages/Favoritos";
import Carrinho from "../pages/Carrinho";

const Tab = createBottomTabNavigator();

function TabRoutes() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarLabel: () => null,
      tabBarStyle: { backgroundColor: '#07261d' },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'gray',
    }}>
      <Tab.Screen
        name="Inicio"
        component={Home}
        options={{
          tabBarIcon: (tabInfo) => (
            <Icon name="home" size={24} color='#66d2b1' />
          ),
        }} />
      <Tab.Screen
        name="Busca"
        component={Busca}
        options={{
          tabBarIcon: (tabInfo) => (
            <Icon name="search" size={24} color='#66d2b1' />
          ),
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={Favoritos}
        options={{
          tabBarIcon: (tabInfo) => (
            <Icon name="heart" size={24} color='#66d2b1' />
          ),
        }} />
      <Tab.Screen
        name="Carrinho"
        component={Carrinho}
        options={{
          tabBarIcon: (tabInfo) => (
            <Icon name="shopping-cart" size={24} color='#66d2b1' />
          ),
        }} />
    </Tab.Navigator>
  );
}

export default TabRoutes;