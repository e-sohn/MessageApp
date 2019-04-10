import React from 'react';

const Chatroom = (props) => {
  return (
    <div>
      <p onClick={props.navBackEvent}>Back</p>
      <p onClick={() => {
        props.leaveChatroom();
        props.navBackEvent();
      }}>Leave Chat</p>
      {props.posts[0] !== undefined &&
        <div>
          <div>{props.posts.map((post, id) => (
            <div key={post.id}>
              <p>{post.text}</p>
              { props.user.id === post.user_id &&
                <div>
                  <p onClick={() => props.removePost(post.id)}>Delete</p>
                  <p onClick={() => props.makeEditForm(post.id, post.text)}>Edit</p>
                  { props.editFormId === post.id &&
                    <form onSubmit={(ev) => {
                      ev.preventDefault();
                      props.editPost(post.id, id)}}>
                      <input
                        className="edit-input"
                        type="text"
                        name="editText"
                        onChange={props.handleChangeText}
                        value={props.editText}
                        required />
                      <input
                        type="submit"
                        value="Edit"
                        onSubmit={(ev) => {
                          ev.preventDefault();
                          props.editPost(post.id, id)}} />
                    </form>
                  }
                </div>
              }
            </div>
          ))}</div>
          <div>{props.chatroomUsers.map(chatroomUser => (
            <div key={chatroomUser.id}>
              <p>{chatroomUser.username}</p>
            </div>
          ))}
          </div>
        </div>
      }
      <form onSubmit={props.handleSubmitText}>
        <input
          className="post-input"
          type="text"
          name="text"
          onChange={props.handleChangeText}
          value={props.text}
          required />
        <input
          type="submit"
          value="Post"
          onSubmit={props.handleSubmitText} />
      </form>
    </div>
  )
};

export default Chatroom;
