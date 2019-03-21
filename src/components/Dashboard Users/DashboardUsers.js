import React from 'react';

export default function DashboardUsers(props) {
  const {friend_image, friend_username, friend_id, setFriendSearch} = props
  return(
    <div>
      <img src={friend_image} alt="" style={{"width": 200}} onClick={() => setFriendSearch(friend_username)} />
    </div>
  )
}