import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
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
import SideBar from "./components/sidebar";

const App = (props) => {
  useEffect(() => {
    props.fetchData()
    
}, [props.isPosting])


  return (
    <Router>
      <div className="App">
        <nav>
        <div className="menuImg"></div>
      <SideBar pageWrapId={"page-wrap"} outerContainerId={"sleep-entry"} />
        </nav>
        <Switch>
          <PrivateRoute exact path='/trackerlist' component={TrackerList} />
          <PrivateRoute exact path='/sleepentry' component={SleepEntry} />
          <Route path='/trackerlist/:id' render={props => (
            <TrackedData {...props} /> )} />
          <Route path='/edit-tracker/:id' render={props => (
            <UpdateEntry {...props} updateData={props.data} />
          )} />
          <Route path="/search" component={Search} />
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
