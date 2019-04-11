import React from 'react';

const Event = (props) => {
  return (
    <div className="events-page">
      <button className="back" onClick={props.navHome}>Back</button>
      {props.chatrooms[0] !== undefined &&
        <div>{props.chatrooms.map(chatroom => (
          <div key={chatroom.id}>
            <p>{chatroom.title}</p>
            <p onClick={() => {
              props.grabChatroomUsers(chatroom.id, chatroom.event_id);
            }}>Join Chat</p>
          </div>
        ))}</div>
      }
      <p onClick={props.navChatroomForm}>Create Chat</p>
    </div>
  )
};

export default Event;
