import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { DataProvider } from './src/context/DataContext';

import Login from "./src/pages/Login";
import Home from "./src/pages/Home";
import Favoritos from "./src/pages/Favoritos";
import Carrinho from "./src/pages/Carrinho";
import Editoras from "./src/pages/Editoras";
import Editora from "./src/pages/Editora";
import Livro from "./src/pages/Livro";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs({ navigation }) {
  return (
    <Tab.Navigator initialRouteName='Home' >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Busca" component={Editoras} options={{ headerShown: false }} />
      <Tab.Screen name="Favoritos" component={Favoritos} options={{ headerShown: false }} />
      <Tab.Screen name="Carrinho" component={Carrinho} options={{ headerShown: false }} />
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