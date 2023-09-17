import { useState } from "react";

export default function NewTodoForm({ onSubmit }) {
  // 設定原始的待辦事項，是字串
  const [newItem, setNewItem] = useState("");

  // 表單送出(含點擊 enter 事件) 的處理
  // 新增一筆待辦事項
  // 舊的待辦事項也要記得保留，所以需要 [...currentTodos]
  const handleSubmit = (e) => {
    e.preventDefault();

    // 假如 newItem 是空字串，直接 return 跳出函式
    if (newItem === "") return;

    onSubmit(newItem);

    // 清空原本輸入todo項目的欄位資訊
    setNewItem("");
  };

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          type="text"
          id="item"
        />
      </div>
      <button className="btn">Add</button>
    </form>
  );
}
