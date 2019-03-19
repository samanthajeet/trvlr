import React from 'react';
import './CommunityMembers.css'

export default function(props){
  const {user_image, username, user_id, addFriend} = props
  return (
    <div className="communityUsers">
    <div className="userImage">
      <img src={user_image} alt={username} />
    </div>
      <h5>{username}</h5>
      <p>current location</p>
      <p>number of posts</p>
      <button onClick={() => addFriend(user_id)} >follow</button>
    </div>
  )
}