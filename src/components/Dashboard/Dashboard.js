import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateUser, updateUserLocation } from '../../ducks/reducer';
import axios from 'axios';
import CommunityPost from '../Community Posts/Community_Post';
import ReactLoading from 'react-loading';
import './Dashboard.css';
import { TemporaryCredentials } from 'aws-sdk';


class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      friendsPosts: [],
      loading: true,
      weather: ''
    }
  }

  componentDidMount(){
    this.getUser();
    this.getFriendsPosts();
  }

  getUser = async () => {
    const {user_id} = this.props
    if(!user_id) {
      try {
        let response = await axios.get('/auth/isLoggedIn')
        this.props.updateUser(response.data)
      } catch(err){
        this.props.history.push('/')
        console.log(err)
      }
    }
    this.getLocationWeather();
  }

 getLocationWeather = async() => {
   await this.getUserLocation();
   this.getWeather();
 }

  getUserLocation(){
    axios.get(`/location/userlocation`).then( response => {
      this.props.updateUserLocation(response.data)
    })
  }

  getWeather(){
    const {city} = this.props
    console.log({city})
    axios.get(`/api/weather/${city}`).then(response => {
      this.setState({
        weather: response.data.main.temp 
      })
    })
  }

  getFriendsPosts = async() => {
    try {
      let response = await axios.get(`/community/friendPosts`)
      this.setState({
        friendsPosts: response.data,
        loading: false
      })
    } catch(err) {
      console.log(err)
    }
  }

  render() { 
    // console.log(this.props)
    let mappedPosts = this.state.friendsPosts.map( post => {
      return (
        <div key={post.post_id}>
          <CommunityPost
            title={post.post_title}
            image1={post.post_image1}
            text={post.post_text}
            author={post.username}
            authorImg={post.user_image}
            post_id={post.post_id}
            history={this.props.history} 
            />
        </div>
      )
    })


    return ( 

      
      <div className="dashboard">
      <p>The current temperature in {this.props.city} is {this.state.weather}°f</p>
        
        <div className="dashboardPosts">
          {this.state.loading ? (
            <div>
              <h1>Loading</h1>
              <ReactLoading type='spinningBubbles' color="#FFAA00" />
            </div>
          ): (
            <div>
              <h2>while you were gone</h2>
              {mappedPosts}
            </div>
          ) }
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
  updateUserLocation
}
 
export default connect(mapStateToProps, mapDispatchToProps )(Dashboard);