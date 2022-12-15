import { useEffect, useState } from "react";
const useFetch = (list, url) => {
  const [todos, setTodos] = useState(list);

  const addItem = async (newItem) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error.massage);
    }
    getFetchTodo();
  };

  const getFetchTodo = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const pushData = [];
      for (const key in data) {
        pushData.push({
          id: key,
          text: data[key].text,
        });
      }
      setTodos(pushData);
    } catch (error) {
      console.log(error.massage);
    }
  };

  const removeItemHandler = async (todoID) => {
    try {
      const response = await fetch(
        `https://todo-20b34-default-rtdb.firebaseio.com/todos/${todoID}.json`,
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      console.log(error.massage);
    }
    getFetchTodo();
  };

  return {
    todos,
    addItem,
    getFetchTodo,
    removeItemHandler,
  };
};
export default useFetch;
