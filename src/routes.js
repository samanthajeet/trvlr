import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Landing from './components/Landing/Landing';

export default (
  <Switch>
    <Route path='/' exact component={Landing} />
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
  </Switch>
)