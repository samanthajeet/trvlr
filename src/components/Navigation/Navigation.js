import React from 'react';
import {connect} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import {clearUser} from './../../ducks/reducer';
import './Navigation.css'


function Nav(props){
  let pathname = props.location.pathname
  console.log({pathname})
  if(
        props.location.pathname !== '/'
        && props.location.pathname !== '/login' 
        && props.location.pathname !== '/register'
        // && pathname.match(/public/g) === 'public'
      ){
      return (
        <div className='Nav'>
          <button className="logout" onClick={props.logout} >Log Out</button>
          <div className='greeting'>
            <Avatar src={props.user_image} alt={props.username} style={{"width": 150, "height": 150}} />
            <div className='photo-border'></div>
            <h1>Aloha, {props.username}!</h1>
          </div>
          <div className="nav-links">
            <Link to='/userinfo'>account</Link>
            <Link to='/dashboard'>dashboard</Link>
            <Link to='/journal'>journal</Link>
            <Link to='/community'>trvlr community</Link>
          </div>
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


export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(Nav))