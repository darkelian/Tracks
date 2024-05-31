import React, { createContext } from 'react';
import axios from 'axios';

const ApiContext = createContext();

const api = axios.create({
  baseURL: 'http://localhost:8080', 
  withCredentials: true, 
});

const ApiProvider = ({ children }) => {
  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
};

export { ApiContext, ApiProvider };