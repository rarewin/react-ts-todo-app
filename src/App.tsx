import React from "react";
import { Dispatch, SetStateAction } from "react";
import "./App.css";

interface TodoItemInterface {
  key: string;
  text: string;
  done: boolean;
}

function Todo(): JSX.Element {
  const getKey = () => Math.random().toString(32).substring(2);
  const [items, setItems]: [Array<TodoItemInterface>, Dispatch<SetStateAction<Array<TodoItemInterface>>>] =
    React.useState<Array<TodoItemInterface>>([
      { key: getKey(), text: "Learn JavaScript", done: false },
      { key: getKey(), text: "Learn React", done: false },
      { key: getKey(), text: "Get some good sleep", done: false },
    ]);

  return (
    <div className="panel">
      <div className="panel-heading">⚛️ React ToDo</div>
      {items.map((item) => (
        <label className="panel-block">
          <input type="checkbox" />
          {item.text}
        </label>
      ))}
      <div className="panel-block">{items.length} items</div>
    </div>
  );
}

function App(): JSX.Element {
  return (
    <div className="container is-fluid">
      <Todo />
    </div>
  );
}

export default App;
