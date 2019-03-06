import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import './Navigation.css'


 function Navigation(props){
  if(props.location.pathname !== '/'){
    return (
      <div className='Nav'>
        <div className='greeting'>
          <Avatar src={props.user_image} alt={props.username} style={{"width": 100, "height": 100}} />
          <h1>Aloha! {props.username}</h1>
        </div>
        <Link to='/journal'>journal</Link>
        <Link to='/community'>trvlr community</Link>
        <button onClick={() => {props.logout()}} >Log Out</button>
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return reduxState
}

export default connect(mapStateToProps)(Navigation)