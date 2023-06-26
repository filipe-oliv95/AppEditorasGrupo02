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
  textTwo: {
    fontSize: 16,
    paddingVertical: 10,
    margin: 'auto',
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
  textTwo: {
    color: '#fff',
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
  textTwo: {
    color: '#000',
  },
});

export { sharedStyles, darkStyles, lightStyles };
