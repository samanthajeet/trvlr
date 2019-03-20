import React from 'react';
import './CommunityMembers.css'

export default function(props){

  const {user_image, username, user_id, addFriend, user_city, user_user_id} = props
  return (
    <div className="communityUsers">
    <div className="userImage">
      <img src={user_image} alt={username} />
    </div>
      <h5>{username}</h5>
      <i class="fas fa-globe-americas"></i><p>{user_city}</p>
      <p>number of posts</p>
      {user_user_id === user_id ? (
        null
      ): (
      <button onClick={() => addFriend(user_id)} >follow</button>
      )}
    </div>
  )
}