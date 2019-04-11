import React from 'react';
import { dropToken } from '../services/apiHelper';

const Profile = (props) => {
  return (
    <div>
      <button className="delete-profile" onClick={() => {
        props.removeUser();
        dropToken();
      }}>Delete Profile</button>
      {props.userChatrooms[0] !== undefined &&
        <div>{props.userChatrooms.map(userChatroom => (
          <div key={userChatroom.id}>
            <p>{userChatroom.title}</p>
            <p onClick={() => {
              props.grabChatroomUsers(userChatroom.id, userChatroom.event_id);
            }}>Go to Chat</p>
          </div>
        ))}</div>
      }
    </div>
  )
};

export default Profile;
