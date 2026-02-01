"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function TodoPanel() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  /* ✅ Fetch Todos */
  const fetchTodos = async () => {
    const res = await axios.get("/api/todos");
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  /* ✅ Add Todo */
  const addTodo = async () => {
    if (!text.trim()) return;

    await axios.post("/api/todos", { text });
    setText("");
    fetchTodos();
  };

  /* ✅ Delete Todo */
  const deleteTodo = async (id) => {
    await axios.delete("/api/todos", { data: { id } });
    fetchTodos();
  };

  /* ✅ Toggle Done Checkbox */
  const toggleTodo = async (id, completed) => {
    await axios.patch("/api/todos", {
      id,
      completed: !completed,
    });

    fetchTodos();
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-10 p-5 rounded-xl shadow-lg bg-white">
      <h1 className="text-2xl text-black font-bold mb-4 text-center">
        Todo App
      </h1>

      {/* Input Panel */}
      <div className="flex text-black gap-2 mb-5">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter Todo..."
          className="border p-2 flex-1 rounded-lg"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 rounded-lg"
        >
          Add
        </button>
      </div>

      {/* Todo List Panel */}
      <div className="space-y-3">
        {todos.length === 0 && (
          <p className="text-black text-center">No Todos Found</p>
        )}

        {todos.map((todo) => (
          <div
            key={todo._id}
            className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
          >
            {/* ✅ Checkbox + Text */}
            <div className="flex text-black items-center gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo._id, todo.completed)}
                className="w-5 h-5"
              />

              <p
                className={`text-lg ${
                  todo.completed
                    ? "text-green-500"
                    : ""
                }`}
              >
                {todo.text}
              </p>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => deleteTodo(todo._id)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
