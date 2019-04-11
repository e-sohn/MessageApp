import React from 'react';

const Home = (props) => {
  return (
    <div className="home">
      <h2>Events</h2>
      {props.events[0] !== undefined &&
        <div className="events">
          {props.events.map(event => (
            <p className="event-title" key={event.id} onClick={() => props.navEvent(event.id)}>
              {event.title}
            </p>
          ))}
        </div>
      }
    </div>
  )
};

export default Home;
