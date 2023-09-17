import { useEffect, useState } from "react";
import "./styles.css";
import NewTodoForm from "./NewTodoForm";
import TodoList from "./TodoList";

export default function App() {
  // 設定原始的待辦事項清單，是陣列，裡面包 key: value 物件
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  // 新增一筆待辦事項 addTodo
  const addTodo = (title) => {
    // 更新待辦事項清單 todos array 的東西 []
    // 記得不能更新原始資料，所以要做一個 currentTodos
    // 要記得把原本的一整包 Array 用 spread operator ... 丟回來
    // 再更新該筆 陣列裡的 "物件" 的 key: value 的內容
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
  };

  // 切換待辦事項的核取方塊勾勾，所以只有更新該筆 object 資料而已
  // 因為只有更新該筆資料物件 object，所以使用 {...todo}
  const toggleTodo = (id, completed) => {
    setTodos((currentTodos) => {
      // 利用 map() 走訪所有整包 currentTodos 陣列，找出 id 相同的那筆物件
      // todo 是一筆資料，一筆而已，不是一整包，一整包是陣列 []
      // {} an object (an Item)
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  };

  const deleteTodo = (id) => {
    setTodos((currentTodos) => {
      // 篩選出要保留的 todo 清單事項，利用 filter()
      // 回傳值一該筆 object {} 而已，不是一整包陣列
      return currentTodos.filter((todo) => todo.id !== id);
    });
  };

  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}
