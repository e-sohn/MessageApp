import React from 'react';

const Profile = (props) => {
  return (
    <div>
      <p>Delete Profile</p>
      <p>Edit Profile</p>
      {props.userChatrooms[0] !== undefined &&
        <div>{props.userChatrooms.map(userChatroom => (
          <div key={userChatroom.id}>
            <p>{userChatroom.title}</p>
            <p onClick={() => {
              props.grabChatroomUsers(userChatroom.id);
              props.navChatroom(userChatroom.id, userChatroom.event_id);
            }}>Go to Chat</p>
          </div>
        ))}</div>
      }
    </div>
  )
};

export default Profile;
