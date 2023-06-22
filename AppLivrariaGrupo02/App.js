import 'react-native-gesture-handler';

import { DataProvider } from './src/context/DataContext'

import Routes from './src/routes';

function App () {
  return (
    <DataProvider>
       <Routes />
    </DataProvider>
  )
};

export default App;