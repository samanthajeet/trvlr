import React, { Component } from 'react';
import axios from 'axios'
import {connect} from 'react-redux';
import {updateUser} from '../../ducks/reducer';
import './Login.css'


class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      id: 0
    }
  }

  handleChange(prop, val){
    this.setState({
      [prop] : val
    })
  }

  login = async () => {
    let user = {
      email: this.state.email,
      password: this.state.password
    }
    try {
      let response = await axios.post('/auth/login', user);
      this.props.updateUser(response.data);
      this.props.history.push('/dashboard')
    } catch(err) {
      alert('incorrect email or passwors')
      console.log(err)
    }
  }

  render() { 
    return ( 
      <div className="Login">
        <h1>trvlr</h1>

          <p>email</p>
          <input 
            type="text"
            placeholder="email"
            onChange={(e) => {this.handleChange('email', e.target.value)}}
          />



          <p>password</p>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => {this.handleChange('password', e.target.value)}}
          />

        <button onClick={this.login} >Login</button>
        <button onClick={() => this.props.history.push('/')}>Cancel</button>
      </div>
     );
  }
}
 

const mapStateToProps = (reduxState) => {
  return {
    id: reduxState.id
  }
}

const mapDispatchToProps = {
  updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);