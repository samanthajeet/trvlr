import React, {Component} from 'react';
import axios from 'axios';
import CommunityPost from '../Community Posts/Community_Post';
import './UserCommunity.css'

class UserCommunity extends Component {
  constructor(props){
    super(props);
    this.state = {
      friends: [],
      friendsPosts: []
    }
  }

  componentDidMount(){
    this.getFriends()
    this.getFriendsPosts()
  }


  getFriends = async() => {
    try {
      let response = await axios.get(`/community/friendList/`)
      this.setState({
        friends: response.data
      })
    } catch(err){
      console.log(err)
    }
  }

  getFriendsPosts = async() => {
    try {
      let response = await axios.get(`/community/friendPosts`)
      this.setState({
        friendsPosts: response.data
      })
    } catch(err) {
      console.oog(err)
    }
  }

  render() { 
    let mappedFriends = this.state.friends.map( friend => {
      return (
        <div key={friend.friend_id}>
          <p>{friend.username}</p>
          <img
            src={friend.user_image}
            alt={friend.username}
            className="userImage" />
        </div>
      )
    })

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
      <div>
        <h1>Your Friends</h1>
        {mappedFriends}
        {mappedPosts}
      </div>
     );
  }
}
 
export default UserCommunity;