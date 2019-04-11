import React from 'react';

const Event = (props) => {
  return (
    <div className="events-page">
      <button className="back" onClick={props.navHome}>Back</button>
      <button className="create-chat-button" onClick={props.navChatroomForm}>Create Chat</button>
      {props.chatrooms[0] !== undefined &&
        <div className="list-chatrooms">{props.chatrooms.map(chatroom => (
          <div className="individual-chatroom" key={chatroom.id}>
            <p className="individual-chatroom-title">{chatroom.title}</p>
            <button className="join-chat-button" onClick={() => {
              props.grabChatroomUsers(chatroom.id, chatroom.event_id);
            }}>Join Chat</button>
          </div>
        ))}</div>
      }
    </div>
  )
};

export default Event;
