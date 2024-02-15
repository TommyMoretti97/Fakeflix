import React from 'react'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import store from './store/store.js';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);