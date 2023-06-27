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
  textGrey: {
    fontSize: 16,
    color: '#9D9A9A',
    paddingBottom: 5,
    fontWeight: 'bold',
  },

  textTwo: {
    fontSize: 16,
    paddingVertical: 10,
    margin: 'auto',
    padding: 15,
    fontWeight: 'bold',
  },
  imgEditora: {
    width: 110,
    height: 110,
    borderRadius: '50%',
  },
  imgLivro: {
    width: 135,
    height: 190,
    borderRadius: 5,
  },
  imgLivroModal: {
    width: 155,
    height: 230,
    borderRadius: 5,
  },
  imgLivroSearch: {
    width: 115,
    height: 160,
    borderRadius: 5,
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
