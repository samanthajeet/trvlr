import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateUser} from '../../ducks/reducer';
import axios from 'axios';
import CommunityPost from '../Community Posts/Community_Post';
import ReactLoading from 'react-loading';
import './Dashboard.css';


class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      friendsPosts: [],
      loading: true
    }
  }

  componentDidMount(){
    this.getUser();
    this.getFriendsPosts();
    this.getUserLocation();

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
  }

  getUserLocation(){
    axios.get(`/location/userlocation`).then( response => {
      console.log(response.data)
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
  updateUser
}
 
export default connect(mapStateToProps, mapDispatchToProps )(Dashboard);