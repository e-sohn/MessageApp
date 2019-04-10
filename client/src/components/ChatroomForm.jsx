import React from 'react';

const ChatroomForm = (props) => {
  return (
    <div>
      <h2>Create New Chatroom</h2>
      <form onSubmit={(ev) => {
        ev.preventDefault();
        props.createNewChatroom()}}>
        <input
          className="chatroom-form-input"
          type="text"
          name="title"
          onChange={props.handleChangeChatroomForm}
          value={props.chatroomTitle}
          required />
        <input
          type="submit"
          value="Post Chatroom"
          onSubmit={(ev) => {
            ev.preventDefault();
            props.createNewChatroom()}} />
      </form>
    </div>
  )
};

export default ChatroomForm;
