import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"


import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path= '/' component={Login} />
          <Route exact path= '/signup' component={SignUp} />/>
        </Switch>
        
      </div>
    </Router>
    
  );
}

export default App;
