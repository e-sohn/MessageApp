import React from 'react';

const Home = (props) => {
  return (
    <div>
      <h2>Events</h2>
      {props.events[0] !== undefined &&
        <div>
          {props.events.map(event => (
            <p key={event.id} onClick={() => props.navEvent(event.id)}>
              {event.title}
            </p>
          ))}
        </div>
      }
    </div>
  )
};

export default Home;
