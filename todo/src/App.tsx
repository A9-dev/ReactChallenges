import { useState } from "react";

import "./App.css";

function App() {
  const [todos, setTodos] = useState<string[]>([]);

  return (
    <>
      <h1>Todo List</h1>
      <input
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setTodos([...todos, e.currentTarget.value]);
            e.currentTarget.value = "";
          }
        }}
      />
      {todos &&
        todos.map((todo, index) => {
          return (
            <div key={index} className="todo">
              <p className="todoText">{todo}</p>
              <button
                onClick={() => setTodos(todos.filter((_, i) => i !== index))}
              >
                Delete
              </button>
            </div>
          );
        })}
    </>
  );
}

export default App;
