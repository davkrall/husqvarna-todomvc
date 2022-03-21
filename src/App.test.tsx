import React from "react";
import ReactDOM from 'react-dom'
import { getByText, render, screen } from "@testing-library/react";
import App from "./App";
import TodoList from "./components/TodoList";
import SingleTodo from "./components/SingleTodo"
import Footer from "./Footer"

test("renders footer without crashing", () => {
  const testDiv = document.createElement("div");
  ReactDOM.render(<Footer />, testDiv);
});