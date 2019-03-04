import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateUser} from '../../ducks/reducer';
import Axios from 'axios';

class Dashboard extends Component {


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
 

  render() { 
    const { username, user_image } = this.props
    return ( 
      <div>
        <h1>Dashboard Component</h1>
        <p>{username}</p>
        <img src={user_image} alt={username}/>
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
 
export default connect(mapStateToProps, mapDispatchToProps )(Dashboard);