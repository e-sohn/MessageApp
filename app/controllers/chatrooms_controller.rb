class ChatroomsController < ApplicationController
  def index
    if(params[:event_id])
      @event = Event.find(params[:event_id])
      @chatrooms = @event.chatrooms
      render json: @chatrooms, include: :event, status: :ok
    elsif(params[:user_id])
      @user = User.find(params[:user_id])
      @chatrooms = @user.chatrooms
      render json: @chatrooms, include: :event, status: :ok
    end
  end

  def show
    @chatroom = Chatroom.find(params[:id])
    render json: @chatroom, include: :event, status: :ok
  end

  def create
    @chatroom = Chatroom.new(chatroom_params)
    if @chatroom.save
      render json: @chatroom, status: :created
    else
      render json: { errors: @chatroom.errors }, status: :unprocessable_entity
    end
  end

  def update
    @chatroom = Chatroom.find(params[:id])
    if @chatroom.update(chatroom_params)
      render json: @chatroom, status: :ok
    else
      render json: { errors: @chatroom.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @chatroom = Chatroom.find(params[:id])
    @chatroom.destroy
    head 204
  end

  private

  def chatroom_params
    params.require(:chatroom).permit(:title, :event_id)
  end
end
