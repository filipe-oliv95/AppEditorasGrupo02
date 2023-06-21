import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/pages/Login';
import { DataProvider } from './src/context/DataContext';


const Stack = createStackNavigator();

const App = () => {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>   
          <Stack.Screen name ="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}

export default App;