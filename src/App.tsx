import React from "react";
import TodoList from './components/TodoList';
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <span className="heading">todos</span>
      <input type="text" />
      <TodoList />
      <span>X items left</span>
      <a>All</a>
      <a>Active</a>
      <a>Completed</a>
      <button>Clear completed</button>
    </div>
  );
};

export default App;
