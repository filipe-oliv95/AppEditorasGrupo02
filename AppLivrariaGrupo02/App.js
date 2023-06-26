import 'react-native-gesture-handler';
import { DataProvider } from './src/context/DataContext';
import { AppearanceProvider } from './src/context/AppearanceContext'

import Routes from './src/routes';

function App() {
  return (
    <DataProvider>
      <AppearanceProvider>
        <Routes />
      </AppearanceProvider>
    </DataProvider>
  )
};

export default App;