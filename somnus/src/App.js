import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import { connect } from 'react-redux'

import { fetchData } from './actions'

import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import TrackerList from './components/TrackerList';
import PrivateRoute from './components/PrivateRoute';
import SleepEntry from './components/SleepEntry';
import TrackedData from './components/TrackedData';
import UpdateEntry from './components/UpdateEntry';
import Search from "./components/Search";

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
          <Route path='/edit-tracker/:id' render={props => (
            <UpdateEntry {...props} updateData={props.data} />
          )} />
          <Route path="/search" render={() => <Search {...props} data={props.data} />} />
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
