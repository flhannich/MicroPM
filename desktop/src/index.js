import React from 'react';
import ReactDOM from 'react-dom';
import './styles/app.scss';
import App from './App';
import { BrowserRouter, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { TimerProvider } from './context/TimerContext';

// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <TimerProvider>
            <Route path="/" exact component={App} />
          </TimerProvider>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
