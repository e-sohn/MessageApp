class UsersController < ApplicationController
  skip_before_action :ensure_signed_in, only: [:create, :login]

  def gen_token(user)
    payload = {
      id: user.id,
      username: user.username,
      email: user.email
    }
    JWT.encode(payload, Rails.application.credentials.secret_key_base)
  end

  def create
    if(params[:user_id])
      if(params[:user_id].to_i == current_user.id)
        @user = User.find(params[:user_id])
        @chatroom = Chatroom.find(params[:chatroom_id])
        @user.chatrooms << @chatroom unless @user.chatrooms.include?(@chatroom)
      else
        render json: { errors: "unauthorized" }
      end
    else
      email = params[:email]
      password = params[:password]
      username = params[:username]

      new_user = User.new({
        password: password,
        email: email,
        username: username
      })

      if new_user.valid?
        new_user.save!
        user_data = {
          username: new_user.username,
          email: new_user.email
        }
        render json: { user: user_data, token: gen_token(new_user)}
      else
        render nothing: true, status: 401
      end
    end
  end

  def login
    email = params[:email]
    password = params[:password]

    user = User.find_from_credentials email, password
    if user.nil?
      render nothing: true, status: 401
    else
      user_data = {
          username: user.username,
          email: user.email
        }
      render json: {user: user_data, token: gen_token(user)}
    end
  end

  def verify
    ensure_signed_in
    render json: { user: current_user }
  end

  def index
    if(params[:chatroom_id])
      @chatroom = Chatroom.find(params[:chatroom_id])
      @users = @chatroom.users
      render json: @users, include: :chatrooms, status: :ok
    else
      @users = User.all
      render json: @users
    end
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def new
    @user = User.new
    render json: @user
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])

    if @user.id == current_user.id
      email = params[:email]
      password = params[:password]
      username = params[:username]

      @user.update!({
        password: password,
        email: email,
        username: username
      })

      render json: { user: @user }
    else
      render json: { errors: "unauthorized" }
    end
  end

  def destroy
    if(params[:user_id])
      if(params[:user_id].to_i == current_user.id)
        @user = User.find(params[:user_id])
        @user.chatrooms.delete(params[:chatroom_id])
      else
        render json: { errors: "unauthorized" }
      end
    else
      @user = User.find(params[:id])
      if @user.id == current_user.id
        @user.destroy
        render status: :ok
      else
        render json: { errors: "unauthorized" }
      end
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
