import React from "react";
import "../node_modules/todomvc-app-css/index.css";

const Footer: React.FC = () => {
  return (
    <footer className="info">
      <p>Double-click to edit a todo</p>
      <p>
        Created by David Krall for the Husqvarna Talent Program application
        process
      </p>
    </footer>
  );
};

export default Footer;
