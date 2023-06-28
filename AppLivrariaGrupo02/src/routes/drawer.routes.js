import React, { useContext } from 'react';
import { AntDesign, Feather } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Switch } from 'react-native';
import TabRoutes from './tab.routes';
import { Logout } from '../pages/Logout';
import { AppearanceContext } from '../context/AppearanceContext';

const Drawer = createDrawerNavigator();

function DrawerContent() {
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView>
      <DrawerItem
        label="G2 LIVRARIA"
        icon={({ color, size }) => <Feather name="home" color={color} size={size} />}
        onPress={() => navigation.navigate('Main')}
      />

      <DrawerItem
        label="Logout"
        icon={({ color, size }) => <AntDesign name="logout" color={color} size={size} />}
        onPress={() => navigation.navigate('Logout')}
      />
    </DrawerContentScrollView>
  );
}

function DrawerRoutes() {
    const { isEnabled, toggleSwitch } = useContext(AppearanceContext);
  
    const onToggleSwitch = () => {
        toggleSwitch();
    }
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerContent={DrawerContent}
      screenOptions={{
        headerTintColor: '#66d2b1',
        headerStyle: {
          backgroundColor: isEnabled ? '#fff' : '#000',
        },
      }}
    >
      <Drawer.Screen
        name="Main"
        component={TabRoutes}
        options={() => ({
          drawerIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
          drawerLabel: 'G2 LIVRARIA',
          headerRight: () => (
            <View style={styles.settingsButtonContainer}>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={onToggleSwitch}
                value={isEnabled}
              />
            </View>
          ),
        })}
      />

      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{
          drawerIcon: ({ color, size }) => <AntDesign name="logout" color={color} size={size} />,
          headerShown: false,
          drawerLabel: 'Logout',
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  settingsButtonContainer: {
    marginRight: 10,
  },
});

export default DrawerRoutes;
