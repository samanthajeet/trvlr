import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import Journal from './components/Journal/Journal'

export default (
  <Switch>
    <Route path='/' exact component={Landing} />
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
    <Route path='/dashboard' component={Dashboard} />
    <Route path='/journal' component={Journal} />
  </Switch>
)