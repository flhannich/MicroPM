import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import Settings from './pages/Settings';
import { BrowserRouter, Route } from "react-router-dom";

// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
        <div className="App">
          <Route path="/" exact component={App} />
          <Route path="/settings" exact component={Settings} />
        </div>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
