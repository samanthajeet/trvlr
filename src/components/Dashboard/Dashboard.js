import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateUser} from '../../ducks/reducer';
import Axios from 'axios';
import Navigation from '../Navigation/Navigation';
import { withRouter} from 'react-router-dom';
import './Dashboard.css'

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this)
  }

  componentDidMount(){
    this.getUser()
  }

  getUser = async () => {
    const {user_id} = this.props
    if(!user_id) {
      try {
        let response = await Axios.get('/auth/isLoggedIn')
        this.props.updateUser(response.data)
      } catch(err){
        this.props.history.push('/')
        console.log(err)
      }
    }
  }

  logout = () => {
    Axios.post('/auth/logout');
    this.props.history.push('/')
  }
 

  render() { 
    return ( 
      <div>
        <Navigation 
          location={this.props.location} 
          history={this.props.history} 
          logout={this.logout}
        />
        <h1>Dashboard Component</h1>
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
 
export default withRouter(connect(mapStateToProps, mapDispatchToProps )(Dashboard));