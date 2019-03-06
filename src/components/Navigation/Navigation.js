import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {clearUser} from '../../ducks/reducer'
import Avatar from '@material-ui/core/Avatar';
import './Navigation.css'

class Navigation extends Component {

  logout = () => {
    this.props.clearUser();
    this.props.history.push('/')
  }

  render() {
    console.log(this.props)
    return (
      <div className='Nav'>
        <div className='greeting'>
          <Avatar src={this.props.user_image} alt={this.props.username} style={{"width": 100, "height": 100}} />
          <h1>Aloha! {this.props.username}</h1>
        </div>
        <Link to='/dashboard'>dashboard</Link>
        <Link to='/journal'>journal</Link>
        <Link to='/community'>trvlr community</Link>
        <Link to='/userinfo'>account</Link>
        <button onClick={this.logout} >Log Out</button>
      </div>
    )
    }
  }

const mapStateToProps = (reduxState) => {
  return reduxState
}

const mapDispatchtoProps = {
  clearUser
}

export default connect(mapStateToProps, mapDispatchtoProps)(Navigation)