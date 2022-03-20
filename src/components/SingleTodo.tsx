import React, { useState, useRef } from "react";
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
  deleteTodo,
}: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.text);
  const editTodoRef = useRef<HTMLInputElement>(null);

  function todoChange() {
    toggleTodo(todo.id);
  }

  function todoDestroy() {
    deleteTodo(todo.id);
  }

  function switchEdit() {
    setEdit(!edit);
  }

  function finishEditEnter(e: React.KeyboardEvent<HTMLInputElement>){
    if (e.key !== "Enter") return;
    makeEdit(todo.id);
  }

  function finishEditBlur(){
    makeEdit(todo.id);
  }

  const makeEdit = (id: string) => {
    const editedTodo: string | undefined = editTodoRef.current?.value;

    if (editedTodo) {
      setTodos(todos.map((todo) => (
        todo.id === id?{...todo, text:editedTodo}:todo
      )));
      //Using non-null assertion operator https://stackoverflow.com/questions/40349987/how-to-suppress-error-ts2533-object-is-possibly-null-or-undefined
      editTodoRef.current!.value = "";
    }
      switchEdit();
  };

  return (
    <li className={todo.complete ? "completed" : "" && edit ? "editing" : ""}>
      {edit ? (
        <input autoFocus ref={editTodoRef} defaultValue={todo.text} onKeyDown={finishEditEnter} onBlur={finishEditBlur}/>
      ) : (
        <div>
          <input
            type="checkbox"
            className="toggle"
            checked={todo.complete}
            onChange={todoChange}
          />
          <label onDoubleClick={switchEdit}>{todo.text}</label>
          <button className="destroy" onClick={todoDestroy}></button>
        </div>
      )}
    </li>
  );
};

export default SingleTodo;
