import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './store';
import { Provider as ReduxProvider } from 'react-redux';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </React.StrictMode>,
);
