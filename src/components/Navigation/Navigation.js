import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import {clearUser} from './../../ducks/reducer'
import './Navigation.css'



function Nav(props){
  if(props.location.pathname !== '/' && props.location.pathname !== '/login'){
      return (
        <div className='Nav'>
          <div className='greeting'>
            <Avatar src={props.user_image} alt={props.username} style={{"width": 100, "height": 100}} />
            <h1>Aloha! {props.username}</h1>
          </div>
          <Link to='/dashboard'>dashboard</Link>
          <Link to='/journal'>journal</Link>
          <Link to='/community'>trvlr community</Link>
          <Link to='/userinfo'>account</Link>
          <button onClick={props.logout} >Log Out</button>
        </div>
      ) 
    } else {
      return (
        null
      )
    }
  }

const mapStateToProps = (reduxState) => {
  return reduxState
}

const mapDispatchtoProps = {
  clearUser
}


export default connect(mapStateToProps, mapDispatchtoProps)(Nav)