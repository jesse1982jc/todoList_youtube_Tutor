import TodoItem from "./TodoItem";

export default function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <ul className="list">
      {/* 假如 todos 陣列長度 === 0，顯示文字 "No Todos" */}
      {todos.length === 0 && "No Todos"}
      {/* 用 map 走訪 todos 陣列，渲染每一筆 <li> 元件 */}
      {todos.map((todo) => {
        return (
          <TodoItem
            {...todo}
            key={todo.id}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        );
      })}
    </ul>
  );
}
