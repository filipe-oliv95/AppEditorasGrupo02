import { StyleSheet } from 'react-native';

const sharedStyles = {
  // Estilos compartilhados entre os modos
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    fontFamily: 'notoserif', 
    fontWeight: 'bold',
    color: '#089A6E',
  },
  text: {
    fontSize: 16,
    color: '#089A6E',
  },
};

const darkStyles = StyleSheet.create({
  // Estilos específicos para o dark mode
  container: {
    backgroundColor: '#101010',
  },
  title: {
  },
  text: {
  },
});

const lightStyles = StyleSheet.create({
  // Estilos específicos para o light mode
  container: {
    backgroundColor: '#FFF',
  },
  text: {
    color: '#000',
  },
});

export { sharedStyles, darkStyles, lightStyles };
