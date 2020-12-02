import React from 'react';
import ReactDOM from 'react-dom';
import './styles/app.scss';
import App from './App';
import Settings from './pages/Settings';
import Project from './pages/Project';
import Task from './pages/Task';
import { BrowserRouter, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext'; // import based on where you put it

// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Route path="/" exact component={App} />
          <Route path="/project" exact component={Project} />
          <Route path="/task" exact component={Task} />
          <Route path="/settings" exact component={Settings} />
        </div>
        </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
