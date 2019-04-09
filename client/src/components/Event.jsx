import React from 'react';

const Event = (props) => {
  return (
    <div>
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
