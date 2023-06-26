import React, { createContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native-appearance';


export const AppearanceContext = createContext({});


export const AppearanceProvider = ({ children }) => {
    const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  
    useEffect(() => {
      const appearanceListener = Appearance.addChangeListener(({ colorScheme }) => {
        setColorScheme(colorScheme);
        console.log(colorScheme);
      });
  
      return () => {
        appearanceListener.remove();
      };
    }, []);
  
    return (
      <AppearanceContext.Provider value={{ colorScheme }}>
        {children}
      </AppearanceContext.Provider>
    );
  };