import React from 'react';
import './Landing.css'

export default function Landing(props){
  return (
    <div className="landing">
      <div className="landing-image">
        <img src="https://images.unsplash.com/photo-1519315868-60d544c31ece?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3034&q=80" alt="trvl"/>
      </div>
      <div className="login-signup" >
        <div className="trvlr">
          <h1>trvlr</h1>
          <h4>travel journal and community</h4>
        </div>
        <button onClick={() => props.history.push('/login')} >Login</button>
        <button onClick={() => props.history.push('/register')} >Sign Up</button>
      </div>
    </div>
  )
}