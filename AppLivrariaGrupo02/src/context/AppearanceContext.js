import React, { createContext, useState } from 'react';


export const AppearanceContext = createContext({});

export const AppearanceProvider = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  
  //essa função receberá uma validação (true ou false)
  //true para darkMode e false para lightMode
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  

  return (
    <AppearanceContext.Provider value={{ isEnabled, toggleSwitch }}>
      {children}
    </AppearanceContext.Provider>
  );
};
