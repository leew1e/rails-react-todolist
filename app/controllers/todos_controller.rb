class TodosController < ApplicationController
  include ActionController::HttpAuthentication::Token

  before_action :authenticate_user
  before_action :check_ownership, only: [:update, :destroy]
  before_action :check_user, only: [:show, :create]

  def show
    @todos = Todo.where(user_id: params[:id]).order("created_at DESC")
    render json: @todos
  end

  def create
    @todo = Todo.create(todo_params)
    if @todo.valid?
      render json: @todo, status: :created
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  def update
    @todo = Todo.find(params[:id])
    if @todo.update(todo_params)
      render json: @todo, status: :ok
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @todo = Todo.find(params[:id])
    @todo.destroy
    head :no_content
  end

  private

  def authenticate_user
    # Authorization: Bearer <token>
    token, _options = token_and_options(request)

    if token == nil
      render json: { status: :unauthorized, message: ["You need to sign in or sign up before continuing."], code: 401 }
    end
  end

  def check_ownership
    token, _options = token_and_options(request)
    token_id = AuthTokenService.decode(token)

    # change/delete todos
    owner_id = Todo.find(params[:id]).user_id

    if token_id != owner_id
      render json: { status: :forbidden, message: ["You cannot access other people`s todos!"], code: 403 }
    end
  end

  def check_user
    token, _options = token_and_options(request)
    token_id = AuthTokenService.decode(token)

    # create/show todos
    # user_id in url (serialized)
    user_id = params[:id].to_i

    # user_id in form body
    if user_id == 0
      user_id = todo_params[:user_id]
    end

    if token_id != user_id
      render json: { status: :forbidden, message: ["You cannot access other people`s todos!"], code: 403 }
    end
  end

  def todo_params
    params.require(:todo).permit(:title, :done, :user_id)
  end
end
