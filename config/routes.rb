Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get "/users/verify", to: 'users#verify'
  post "/users/login", to: 'users#login'

  resources :users
  resources :events

  scope '/users/:user_id' do
    resources :chatrooms, only: [:index]
  end

  post '/users/:user_id/chatrooms/:chatroom_id', to: 'users#create'
  delete '/users/:user_id/chatrooms/:chatroom_id', to: 'users#destroy'

  scope '/chatrooms/:chatroom_id' do
    resources :users, only: [:index]
  end
  scope '/events/:event_id' do
    resources :chatrooms, only: [:index]
  end
  resources :chatrooms, only: [:create, :show, :update, :destroy]
  scope '/chatrooms/:chatroom_id' do
    resources :posts, only: [:index]
  end
  resources :posts, only: [:create, :show, :update, :destroy]
end
