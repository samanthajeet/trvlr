import React, { Component } from 'react';
import Nav from './components/Navigation/Navigation'
import routes from './routes';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {clearUser} from './ducks/reducer'

import './App.css';

class App extends Component {

  logout = () => {
    axios.post('/auth/logout').then(
      this.props.history.push('/')
      )
      this.props.clearUser()
  }

  render() {
    return (
      <div className="App">
        <Nav
        // location={this.props.location}
            // history={this.props.history}
            // match={this.props.match}
            logout={this.logout}
        />
        {routes}
      </div>
    );
  }
}

const mapDispatchtoProps = {
  clearUser
}


export default withRouter(connect(null, mapDispatchtoProps)(App));
