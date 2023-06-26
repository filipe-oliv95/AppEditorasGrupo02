import { StyleSheet } from 'react-native';

const sharedStyles = {
  // Estilos compartilhados entre os modos
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerOne: {
    fontSize: 50,
    fontFamily: 'notoserif', 
    fontWeight: 'bold',
    color: '#089A6E',
  },
  headerTwo: {
    fontSize: 35,
    fontFamily: 'notoserif', 
    fontWeight: 'bold',
    color: '#089A6E',
  },
  text: {
    fontSize: 16,
    color: '#089A6E',
  },
  textWhite: {
    fontSize: 16,
    color: '#fff',
    margin: 'auto',
    padding: 15,
  },
};

const darkStyles = StyleSheet.create({
  // Estilos específicos para o dark mode
  container: {
    backgroundColor: '#101010',
  },
  headerOne: {
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
    color: '#089A6E',
  },
});

export { sharedStyles, darkStyles, lightStyles };
