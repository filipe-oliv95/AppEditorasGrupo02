import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useContext } from 'react';
import Home from '../pages/Home'
import Busca from "../pages/Busca";
import Favoritos from "../pages/Favoritos";
import Carrinho from "../pages/Carrinho";
import { AppearanceContext } from '../context/AppearanceContext';

const Tab = createBottomTabNavigator();

function TabRoutes() {
  const { isEnabled } = useContext(AppearanceContext);

  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarLabel: () => null,
      tabBarStyle: { backgroundColor: isEnabled ? '#fff' : '#000' },
      tabBarIcon: ({ color, size }) => {
        let iconName;

            if (route.name === 'Inicio') {
              iconName = 'home';
            } else if (route.name === 'Busca') {
              iconName = 'search';
            } else if (route.name === 'Favoritos') {
              iconName = 'heart';
            } else if (route.name === 'Carrinho') {
              iconName = 'shopping-cart';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#089A6E',
          tabBarInactiveTintColor: '#6A6767',
      }

    )}>
      <Tab.Screen
        name="Inicio"
        component={Home}
        />
      <Tab.Screen
        name="Busca"
        component={Busca}
      />
      <Tab.Screen
        name="Favoritos"
        component={Favoritos}
        />
      <Tab.Screen
        name="Carrinho"
        component={Carrinho}
        />
    </Tab.Navigator>
  );
}

export default TabRoutes;