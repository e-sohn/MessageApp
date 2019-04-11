import React from 'react';
import moment from 'moment';

const Chatroom = (props) => {
  return (
    <div className="chatroom">
      <div className="chatroom-links">
        <button className="back" onClick={props.navBackEvent}>Back</button>
        <button className="leave-chat" onClick={() => {
          props.leaveChatroom();
          props.navBackEvent();
        }}>Leave Chat</button>
      </div>
      <div className="posts-users">
      {props.posts[0] !== undefined &&
        <div className="posts">{props.posts.map((post, id) => (
          <div className="post" key={post.id}>
            <div className="user-time">
              <p className="post-user">{post.user.username}</p>
              <p className="post-time">{moment(post.created_at).format('hh:mm')}</p>

            </div>
            <div className='post-text-button'>
              <p className="post-text">{post.text}</p>
              { props.user.id === post.user_id &&
                <div className="post-buttons">
                  <p className="delete" onClick={() => props.removePost(post.id)}>Delete</p>
                  <p className="edit" onClick={() => props.makeEditForm(post.id, post.text)}>Edit</p>
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
                        className="submit-edit-post"
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
          </div>
        ))}</div>
      }
      {props.chatroomUsers[0] !== undefined &&
        <div>
          <h3>Chatroom Users</h3>
          <div className="users">{props.chatroomUsers.map(chatroomUser => (
            <div key={chatroomUser.id}>
              <p>{chatroomUser.username}</p>
            </div>
          ))}
          </div>
        </div>
      }
      </div>
      <div className="comment-form">
        <form className="comment" onSubmit={props.handleSubmitText}>
          <input
            className="post-input"
            type="text"
            name="text"
            placeholder="Text"
            onChange={props.handleChangeText}
            value={props.text}
            required />
          <input
            className="post-submit"
            type="submit"
            value="Post"
            onSubmit={props.handleSubmitText} />
        </form>
      </div>
    </div>
  )
};

export default Chatroom;
