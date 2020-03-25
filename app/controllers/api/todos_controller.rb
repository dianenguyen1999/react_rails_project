class Api::TodosController < ApplicationController
 # each action can return 3 things 
 # can only return one, different ways in rep. data.
 # html
 # xml
 # ** what we are using on this application json - js object notation 
   def index 
    render json: Todo.all
    end 

  def create
    @todo = Todo.new(todo_params)   
    if @todo.save
      render json: @todo 
    else
      render json: {error: @todo.erros }, status: :unprocessable_entity
    end
  end

  def update
    @todo = Todo.find(params[:id]) 
    if @todo.update(todo_params)
      render json: @todo 
    else
      render json: {error: @todo.erros }, status: :unprocessable_entity
    end
  end

  def destroy
    todo.find(params[:id]).destroy
    render json: {message: 'The todo is deleted'}
  end


  private
  def todo_params
    # permitting an object called todo. in this case were calling for title and comeplete. 
    # {todo: {title: '', complete: true } }
    params.require(:todo).permit(:title, :complete)
  end
