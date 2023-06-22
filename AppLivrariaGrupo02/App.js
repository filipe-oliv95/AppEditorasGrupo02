import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DataProvider } from './src/context/DataContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import Carrinho from "./src/pages/Carrinho";
import Editora from "./src/pages/Editora";
import Editoras from "./src/pages/Editoras";
import Favoritos from "./src/pages/Favoritos";
import Home from "./src/pages/Home";
import Livro from "./src/pages/Livro";
import Login from "./src/pages/Login";
import Busca from "./src/pages/Busca";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarLabel: () => null,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => (
            <Icon name="home" size={24} />
          ),
        }} />
      <Tab.Screen name="Busca"
        component={Busca}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => (
            <Icon name="search" size={24} />
          ),
        }} />
      <Tab.Screen
        name="Favoritos"
        component={Favoritos}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => (
            <Icon name="heart" size={24} />
          ),
        }} />
      <Tab.Screen
        name="Carrinho"
        component={Carrinho}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => (
            <Icon name="shopping-cart" size={24} />
          ),
        }} />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <DataProvider>
      <NavigationContainer>
        {/* mudar para login */}
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }} >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Main" component={Tabs} />
          <Stack.Screen name="Editoras" component={Editoras} />
          <Stack.Screen name="EditoraLivros" component={Editora} options={{ headerShown: true }} />
          <Stack.Screen name="Livro" component={Livro} options={{ headerShown: true }} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}

export default App;