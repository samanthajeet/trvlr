import React, {Component} from 'react';
import axios from 'axios';

class UserCommunity extends Component {
  constructor(props){
    super(props);
    this.state = {
      friends: []
    }
  }

  componentDidMount(){
    this.getFriends()
  }


  getFriends = async() => {
    try {
      let response = await axios.get(`/community/friendList/`)
      console.log(response.data)
      this.setState({
        friends: response.data
      })
    } catch(err){
      console.log(err)
    }
  }

  render() { 
    let mappedFriends = this.state.friends.map( friend => {
      return (
        <div key={friend.friend_id}>
          <p>{friend.username}</p>
          <img src={friend.user_image} alt={friend.username} style={{"width": 150}} />
        </div>
      )
    })
    return ( 
      <div>
        <h1>Your Friends</h1>
        {mappedFriends}
      </div>
     );
  }
}
 
export default UserCommunity;