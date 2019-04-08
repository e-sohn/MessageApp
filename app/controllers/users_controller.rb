class UsersController < ApplicationController

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

  def create
    if(params[:user_id])
      @user = User.find(params[:user_id])
      @chatroom = Chatroom.find(params[:chatroom_id])
      @user.chatrooms << @chatroom
    else
      @user = User.new(user_params)
      if @user.save
        session[:user_id] = @user.id
        redirect_to @user
      end
    end
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
