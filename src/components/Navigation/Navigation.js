import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

 function Navigation(props){
  if(props.location.pathname !== '/'){
    return (
      <div>
        <img src={props.user_image} alt={props.username} className="circle responsive-img" />
        <h1>Aloha! {props.username}</h1>
        <Link to='/journal'>journal</Link>
        <Link to=''>trvlr community</Link>
        <button onClick={() => {props.logout()}} >Log Out</button>
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return reduxState
}

export default connect(mapStateToProps)(Navigation)