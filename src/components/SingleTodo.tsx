import React from 'react'
import { Todo } from '../model'

interface Props {
  todo: Todo,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo: React.FC<Props> = ( { todo, todos, setTodos }:Props ) => {
  return (
    <div>
      <input type="checkbox" checked={todo.complete}/>
      {todo.text}</div>
  )
}

export default SingleTodo;