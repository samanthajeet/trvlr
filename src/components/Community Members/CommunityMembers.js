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
    try{
      let response = await axios.get(`/community/friendList/`)
      let foundFriend = response.data.filter( user => user.username === this.props.username)
      // console.log(foundFriend[0])
      if(foundFriend[0]){
        this.setState({
          followed: true,
          button: 'following'
        })
      }
    } catch(err) {
      console.log(err)
    }
  }


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
          <p>following</p>
        ) : (
          <button onClick={() => addFriend(user_id)} >follow</button>
      )}

    </div> );
  }
}
 
export default CommunityMembers;

