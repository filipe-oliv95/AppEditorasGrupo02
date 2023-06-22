import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Sidebar from '../Sidebar'

const Header = ({ title }) => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={toggleSidebar} >
          <Icon
            name='bars'
            size={20}
            color='rgba(255, 255, 255, 0.9)'
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <View style={styles.sidedbarContainer}>
        {sidebarOpen && <Sidebar />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40,

    width: '100%',
    height: 80,
    paddingHorizontal: 20,
  },
  headerText: {
    fontWeight: 800,
    fontSize: 25,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  sidedbarContainer: {
  },
});

export default Header;