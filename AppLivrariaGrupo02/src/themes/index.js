import { StyleSheet } from 'react-native';

const sharedStyles = {
  // Estilos compartilhados entre os modos
  container: {
    flex: 1,
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
  headerThree: {
    fontSize: 25,
    fontFamily: 'notoserif', 
    fontWeight: 'bold',
    color: '#089A6E',
  },
  text: {
    fontSize: 16,
    color: '#089A6E',
    paddingBottom: 5,
    fontWeight: 'bold',
  },

  textWhite: {
    fontSize: 16,
    color: '#fff',
    margin: 'auto',
    padding: 15,
  },
  imgEditora: {
    width: 110,
    height: 110,
    borderRadius: '50%',
  },
  imgLivro: {
    width: 135,
    height: 190,
    borderRadius: 10,
  },
  itemLivro: {
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F6FFFC',
    margin: 10,
    borderRadius: 8,
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
  divider: {
    color: '#fff',
    width: '2',
    orientation: "horizontal",
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
  divider: {
    color: '#000',
    width: '2',
    orientation: "horizontal",
  },
});

export { sharedStyles, darkStyles, lightStyles };
