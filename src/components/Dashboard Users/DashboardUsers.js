import React from "react";
import Avatar from '@material-ui/core/Avatar';
import './DashboardUsers.css'

export default function DashboardUsers(props) {
  const { friend_image, friend_username, friend_id, setFriendSearch } = props;
  return (
    <div className="dashboard-user-images">
      <Avatar
        src={friend_image}
        alt=""
        onClick={() => setFriendSearch(friend_username)}
        style={{
          "width" : "6rem",
          "height" : "6rem",
          "margin": "0.5rem",
          "filter": "drop-shadow(0 0 0.25rem gray)"
        }}
      />
    </div>
  );
}
