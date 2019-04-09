import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
});

const updateToken = (token) => {
  localStorage.setItem('token', token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const dropToken = () => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common["Authorization"];
};

//////////////User LOGIN and REGISTRATION ///////////////////

// Register
const createUser = async (data) => {
  const resp = await api.post(`/users`, data);
  return resp.data;
};

// Login
const loginUser = async (data) => {
  const resp = await api.post(`/users/login`, data);
  return resp.data;
};

// Edit user
const editUser = async (id, data) => {
  const resp = await api.put(`/users/${id}`, data);
  return resp.data;
};

// Delete user
const deleteUser = async (id) => {
  const resp = await api.delete(`/users/${id}`);
  return resp.data;
};

/////////////////////// CRUD Events ////////////////////////

// All Events, Do NOT have to call this function when grabbing events from API later, but will seed data for now
const getEvents = async () => {
  const resp = await api.get(`/events`);
  return resp.data;
};

// Create Event
const createEvent = async (data) => {
  const resp = await api.post(`/events`, data);
  return resp.data;
};

// Delete Event
const deleteEvent = async (id) => {
  const resp = await api.delete(`/events/${id}`);
  return resp.data;
};

/////////////////////// CRUD Chatrooms ////////////////////////

// Get all chatrooms
const getChatrooms = async (event_id) => {
  const resp = await api.get(`/events/${event_id}/chatrooms`);
  return resp.data;
};

// Create Chatroom, data contains title and event id
const createChatroom = async (data) => {
  const resp = await api.post(`/chatrooms`, data);
  return resp.data;
};

// Update Chatroom, data contains title and event id
const updateChatroom = async (id, data) => {
  const resp = await api.put(`/chatrooms/${id}`, data);
  return resp.data;
};

// Delete Chatroom
const deleteChatroom = async (id) => {
  const resp = await api.delete(`/chatrooms/${id}`);
  return resp.data;
};

/////////////////////// CRUD Posts ////////////////////////

// Get all posts
const getPosts = async (chatroom_id) => {
  const resp = await api.get(`/chatrooms/${chatroom_id}/posts`);
  return resp.data;
};

// Create Post (data contains text and chatroom id)
const createPost = async (data) => {
  const resp = await api.post(`/posts`, data);
  return resp.data;
};

// Update Post (data contains text and chatroom id)
const updatePost = async (id, data) => {
  const resp = await api.put(`/posts/${id}`, data);
  return resp.data;
};

// Delete Post
const deletePost = async (id) => {
  const resp = await api.delete(`/posts/${id}`);
  return resp.data;
};

/////////////////////// User/Chatroom JOIN ////////////////////////

// Get all users for chatroom
const getUserChatrooms = async (chatroom_id) => {
  const resp = await api.get(`/chatrooms/${chatroom_id}/users`);
  return resp.data;
};

// Get all chatrooms for user
const getChatroomUsers = async (user_id) => {
  const resp = await api.get(`/users/${user_id}/chatrooms`);
  return resp.data;
};

// Create chatroom and user relationship
const createUserChatroom = async (user_id, chatroom_id) => {
  const resp = await api.post(`/users/${user_id}/chatrooms/${chatroom_id}`);
  return resp.data;
};

// Delete chatroom and user relationship
const deleteUserChatroom = async (user_id, chatroom_id) => {
  const resp = await api.delete(`/users/${user_id}/chatrooms/${chatroom_id}`);
  return resp.data;
};

export {
  updateToken,
  dropToken,
  createUser,
  loginUser,
  editUser,
  deleteUser,
  getEvents,
  createEvent,
  deleteEvent,
  getChatrooms,
  createChatroom,
  updateChatroom,
  deleteChatroom,
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getUserChatrooms,
  getChatroomUsers,
  createUserChatroom,
  deleteUserChatroom
}
