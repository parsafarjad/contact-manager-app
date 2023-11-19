import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

//bootstarp
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

