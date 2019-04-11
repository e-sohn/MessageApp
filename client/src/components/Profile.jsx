import React from 'react';
import { dropToken } from '../services/apiHelper';

const Profile = (props) => {
  return (
    <div className="profile-page">
      <button className="delete-profile" onClick={() => {
        props.removeUser();
        dropToken();
      }}>Delete Profile</button>
      {props.userChatrooms[0] !== undefined &&
        <div className="list-chatrooms">{props.userChatrooms.map(userChatroom => (
          <div className="individual-chatroom" key={userChatroom.id}>
            <p>{userChatroom.title}</p>
            <button className="join-chat-button" onClick={() => {
              props.grabChatroomUsers(userChatroom.id, userChatroom.event_id);
            }}>Go to Chat</button>
          </div>
        ))}</div>
      }
    </div>
  )
};

export default Profile;
