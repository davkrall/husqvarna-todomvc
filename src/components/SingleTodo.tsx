import React from "react";
import { Todo } from "../model";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const SingleTodo: React.FC<Props> = ({
  todo,
  todos,
  setTodos,
  toggleTodo,
  deleteTodo
}: Props) => {
  function todoChange() {
    toggleTodo(todo.id);
  }

  function todoDestroy(){
    deleteTodo(todo.id);
  }

  return (
    <li className={todo.complete ? "completed" : ""}>
      <input type="checkbox" className="toggle" checked={todo.complete} onChange={todoChange} />
      <label>{todo.text}</label>
      <button className="destroy" onClick={todoDestroy}></button>
    </li>
  );
};

export default SingleTodo;
