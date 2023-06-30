import React, { createContext, useContext } from 'react';
import useGlobal from '../hooks/useGlobal';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const global = useGlobal()

    return (
        <GlobalContext.Provider value={global}>
            {children}
        </GlobalContext.Provider>
    );
};


export const useGlobalContext = () => useContext(GlobalContext);