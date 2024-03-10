import React from 'react';//react 
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/Layout.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from "react-redux"; //redux
import store from "./redux/store";//redux

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> 
        <BrowserRouter> 
          <App />
        </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
