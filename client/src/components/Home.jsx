import React from 'react';

const Home = (props) => {
  return (
    <div>
      {props.events[0] !== undefined &&
        <div>
          {props.events.map(event => (
            <div key={event.id} onClick={() => props.navEvent(event.id)}>
              {event.title}
            </div>
          ))}
        </div>
      }
    </div>
  )
};

export default Home;
