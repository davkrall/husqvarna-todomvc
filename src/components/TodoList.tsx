import React from 'react';
import { useLocation } from 'react-router-dom';
import { Todo } from '../model';
import SingleTodo from './SingleTodo';


interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  toggleTodo,
  deleteTodo
}: Props) => {
  const filterType: string = useLocation().hash;
  let filteredTodos: Todo[];
  
  switch(filterType) {
    case '#/':
    default:
      filteredTodos = todos;
      break;
    case '#/active':
      filteredTodos = todos.filter((todo) => !todo.complete);
      break;
    case '#/completed':
      filteredTodos = todos.filter((todo) => todo.complete);
      break;
    }
  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => {
        return (
          <SingleTodo
            todo={todo}
            key={todo.id}
            todos={todos}
            setTodos={setTodos}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;
