import React, { createContext, useContext } from 'react';
import { useGlobalContext } from './GlobalContext';
import { useApi } from '../hooks/useApi';


export const ApiContext = createContext();


export const ApiProvider = ({ children }) => {
    const apiHook = useApi()
    const global = useGlobalContext()

    return (
        <ApiContext.Provider value={apiHook}>
            {children}
        </ApiContext.Provider>
    );
};


export const useApiContext = () => useContext(ApiContext);