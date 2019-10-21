import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"


import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Tracker from './components/Tracker';
import PrivateRoute from './components/PrivateRoute';
import SleepEntry from './components/SleepEntry'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute exact path='/tracker' component={Tracker} />
          <PrivateRoute exact path='/sleepentry' component={SleepEntry} />
          <Route exact path='/' component={Login} />
          <Route exact path='/signup' component={SignUp} />
        </Switch>
        
      </div>
    </Router>
    
  );
}

export default App;
