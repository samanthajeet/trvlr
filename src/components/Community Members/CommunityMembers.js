import React, {Component} from 'react';
import axios from 'axios';
import './CommunityMembers.css'

class CommunityMembers extends Component {
  constructor(props){
    super(props);
    this.state = {
      followed: false,
      button: 'follow',
      friends:[]
    }
  }

  componentDidMount(){
    this.getFriends()
  }

  getFriends = async() => {
    let {user_id} = this.props
    let friend_id = user_id
    try{
      let response = await axios.get(`/community/checkfriend/checkfriend/${friend_id}`)
      if(response.data[0]){
        this.setState({
          followed: true,
          button: 'following'
        })
      }
    } catch(err) {
      console.log(err)
    }
  }

  unfollowFriend(){
    axios.delete(`/community/unfollowfriend/${this.props.user_id}`)
    this.setState({
      followed: false,
      button: 'follow'
    })
  }

  addFriend(friend_id){
      axios.post(`/community/addfriend/`, { friend_id });
      this.setState({
        followed: true,
        button: 'following'
      })
  };


  render() {
    const {user_image, username, user_id, addFriend, user_city, user_user_id} = this.props 
    return ( <div className="communityUsers">
    <div className="userImage">
      <img src={user_image} alt={username} />
    </div>
      <h5>{username}</h5>
      <i class="fas fa-globe-americas"></i><p>{user_city}</p>
      <p>number of posts</p>
      
      

      {user_user_id === user_id   ? (
        null
      ): this.state.followed ? (  
          <button onClick={() => this.unfollowFriend()} >unfollow</button>
        ) : (
          <button onClick={() => this.addFriend(user_id)} >follow</button>
      )}

    </div> );
  }
}
 
export default CommunityMembers;

