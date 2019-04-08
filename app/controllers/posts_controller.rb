class PostsController < ApplicationController
  def index
    @chatroom = Chatroom.find(params[:chatroom_id])
    @posts = @chatroom.posts
    render json: @posts, include: :chatroom, status: :ok
  end

  def show
    @post = Post.find(params[:id])
    render json: @post, include: :chatroom, status: :ok
  end

  def create
    @chatroom = Chatroom.find(params[:chatroom_id])
    @post = Post.new(post_params)
    if @post.save
      @chatroom.posts.push(@post)
      render json: @post, status: :created
    else
      render json: { errors: @post.errors }, status: :unprocessable_entity
    end
  end

  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      render json: @post, status: :ok
    else
      render json: { errors: @post.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    head 204
  end

  private

  def post_params
    params.require(:post).permit(:text, :user_id, :chatroom_id)
  end
end
