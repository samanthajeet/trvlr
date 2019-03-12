import React from 'react';
import './CommunityMembers.css'

export default function(props){
  const {user_image, username} = props
  return (
    <div className="communityUsers">
      <img src={user_image} alt={username} />
      <p>{username}</p>
    </div>
  )
}