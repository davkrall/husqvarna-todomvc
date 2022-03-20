import React, { useState, useRef, useEffect } from "react";
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
  useEffect(() => {
    if(edit){
      editTodoRef.current!.focus();
    }
  }, [edit])

  function todoChange() {
    toggleTodo(todo.id);
  }

  function todoDestroy() {
    deleteTodo(todo.id);
  }

  function startEdit() {
    setEdit(true);
  }

  function finishEditEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      //Using non-null assertion operator https://stackoverflow.com/questions/40349987/how-to-suppress-error-ts2533-object-is-possibly-null-or-undefined
      editTodoRef.current!.value = editTodo;
      setEdit(false);
      return;
    } else if (e.key === "Enter") {
      makeEdit(todo.id);
    }
  }

  function finishEditBlur() {
    makeEdit(todo.id);
  }

  const makeEdit = (id: string) => {
    const editedTodo: string | undefined = editTodoRef.current?.value.trim();

    if (editedTodo) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: editedTodo } : todo
        )
      );
      editTodoRef.current!.value = editedTodo;
      setEditTodo(editedTodo);
    } else {
      todoDestroy();
    }
    setEdit(false);
  };

  return (
    <li
      className={`${todo.complete ? "completed" : ""} ${edit ? "editing" : ""}`}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.complete}
          onChange={todoChange}
        />
        <label onDoubleClick={startEdit}>{todo.text}</label>
        <button className="destroy" onClick={todoDestroy}></button>
      </div>
      <input
        className="edit"
        ref={editTodoRef}
        defaultValue={todo.text}
        onKeyDown={finishEditEnter}
        onBlur={finishEditBlur}
      />
    </li>
  );
};

export default SingleTodo;
