import React from 'react';
import {connect} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {clearUser} from './../../ducks/reducer';
import './Navigation.css'


function Nav(props){
  let pathname = props.location.pathname
  if(
        props.location.pathname !== '/'
        && props.location.pathname !== '/login' 
        && props.location.pathname !== '/register'
        // && pathname.match(/public/g) === 'public'
      ){
      return (
        <div className='Nav'>
          <div className='profile-nav'>
            <fig className="profile-image">
              <img src={props.user_image} alt={props.username} />
            </fig>
            <div className="greeting-links">
              <h1>Aloha, <span style={{"color": "#FFAA00"}} >{props.username}!</span></h1>
              <div id="links">
                <vl />
                <div className="nav-links">
                  <Link to='/userinfo'>account</Link>
                  <Link to='/dashboard'>dashboard</Link>
                  <Link to='/journal'>journal</Link>
                  <Link to='/community'>trvlr community</Link>
                </div>
              </div>
            </div>
          </div>
          <button className="logout" onClick={props.logout} >Log Out</button>
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