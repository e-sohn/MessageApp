import React from 'react';

const Home = (props) => {
  return (
    <div className="home">
      <h2 className="home-title">Events</h2>
      {props.events[0] !== undefined &&
        <div className="events">
          {props.events.map(event => (
            <button className="event-title" key={event.id} onClick={() => props.navEvent(event.id)}>
              {event.title}
            </button>
          ))}
        </div>
      }
    </div>
  )
};

export default Home;
