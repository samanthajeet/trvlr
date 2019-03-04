import React, { Component } from 'react';

class Register extends Component {
  render() { 
    return ( 
      <div>
        <h1>Register</h1>
        <button onClick={() => this.props.history.push('/')}>Cancel</button>
      </div>
     );
  }
}
 
export default Register;