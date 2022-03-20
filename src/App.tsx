import React, { useState } from "react";
import { Todo } from "./model";
import TodoList from "./components/TodoList";
import "./App.css";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([{id: 1, text: "Task 1", complete: false}, {id: 2, text:"do this assignment", complete: false}]);

  return (
    <div className="App">
      <span className="heading">todos</span>
      <input type="text" />
      <TodoList todos={todos} setTodos={setTodos} />
      <span>{todos.length} items left</span>
      <a>All</a>
      <a>Active</a>
      <a>Completed</a>
      <button>Clear completed</button>
    </div>
  );
};

export default App;
