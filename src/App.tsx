import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./model";
import TodoList from "./components/TodoList";
import "../node_modules/todomvc-app-css/index.css";

const LOCAL_STORAGE_KEY: string | null = "todos-react-typescript";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const newTodoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedTodos: Todo[] = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || "{}"
    );
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addNewTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key != 'Enter') return
    const newTodo: string | undefined = newTodoRef.current?.value;

    if (newTodo) {
      setTodos((prevTodos) => {
        return [...prevTodos, { id: uuidv4(), text: newTodo, complete: false }];
      });
      //Using non-null assertion operator https://stackoverflow.com/questions/40349987/how-to-suppress-error-ts2533-object-is-possibly-null-or-undefined
      newTodoRef.current!.value = "";
    }
  };

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

  const deleteTodo = (id: string) => {
    let newTodos: Todo[] = [...todos];
    const deletedTodo: Todo | undefined = newTodos.find(
      (todo) => todo.id === id
    );

    if (deletedTodo) {
      newTodos = newTodos.filter((todo) => todo.id != id);
    }
    setTodos(newTodos);
  };

  const clearComplete = () => {
    let newTodos: Todo[] = [...todos];

    newTodos = newTodos.filter((todo) => !todo.complete);

    setTodos(newTodos);
  };

  return (
    <div className="todoapp">
      <header>
      <h1 className="heading">todos</h1>
      <input type="checkbox" className="toggle-all" />
      <input
        ref={newTodoRef}
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        onKeyDown={addNewTodo}
      />
      </header>
      <section className="main">
        <TodoList
          todos={todos}
          setTodos={setTodos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      </section>
      <footer className="footer">
        <span className="todo-count">
          <strong>{todos.filter((todo) => !todo.complete).length}</strong> items left
        </span>
        <ul className="filters">
          <li><a href="#/">All</a></li>
          <li><a href="#/active">Active</a></li>
          <li><a href="#/completed">Completed</a></li>
        </ul>
        <button className="clear-completed" onClick={clearComplete}>Clear completed</button>
      </footer>
    </div>
  );
};

export default App;
