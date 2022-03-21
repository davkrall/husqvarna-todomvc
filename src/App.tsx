import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./model";
import TodoList from "./components/TodoList";
import "../node_modules/todomvc-app-css/index.css";
import "./app.css";

//Setting the name of the local storage key used to store the todos
const LOCAL_STORAGE_KEY: string | null = "todos-react-typescript";
if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
}

const App: React.FC = () => {
  //State management for all todo items
  const [todos, setTodos] = useState<Todo[]>([]);

  //State management for the button that toggles all todo items
  const [toggleAllTodos, setToggleAllTodos] = useState<boolean>(false);

  //useRef for the input field
  const newTodoRef = useRef<HTMLInputElement>(null);

  //Filtertype for tracking the active filter
  const filterType: string = useLocation().hash;

  //This useEffect gets any todo items stored in localStorage when first opening the application
  useEffect(() => {
    const storedTodos: Todo[] = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || "{}"
    );
    setTodos(storedTodos);
  }, []);

  //This useEffect updates the localStorage data when any todos are changed
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  //If the Enter key is pressed, and the input field is not empty or whitespace, a new todo item is added with a randomly generated ID
  const addNewTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const newTodo: string | undefined = newTodoRef.current?.value.trim();

    if (newTodo) {
      setTodos((prevTodos) => {
        return [...prevTodos, { id: uuidv4(), text: newTodo, complete: false }];
      });
      //Resetting the input field
      //Using non-null assertion operator https://stackoverflow.com/questions/40349987/how-to-suppress-error-ts2533-object-is-possibly-null-or-undefined
      newTodoRef.current!.value = "";
    }
  };

  //Toggling a todo to done or not done after checking if it exists
  const toggleTodo = (id: string) => {
    const newTodos: Todo[] = [...todos];
    const modifiedTodo: Todo | undefined = newTodos.find(
      (todo) => todo.id === id
    );

    if (modifiedTodo) {
      modifiedTodo.complete = !modifiedTodo.complete;
    }
    setTodos(newTodos);
  };

  //Deleting a todo after checking if it exists
  const deleteTodo = (id: string) => {
    let newTodos: Todo[] = [...todos];
    const deletedTodo: Todo | undefined = newTodos.find(
      (todo) => todo.id === id
    );

    if (deletedTodo) {
      newTodos = newTodos.filter((todo) => todo.id !== id);
    }
    setTodos(newTodos);
  };

  //Filtering out completed todos
  const clearComplete = () => {
    let newTodos: Todo[] = [...todos];

    newTodos = newTodos.filter((todo) => !todo.complete);

    setTodos(newTodos);
  };

  //Logic for button that toggles all todos
  const toggleAll = () => {
    setToggleAllTodos(!toggleAllTodos);

    let newTodos: Todo[] = [...todos];
    newTodos.map((todo) => (todo.complete = toggleAllTodos));
    setTodos(newTodos);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input
          ref={newTodoRef}
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onKeyDown={addNewTodo}
        />
      </header>
      <section className={`main ${todos.length === 0 ? "hidden" : ""}`}>
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label className="toggle-all" onClick={toggleAll}>
          Mark all as complete
        </label>
        <TodoList
          todos={todos}
          setTodos={setTodos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      </section>
      <footer className={`footer ${todos.length === 0 ? "hidden" : ""}`}>
        <span className="todo-count">
          <strong>{todos.filter((todo) => !todo.complete).length}</strong> item
          <span className={todos.filter((todo) => !todo.complete).length === 1 ? "hidden" : ""}>s</span> left
        </span>
        <ul className="filters">
          <li>
            <Link to="/#/" className={filterType === "#/" ? "selected" : ""}>
              All
            </Link>
          </li>
          <li>
            <Link
              to="/#/active"
              className={filterType === "#/active" ? "selected" : ""}
            >
              Active
            </Link>
          </li>
          <li>
            <Link
              to="/#/completed"
              className={filterType === "#/" ? "completed" : ""}
            >
              Completed
            </Link>
          </li>
        </ul>
        <button
          className={`clear-completed ${
            todos.filter((todo) => todo.complete).length === 0 ? "hidden" : ""
          }`}
          onClick={clearComplete}
        >
          Clear completed
        </button>
      </footer>
    </section>
  );
};

export default App;
