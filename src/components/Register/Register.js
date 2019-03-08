import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import {updateUser} from './../../ducks/reducer';
import './Register.css'

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password_check: ''
    }
  }

  handleChange(prop, val) {
    this.setState({
      [prop] :val
    })
  }




  signUp = async () => {
    let {password, password_check, email, username} = this.state
    let user = {
      email: email,
      password: password,
      username: username
    }
    if(password_check === password && email.length > 0){
      try {
        let response = await axios.post('/auth/register', user);
        this.props.updateUser(response.data)
        this.props.history.push('/dashboard')
      } catch(err) {
        console.log(err)
      }
    } else {
      alert('passwords do not match or no email was added')
    }

  }


  render() { 
    return ( 
      <div className="register" >
        <div className="register-input">
          <h1>trvlr</h1>
          <h4>travel journal and community</h4>
          <p>username</p>
          <input 
            type="text"
            placeholder="username"
            onChange={(e) => {this.handleChange('username', e.target.value)}}
          />
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
          <p>password check</p>
          <input 
            type="password"
            placeholder="password"
            onChange={(e) => {this.handleChange('password_check', e.target.value)}}
          />
          <button onClick={this.signUp}>Sign Up</button>
          <button onClick={() => this.props.history.push('/')}>Cancel</button>
        </div>

        <fig className="register-image">
          <img src='https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3150&q=80' />
        </fig>
      </div>
     );
  }
}
 
const mapStateToProps = (reduxState) => {
  return reduxState
}

const mapDispatchToProps = {
  updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);