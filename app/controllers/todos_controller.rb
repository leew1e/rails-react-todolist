class TodosController < ApplicationController
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
      render json: @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @todo = Todo.find(params[:id])
    @todo.destroy
    head :no_content, status: :ok
  end

  private

  def todo_params
    params.require(:todo).permit(:title, :done, :user_id)
  end
end
