import React, { Component } from 'react';
import axios from 'axios'
import {connect} from 'react-redux';
// import {Redirect}  from 'react-router-dom'
import {updateUser} from '../../ducks/reducer';


import './Login.css'


class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      id: 0,
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

  handleKeyPress = (event) => {
    if(event.key == 'Enter'){
      this.login()
    }
  }

  render() { 

    return ( 
      <div className="login">
        <fig className="login-image">
          <img src='https://images.unsplash.com/photo-1519315868-60d544c31ece?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3034&q=80' alt="trvlr login"/>
        </fig>
        <div className="login-input">
          <h1>trvlr</h1>
          <h4>travel journal and community</h4>
          
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
            onKeyPress={this.handleKeyPress}
          />

          <button onClick={() => this.login()} >Login</button>
          <button onClick={() => this.props.history.push('/')}>Cancel</button>
        </div>


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