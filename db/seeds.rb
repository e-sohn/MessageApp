# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user1 = User.create(email: "hello@gmail.com", username: 'bob', password: 'yikes')
user2 = User.create(email: "goodbye@gmail.com", username: 'sally', password: 'ilikelamp')
user3 = User.create(email: "dingdong@gmail.com", username: 'mike', password: 'nono')
 
event1 = Event.create(title: "Wedding")
event2 = Event.create(title: "Anniversary")
event3 = Event.create(title: "Birthday")

chatroom1 = Chatroom.create(title: "All cool people", event_id: 2)
chatroom2 = Chatroom.create(title: "No one allowed", event_id: 3)
chatroom3 = Chatroom.create(title: "Everyone come here", event_id: 2)
chatroom4 = Chatroom.create(title: "Wassup my Peeps", event_id: 3)
chatroom5 = Chatroom.create(title: "Famous Youtubers", event_id: 2)
chatroom6 = Chatroom.create(title: "Awesome people", event_id: 1)

post1 = Post.create(text: "I like this place", user_id: 1, chatroom_id: 2)
post2 = Post.create(text: "I don't like this place", user_id: 1, chatroom_id: 2)
post3 = Post.create(text: "Awesome sauce", user_id: 2, chatroom_id: 5)
post4 = Post.create(text: "Like it", user_id: 3, chatroom_id: 5)
post5 = Post.create(text: "Love it", user_id: 3, chatroom_id: 6)
post6 = Post.create(text: "Hate it", user_id: 3, chatroom_id: 3)
