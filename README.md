# chat-app

## Link to deployed project

## Project Description
Chat is a place for users to chat about live events. Whether it's the NBA championship or a MSG concert, users can talk with other users with similar interests in real time. Users can create a chatroom based on a preset Event (initially created by seed data, but the idea is that the chatroom will only last as long as the event. Afterwards it will be deleted from memory). Other users can enter this chatroom to have interesting conversations.

## MVP
- App registration
- App login
- App signout
- User authentication
- User can see list of events
- User can create a chatroom based on event
- User can create, read, update, or delete messages inside chatroom
- Other users can enter chatroom and read others messages
- Users can see who belongs to a chatroom
- User can see all of the chatrooms they belong to
- User can delete profile

## Post MVP
- Use API to display events live
- Live chat
- User can delete chatroom
- User can assign roles (different levels of authentication)

## List Dependencies
- Axios
- React
- Rails
- Cors
- React-router-dom
- Bcrypt
- Jsonwebtoken

## Wireframes
![Wireframe Main View](https://res.cloudinary.com/ssohny/image/upload/v1554729701/IMG_0945.jpg)


## Component Hierarchy

![Components](https://res.cloudinary.com/ssohny/image/upload/v1554729701/IMG_0944.jpg)

## ERD

![Tables](https://res.cloudinary.com/ssohny/image/upload/v1554729701/IMG_0943.jpg)

## Code Snippet
```
const eventString = this.props.history.location.pathname;
const eventId = eventString.match(/\d+/g).map(Number)[0];
```

In a couple of my axios calls, I needed to obtain the eventId and pass that in as an argument. I was able to obtain the url (using this.props.history.location.pathname) which contained the eventId. From there I had to use regex to locate all the numbers in the url, then target specifically the number I was looking for. In this case, I needed the first number from the array of numbers I obtained from regex and I set that as the eventId. 
