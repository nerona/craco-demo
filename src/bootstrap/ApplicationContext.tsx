import React, { createContext, useContext } from 'react';
import EventEmitter from 'events';

const Context = createContext({
  eventBus: new EventEmitter(),
});

export const ApplicationContext: React.FC<any> = React.memo(({ children }) => {
  const eventBus = new EventEmitter();

  return (
    <Context.Provider
      value={{
        eventBus,
      }}
    >
      {children}
    </Context.Provider>
  );
});

export const useApplicationContext = () => {
  return useContext(Context);
};
