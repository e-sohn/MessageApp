import React from 'react';

const Chatroom = (props) => {
  return (
    <div>
      {props.posts[0] !== undefined &&
        <div>{props.posts.map(post => (
          <div key={post.id}>
            {post.text}
          </div>
        ))}</div>
      }
    </div>
  )
};

export default Chatroom;
