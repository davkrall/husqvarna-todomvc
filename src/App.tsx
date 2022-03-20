import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./model";
import TodoList from "./components/TodoList";
import "./App.css";

const LOCAL_STORAGE_KEY: string | null = "todos-react-typescript";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const newTodoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedTodos: Todo[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "{}");
    if(storedTodos) {
      setTodos(storedTodos);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addNewTodo = () => {
    const newTodo: string | undefined = newTodoRef.current?.value;

    if (newTodo) {
      console.log(newTodo);
      setTodos((prevTodos) => {
        return [...prevTodos, { id: uuidv4(), text: newTodo, complete: false }];
      });
      //Using non-null assertion operator https://stackoverflow.com/questions/40349987/how-to-suppress-error-ts2533-object-is-possibly-null-or-undefined
      newTodoRef.current!.value = "";
    }
  };

  const toggleTodo = (id: string) => {
      const newTodos: Todo[] = [...todos];
      const modifiedTodo: Todo | undefined = newTodos.find(todo => todo.id === id);

      if(modifiedTodo){
        modifiedTodo.complete = !modifiedTodo.complete;
      }
      setTodos(newTodos);
  }

  return (
    <div className="App">
      <span className="heading">todos</span>
      <input
        ref={newTodoRef}
        type="text"
        placeholder="What needs to be done?"
      />
      <button onClick={addNewTodo}>Add</button>
      <TodoList todos={todos} setTodos={setTodos} toggleTodo={toggleTodo} />
      <span>{todos.filter(todo => !todo.complete).length} items left</span>
      <a>All</a>
      <a>Active</a>
      <a>Completed</a>
      <button>Clear completed</button>
    </div>
  );
};

export default App;
