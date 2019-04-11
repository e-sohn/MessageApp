import React from 'react';

const ChatroomForm = (props) => {
  return (
    <div className="chatroom-form-component">
      <h2 className="chatroom-form-title">Create New Chatroom</h2>
      <form className="chatroom-form" onSubmit={(ev) => {
        ev.preventDefault();
        props.createNewChatroom()}}>
        <input
          className="chatroom-form-input"
          type="text"
          name="title"
          placeholder="Title"
          onChange={props.handleChangeChatroomForm}
          value={props.chatroomTitle}
          required />
        <input
          className="submit-chatroom"
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
