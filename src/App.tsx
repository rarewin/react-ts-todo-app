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

function Filter({ value, onChange }: { value: string; onChange: (key: string) => void }): JSX.Element {
  const handleClick = (key: string, event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    onChange(key);
  };

  return (
    <div className="panel-tabs">
      <a href="#" onClick={handleClick.bind(null, "ALL")} className={classNames({ "is-active": value === "ALL" })}>
        All
      </a>
      <a href="#" onClick={handleClick.bind(null, "TODO")} className={classNames({ "is-active": value === "TODO" })}>
        ToDo
      </a>
      <a href="#" onClick={handleClick.bind(null, "DONE")} className={classNames({ "is-active": value === "DONE" })}>
        Done
      </a>
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
  const [filter, setFilter] = React.useState("ALL");

  const displayItems = items.filter((item) => {
    if (filter === "ALL") return true;
    if (filter === "TODO") return !item.done;
    if (filter === "DONE") return item.done;
  });

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
  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  return (
    <div className="panel">
      <div className="panel-heading">⚛️ React ToDo</div>
      <Input onAdd={handleAdd} />
      <Filter value={filter} onChange={handleFilterChange} />
      {displayItems.map((item) => (
        <TodoItem key={item.key} item={item} onCheck={handleCheck} />
      ))}
      <div className="panel-block">{displayItems.length} items</div>
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
