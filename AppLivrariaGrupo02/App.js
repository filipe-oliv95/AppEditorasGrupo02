import 'react-native-gesture-handler';
import { DataProvider } from './src/context/DataContext';
import { AppearanceProvider } from './src/context/AppearanceContext'
import { CartProvider } from './src/context/CartContext';
import { FavoritesProvider } from './src/context/FavoritesContext';
import Routes from './src/routes';

function App() {
  return (
    <DataProvider>
      <CartProvider>
        <FavoritesProvider>
          <AppearanceProvider>
            <Routes />
          </AppearanceProvider>
        </FavoritesProvider>
      </CartProvider>
    </DataProvider >
  )
};

export default App;