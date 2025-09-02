import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";

export default function App() {
  const [todos, setTodos] = useState([]);

  // Toggle completed
  function handleToggle(id) {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  // Remove a todo
  function handleRemove(id) {
    setTodos(prev => prev.filter(t => t.id !== id));
  }

  // Add a new todo
  function handleAdd(e) {
    e.preventDefault();
    const text = e.target.todo.value.trim();
    if (!text) return;

    if (todos.some(t => t.text.toLowerCase() === text.toLowerCase())) {
      alert("This task already exists!");
      return;
    }

    const newTodo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };

    setTodos(prev => [newTodo, ...prev]);
    e.target.reset();
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md sm:max-w-lg lg:max-w-2xl bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-4 sm:p-8"
      >
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          ✨ My Todo List
        </motion.h1>

        {/* Form */}
        <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            name="todo"
            placeholder="Add a new task..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm text-sm sm:text-base"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            Add
          </motion.button>
        </form>

        {/* Todo List */}
        <AnimatePresence>
          <motion.ul layout className="flex flex-col gap-3">
            {/* Empty state */}
            {todos.length === 0 && (
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-gray-600 text-center italic"
              >
                No tasks yet — add one!
              </motion.li>
            )}

            {/* Todos */}
            {todos.map(todo => (
              <motion.li
                layout
                key={todo.id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                whileHover={{ scale: 1.02, boxShadow: "0px 8px 20px rgba(0,0,0,0.1)" }}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 px-4 py-3 rounded-lg"
              >
                <label className="flex items-center gap-3 cursor-pointer select-none break-words">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggle(todo.id)}
                    className="w-5 h-5 accent-green-500"
                  />
                  <span
                    className={`${
                      todo.completed
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {todo.text}
                  </span>
                </label>

                <motion.button
                  whileHover={{ rotate: -10, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleRemove(todo.id)}
                  className="mt-2 sm:mt-0 p-2 rounded hover:bg-red-100 text-red-500 self-end sm:self-auto"
                >
                  <FiTrash2 />
                </motion.button>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
