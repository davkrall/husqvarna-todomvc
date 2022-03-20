import React from 'react'
import { Todo } from '../model'

interface Props {
  todo: Todo,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  toggleTodo: (id: string) => void
}

const SingleTodo: React.FC<Props> = ( { todo, todos, setTodos, toggleTodo }:Props ) => {
  function todoChange(){
    toggleTodo(todo.id)
  }
  
  return (
    <div>
      <input type="checkbox" checked={todo.complete} onChange={todoChange}/>
      {todo.text}</div>
  )
}

export default SingleTodo;