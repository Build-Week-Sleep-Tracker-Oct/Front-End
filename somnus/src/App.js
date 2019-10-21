import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import { connect } from 'react-redux'

import { fetchData } from './actions'

import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import TrackerList from './components/TrackerList';
import PrivateRoute from './components/PrivateRoute';
import SleepEntry from './components/SleepEntry'
import TrackedData from './components/TrackedData';

const App = (props) => {

  useEffect(() => {
    props.fetchData()
}, [props.isPosting])

  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute exact path='/trackerlist' component={TrackerList} />
          <PrivateRoute exact path='/sleepentry' component={SleepEntry} />
          <Route path='/trackerlist/:id' render={props => (
            <TrackedData {...props} /> )} />
          <Route exact path='/' component={Login} />
          <Route exact path='/signup' component={SignUp} />
        </Switch>
        
      </div>
    </Router>
    
  );
}

const mapStatetoProps = state => {
  return {
      data: state.data,
      isFetching: state.isFetching,
      isPosting: state.isPosting,
      error: state.error
  }
}


export default connect(
  mapStatetoProps,
  { fetchData }
)(App)
