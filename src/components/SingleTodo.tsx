import React, { useState, useRef, useEffect } from "react";
import { Todo } from "../model";

//Props interface for SingleTodo component
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
  //edit tracks whether the todo is in Edit mode or not
  const [edit, setEdit] = useState<boolean>(false);

  //editTodo keeps the value of the todo text while it's being edited
  const [editTodo, setEditTodo] = useState<string>(todo.text);

  //editTodoRef is used to get the value of the editing input field
  const editTodoRef = useRef<HTMLInputElement>(null);

  //useEffect is used to autofocus on the editing input field once it is activated with the edit mode
  useEffect(() => {
    if (edit) {
      //Using non-null assertion operator https://stackoverflow.com/questions/40349987/how-to-suppress-error-ts2533-object-is-possibly-null-or-undefined
      editTodoRef.current!.focus();
    }
  }, [edit]);

  //Calling the toggleTodo function with the todo's id
  const todoChange = () => {
    toggleTodo(todo.id);
  }

  //Calling the deleteTodo function with the todo's id
  const todoDestroy = () => {
    deleteTodo(todo.id);
  }

  //Turns on Edit mode
  const startEdit =() => {
    setEdit(true);
  }

  //Handles pressing the Escape button to cancel the edit, and pressing the Enter button to confirm it
  const finishEditKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      //Using non-null assertion operator https://stackoverflow.com/questions/40349987/how-to-suppress-error-ts2533-object-is-possibly-null-or-undefined
      editTodoRef.current!.value = editTodo;
      setEdit(false);
      return;
    } else if (e.key === "Enter") {
      makeEdit(todo.id);
    }
  }

  //Calls the makeEdit function if focus is removed from the input field
  const finishEditBlur = () => {
    makeEdit(todo.id);
  }

  //Handles the editing logic
  const makeEdit = (id: string) => {
    //The value of the input field is trimmed
    const editedTodo: string | undefined = editTodoRef.current?.value.trim();

    //If the text is truthy, setTodos is called to update the text of the relevant todo item
    if (editedTodo) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: editedTodo } : todo
        )
      );
      //The value of the input field and editedTodo are updated
      editTodoRef.current!.value = editedTodo;
      setEditTodo(editedTodo);
      //If editedTodo is empty, delete the todo item
    } else {
      todoDestroy();
    }
    //Turn off the editing mode
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
        onKeyDown={finishEditKey}
        onBlur={finishEditBlur}
      />
    </li>
  );
};

export default SingleTodo;
