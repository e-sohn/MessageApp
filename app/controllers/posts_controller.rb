class PostsController < ApplicationController
  def index
    @chatroom = Chatroom.find(params[:chatroom_id])
    @posts = @chatroom.posts
    render json: @posts, include: :user, status: :ok
  end

  def show
    @post = Post.find(params[:id])
    render json: @post, include: :user, status: :ok
  end

  def create
    @post = current_user.posts.create!(post_params)
    render json: @post, include: :user, status: :created
  end

  def update
    @post = Post.find(params[:id])
    if @post.user == current_user
      @post.update!(post_params)
      render json: { post: @post }, include: :user
    else
      render json: { errors: "unauthorized" }
    end
  end

  def destroy
    @post = Post.find(params[:id])
    if @post.user == current_user
      @post.destroy
      head 204
    else
      render json: { errors: "unauthorized" }
    end
  end

  private

  def post_params
    params.require(:post).permit(:text, :chatroom_id)
  end
end
