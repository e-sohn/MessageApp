import React from 'react';

const Chatroom = (props) => {
  return (
    <div>
      <p onClick={props.navBackEvent}>Back</p>
      {props.posts[0] !== undefined &&
        <div>{props.posts.map(post => (
          <div key={post.id}>
            <p>{post.text}</p>
            { props.user.id === post.user_id &&
              <>
                <p onClick={() => props.removePost(post.id)}>Delete</p>
                <p>Edit</p>
              </>
            }
          </div>
        ))}</div>
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
