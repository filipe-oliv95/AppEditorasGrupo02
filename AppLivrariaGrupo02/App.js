import 'react-native-gesture-handler';
import { DataProvider } from './src/context/DataContext';
import { AppearanceProvider } from './src/context/AppearanceContext'
import { CartProvider } from './src/context/CartContext';
import Routes from './src/routes';

function App() {
  return (
    <DataProvider>
      <CartProvider>
        <AppearanceProvider>
          <Routes />
        </AppearanceProvider>
      </CartProvider>
    </DataProvider >
  )
};

export default App;