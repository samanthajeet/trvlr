import React from 'react';
import './CommunityMembers.css'

export default function(props){

  const {user_image, username, user_id, addFriend, user_city} = props
  return (
    <div className="communityUsers">
    <div className="userImage">
      <img src={user_image} alt={username} />
    </div>
      <h5>{username}</h5>
      <i class="fas fa-globe-americas"></i><p>{user_city}</p>
      <p>number of posts</p>
      <button onClick={() => addFriend(user_id)} >follow</button>
    </div>
  )
}