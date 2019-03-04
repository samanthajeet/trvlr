import React, { Component } from 'react';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      username: ''
    }
  }

  handleChange(prop, val){
    this.setState({
      [prop] : val
    })
  }

  render() { 
    return ( 
      <div>
        <h1>Login</h1>
        <input 
          type="text"
          placeholder="email"
          onChange={(e) => {this.handleChange('email', e.target.value)}}
        />

        <input
          type="password"
          placeholder="password"
          onChange={(e) => {this.handleChange('password', e.target.value)}}
        />

        <button>Login</button>
        <button onClick={() => this.props.history.push('/')}>Cancel</button>
      </div>
     );
  }
}
 
export default Login;