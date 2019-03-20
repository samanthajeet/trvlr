import React, {Component} from 'react';
import axios from 'axios'
import {connect} from 'react-redux';
import { updateUser, updateUserInfo,updateUserLocation } from '../../ducks/reducer'
import './UserInfo.css'

class UserInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      user_image: this.props.user_image,
      username: this.props.username,
      email: this.props.email,
      city: this.props.city,
      country: this.props.country
    }
  }

  componentDidMount(){
    this.getUser()
  }

  getUser = async () => {
    const {user_id} = this.props
    if(!user_id) {
      try {
        let response = await axios.get('/auth/isLoggedIn')
        this.setState({
          user_id: response.data.user_id,
          user_image: response.data.user_image,
          username: response.data.username,
          email: response.data.email,
          city: response.data.city,
          country: response.data.country
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
    const { user_image, username, city, country } = this.state
    axios.put('/auth/userInfo', {user_image, username, city, country }).then( response => {
      console.log(response)
      this.props.history.push('/dashboard')
      this.props.updateUserInfo(user_image)
      this.props.updateUserLocation(city, country)
    })
  }

  render() { 
    console.log(this.props)
    return ( 
      <div className="updateuserinfo">
        <div className="updatephoto">
          <fig className="profilephoto" >
            <img src={this.state.user_image} alt={this.props.username}/>
          </fig>
        <p>your profile photo</p>
        </div>
        <div className="updatetext">
          <p>update city</p>
          <div className="updateCity">
            <input
              type="text"
              value={this.state.city}
              onChange={(e) => this.handleChange('city', e.target.value)}
            />
          </div>
          <p>update country</p>
          <div className="updateCity">
            <input
              type="text"
              value={this.state.country}
              onChange={(e) => this.handleChange('country', e.target.value)}
            />
          </div>
          <p>update profile photo</p>
          <input
            type="text"
            value={this.state.user_image}
            onChange={(e) => this.handleChange('user_image', e.target.value)}
          />
          <p>update username</p>
          <input
            placeholder="username"
            value={this.state.username}
            onChange={(e) => this.handleChange('username', e.target.value)}
          />

          <p>update email address</p>
          <input
            placeholder="email"
            value={this.state.email}
          />
          
          <button onClick={this.updateUserInfo} >Update Info</button>
        </div>


      </div>
     );
  }
}

const mapStateToProps = (reduxState) => {
  return reduxState
}

const mapDispatchToProps = {
  updateUser,
  updateUserInfo,
  updateUserLocation
}
 
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);