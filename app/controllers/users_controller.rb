class UsersController < ApplicationController
  skip_before_action :ensure_signed_in, only: [:create, :login]

  def gen_token(user_id)
    payload = {id: user_id}
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

  def create
    if(params[:user_id])
      @user = User.find(params[:user_id])
      @chatroom = Chatroom.find(params[:chatroom_id])
      @user.chatrooms << @chatroom
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
        render json: { user: user_data, token: gen_token(new_user.id)}
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
      render json: {user: user_data, token: gen_token(user.id)}
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
    if @user.update_attributes(user_params)
      redirect_to @user
    end
  end

  def destroy
    if(params[:user_id])
      @user = User.find(params[:user_id])
      @user.chatrooms.delete(params[:chatroom_id])
    else
      @user = User.find(params[:id])
      @user.destroy
      redirect_to users_path
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
