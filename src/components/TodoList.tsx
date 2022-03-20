import React from 'react'
import { Todo } from '../model'
import SingleTodo from './SingleTodo'

interface Props{
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  toggleTodo: (id: string) => void,
  deleteTodo: (id: string) => void
}

const TodoList: React.FC<Props> = ( { todos, setTodos, toggleTodo, deleteTodo }:Props) => {
  return (
    <div className="todo-list">
    {todos.map(todo => {
      return <SingleTodo todo={todo} key={todo.id} todos={todos} setTodos={setTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    })}
    </div>
  )
}

export default TodoList;