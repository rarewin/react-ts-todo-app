import React from "react";
import classNames from "classnames";
import { Dispatch, SetStateAction } from "react";
import "./App.css";

interface TodoItemInterface {
  key: string;
  text: string;
  done: boolean;
}

function TodoItem({
  item,
  onCheck,
}: {
  item: TodoItemInterface;
  onCheck: (item: TodoItemInterface) => void;
}): JSX.Element {
  const handleChange = () => {
    onCheck(item);
  };

  return (
    <label className="panel-block">
      <input type="checkbox" checked={item.done} onChange={handleChange} />
      <span
        className={classNames({
          "has-text-grey-light": item.done,
        })}
      >
        {item.text}
      </span>
    </label>
  );
}

function Input({ onAdd }: { onAdd: (t: string) => void }): JSX.Element {
  const [text, setText] = React.useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onAdd(text);
      setText("");
    }
  };

  return (
    <div className="panel-block">
      <input
        className="input"
        type="text"
        placeholder="Enter to add"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

function Todo(): JSX.Element {
  const getKey = () => Math.random().toString(32).substring(2);
  const [items, setItems]: [Array<TodoItemInterface>, Dispatch<SetStateAction<Array<TodoItemInterface>>>] =
    React.useState<Array<TodoItemInterface>>([
      { key: getKey(), text: "Learn JavaScript", done: false },
      { key: getKey(), text: "Learn React", done: false },
      { key: getKey(), text: "Get some good sleep", done: false },
    ]);
  const handleCheck = (checked: TodoItemInterface) => {
    const newItems = items.map((item) => {
      if (item.key === checked.key) {
        item.done = !item.done;
      }
      return item;
    });
    setItems(newItems);
  };
  const handleAdd = (text: string) => {
    setItems([...items, { key: getKey(), text, done: false }]);
  };

  return (
    <div className="panel">
      <div className="panel-heading">⚛️ React ToDo</div>
      <Input onAdd={handleAdd} />
      {items.map((item) => (
        <TodoItem key={item.key} item={item} onCheck={handleCheck} />
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
