import React from 'react';
import './Landing.css'

export default function Landing(props){
  console.log(props)
  return (
    <div className="landing">
      <h1>trvlr</h1>
      <h4>travel journal and community</h4>
      <button onClick={() => props.history.push('/login')} >Login</button>
      <button onClick={() => props.history.push('/register')} >Sign Up</button>
    </div>
  )
}