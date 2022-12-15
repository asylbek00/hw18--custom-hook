import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import useFetch from "./helpers/hooks/useFetch";

function App() {
  const [todo, setTodo] = useState("");
  const BASE_URL = "https://todo-20b34-default-rtdb.firebaseio.com/todos.json";
  const { todos, addItem, getFetchTodo, removeItemHandler } = useFetch(
    [],
    BASE_URL
  );

  const addTodoHandler = (e) => {
    e.preventDefault();
    addItem({ text: todo });
    setTodo("");
  };

  useEffect(() => {
    getFetchTodo();
  }, []);

  

  return (
    <div className="App">
      <form onSubmit={addTodoHandler}>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button>Add</button>
      </form>
      <div>
        {todos.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => removeItemHandler(item.id)}>Delete</button>
          </li>
        ))}
      </div>
    </div>
  );
}

export default App;
