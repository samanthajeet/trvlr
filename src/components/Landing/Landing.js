import React from 'react';

export default function Landing(props){
  return (
    <div>
      <h1>trvlr</h1>
      <h4>travel journal and community</h4>
      <div>
        <button onClick={() => props.history.push('/login')} >Login</button>
        <button onClick={() => props.history.push('/register')} >Sign Up</button>
      </div>
    </div>
  )
}