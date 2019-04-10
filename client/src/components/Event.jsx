import React from 'react';

const Event = (props) => {
  return (
    <div>
      <p onClick={props.navHome}>Back</p>
      {props.chatrooms[0] !== undefined &&
        <div>{props.chatrooms.map(chatroom => (
          <div key={chatroom.id} onClick={() => props.navChatroom(chatroom.id)}>
            {chatroom.title}
          </div>
        ))}</div>
      }
    </div>
  )
};

export default Event;
