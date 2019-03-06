import React, {Component} from 'react';
import axios from 'axios'
import {connect} from 'react-redux';
import { updateUser } from '../../ducks/reducer'
import Avatar from '@material-ui/core/Avatar';
import Navigation from '../Navigation/Navigation';

class UserInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      user_image: this.props.user_image
    }
  }

  componentDidMount(){
    this.getUser()
  }

  getUser = async () => {
    const {user_id} = this.props
    console.log(user_id)
    if(!user_id) {
      try {
        let response = await axios.get('/auth/isLoggedIn')
        this.setState({
          user_id: response.data.user_id
        })
        this.props.updateUser(response.data)
      } catch(err){
        // this.props.history.push('/')
        console.log(err)
      }
    }
  }

  handleChange(prop, val){
    this.setState({
      [prop]: val
    })
  }

  updateUserInfo = () => {
    const { user_image } = this.state
    axios.put('/auth/userInfo', {user_image}).then( response => {
      console.log(response)
      this.props.history.push('/dashboard')
      this.props.updateUser(user_image)
    })
  }

  render() { 

    console.log(this.props)
    return ( 
      <div>
        <Navigation />
        <h1>user info component</h1>
        <p>user image</p>
        <Avatar src={this.state.user_image} alt={this.props.username} style={{"width": 200, "height": 200}}/>
        <input
          type="text"
          value={this.state.user_image}
          onChange={(e) => this.handleChange('user_image', e.target.value)}
        />
        <button onClick={this.updateUserInfo} >Update Info</button>


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
 
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);