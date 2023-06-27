import React, { createContext, useEffect, useState } from 'react';
import Constants from 'expo-constants';


export const AppearanceContext = createContext({});


export const AppearanceProvider = ({ children }) => {
  const getInitialColorScheme = () => {
    if (Constants.manifest?.extra?.expoClient) {
      // Se estiver executando no Expo Go (aplicativo do Expo)
      return Constants.manifest?.extra?.expoClient === 'dark' ? 'dark' : 'light';
    } else {
      // Se estiver executando como um aplicativo autônomo
      return Constants.platform?.ios?.userInterfaceStyle || 'dark';
    }
  };

  const [colorScheme, setColorScheme] = useState(getInitialColorScheme());

  useEffect(() => {
    const appearanceListener = Constants.platform?.ios?.userInterfaceStyle
      ? Constants.addPlatformEventListener(({ platform }) => {
          setColorScheme(platform === 'ios' ? Constants.platform.ios.userInterfaceStyle : 'light');
          console.log(platform === 'ios' ? Constants.platform.ios.userInterfaceStyle : 'light');
        })
      : null;

    return () => {
      if (appearanceListener) {
        appearanceListener.remove();
      }
    };
  }, []);

  return (
    <AppearanceContext.Provider value={{ colorScheme }}>
      {children}
    </AppearanceContext.Provider>
  );
};
