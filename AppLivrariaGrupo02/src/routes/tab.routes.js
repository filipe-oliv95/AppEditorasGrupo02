import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppearanceContext } from '../context/AppearanceContext';
import { CartContext } from '../context/CartContext';
import { FavoritesContext } from '../context/FavoritesContext';
import Editoras from "../pages/AllEditoras";
import Busca from "../pages/Busca";
import Carrinho from "../pages/Carrinho";
import Favoritos from "../pages/Favoritos";
import Home from '../pages/Home';

const Tab = createBottomTabNavigator();

function TabRoutes() {
  const { isEnabled } = useContext(AppearanceContext);
  const { contagemFavoritos } = useContext(FavoritesContext);

  const { carrinho } = useContext(CartContext);
  const quantidade = carrinho.reduce((total, item) => total + item.quantidade, 0);


  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabel: () => null,
        tabBarStyle: { backgroundColor: isEnabled ? '#fff' : '#000' },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          let badgeCount;

          if (route.name === 'Inicio') {
            iconName = 'home';
          } else if (route.name === 'Busca') {
            iconName = 'search';
          } else if (route.name === 'Favoritos') {
            iconName = 'heart';
          } else if (route.name === 'Carrinho') {
            iconName = 'shopping-cart';
            badgeCount = quantidade;
          } else if (route.name === 'Editoras') {
            iconName = 'book';
          }

          return <Icon name={iconName} size={size} color={color} badgeCount={badgeCount} />;
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
        name="Editoras"
        component={Editoras}
      />
      <Tab.Screen
        name="Favoritos"
        component={Favoritos}
        options={{
          tabBarBadge: contagemFavoritos > 0 ? contagemFavoritos : null,
        }}
      />
      <Tab.Screen
        name="Carrinho"
        component={Carrinho}
        options={{
          tabBarBadge: quantidade > 0 ? quantidade : null,
        }}
      />
    </Tab.Navigator>
  );
}

export default TabRoutes;