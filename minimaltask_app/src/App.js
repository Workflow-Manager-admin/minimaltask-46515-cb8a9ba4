import React, { useState, useRef } from 'react';
import './App.css';

/**
 * MinimalTask Main Container
 * A simple, accessible, minimal todo app with Add, Edit, Complete, Delete.
 * Uses colors: primary (#1976d2), secondary (#fff), accent (#ff9800).
 * Light theme, single-column, responsive, keyboard and mobile-friendly.
 */
 
// Colors defined here for inline use and overrides
const COLORS = {
  primary: "#1976d2",
  secondary: "#ffffff",
  accent: "#ff9800",
  background: "#f8f9fa",
  border: "#e0e0e0",
  text: "#232323",
  completedBg: "#f5f5f5",
  completedText: "#adb5bd"
};

// PUBLIC_INTERFACE
function App() {
  const [tasks, setTasks] = useState([]); // [{id, text, completed, editing}]
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  // PUBLIC_INTERFACE
  function handleInputChange(e) {
    setInput(e.target.value);
  }

  // PUBLIC_INTERFACE
  function handleAddTask(e) {
    e.preventDefault();
    const value = input.trim();
    if (!value) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: value,
        completed: false
      }
    ]);
    setInput('');
    inputRef.current && inputRef.current.focus();
  }

  // PUBLIC_INTERFACE
  function handleToggleComplete(id) {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  }

  // PUBLIC_INTERFACE
  function handleEditTask(id, text) {
    setEditId(id);
    setEditValue(text);
    setTimeout(() => {
      if (editInputRef.current) editInputRef.current.focus();
    }, 100);
  }

  // PUBLIC_INTERFACE
  function handleEditChange(e) {
    setEditValue(e.target.value);
  }

  // PUBLIC_INTERFACE
  function handleEditSave(id) {
    const val = editValue.trim();
    if (!val) return;
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, text: val } : t
    ));
    setEditId(null);
    setEditValue('');
  }

  // PUBLIC_INTERFACE
  function handleEditCancel() {
    setEditId(null);
    setEditValue('');
  }

  // PUBLIC_INTERFACE
  function handleDeleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  // PUBLIC_INTERFACE
  function handleKeyDown(e, id) {
    if (e.key === 'Enter') {
      if (editId && id === editId) handleEditSave(id);
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.background,
        color: COLORS.text,
        fontFamily: "Inter, Roboto, Arial, sans-serif"
      }}
    >
      <header
        style={{
          width: "100%",
          background: COLORS.primary,
          color: COLORS.secondary,
          padding: "2.25rem 0 1.2rem 0",
          boxShadow: "0 2px 8px 0 rgba(25,118,210,0.04)",
          marginBottom: "2rem"
        }}
      >
        <div style={{
          maxWidth: 480,
          margin: "0 auto",
          padding: "0 20px"
        }}>
          <h1 style={{ margin: 0, fontSize: "2.1rem", fontWeight: 600, letterSpacing: '0.04em' }}>
            MinimalTask
          </h1>
          <div style={{
            marginTop: 6,
            color: "rgba(255,255,255,.8)",
            fontWeight: 400,
            fontSize: "1.08rem"
          }}>
            A minimalistic todo app – Add, edit, complete, delete your tasks!
          </div>
        </div>
      </header>
      <main>
        <section style={{
          maxWidth: 480,
          margin: "0 auto",
          background: COLORS.secondary,
          border: `1.5px solid ${COLORS.border}`,
          boxShadow: "0 1px 6px 0 rgba(0,0,0,0.05)",
          borderRadius: 12,
          padding: "1.5rem 1.1rem 2rem 1.1rem",
        }}>
          {/* Task input */}
          <form
            onSubmit={handleAddTask}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 24
            }}
            autoComplete="off"
            aria-label="Add new task form"
          >
            <input
              type="text"
              ref={inputRef}
              style={{
                flex: 1,
                padding: "0.75rem 1rem",
                borderRadius: 7,
                border: `1px solid ${COLORS.border}`,
                fontSize: "1.1rem",
                outline: "none",
                background: "#f9fafd"
              }}
              placeholder="Add a new task..."
              value={input}
              onChange={handleInputChange}
              aria-label="Task description"
              maxLength={120}
              onKeyDown={e => {
                if (e.key === 'Escape') setInput('');
              }}
            />
            <button
              type="submit"
              style={{
                background: COLORS.accent,
                border: "none",
                color: "#fff",
                fontWeight: 600,
                fontSize: "1rem",
                borderRadius: 7,
                padding: "0.74rem 1.25rem",
                cursor: input.trim() ? 'pointer' : 'not-allowed',
                transition: "background 0.15s",
                opacity: input.trim() ? 1 : 0.55,
              }}
              aria-label="Add task"
              disabled={!input.trim()}
              tabIndex={0}
            >
              Add
            </button>
          </form>
          {/* Task list */}
          <ul style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            minHeight: 72,
          }}>
            {tasks.length === 0 && (
              <li style={{
                textAlign: "center",
                color: "#b0b0b0",
                fontStyle: "italic",
                fontSize: "1.07rem"
              }}>
                No tasks yet. Add your first one!
              </li>
            )}
            {tasks.map(task => (
              <li
                key={task.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 14,
                  padding: "10px 0px",
                  ...(
                    task.completed
                      ? { background: COLORS.completedBg, borderRadius: 8 }
                      : {}
                  )
                }}
              >
                {/* Complete checkbox */}
                <button
                  type="button"
                  title={task.completed ? "Mark as incomplete" : "Mark as complete"}
                  onClick={() => handleToggleComplete(task.id)}
                  aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: "#f4f9ff",
                    border: `1.5px solid ${COLORS.primary}`,
                    marginRight: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    outline: "none",
                    cursor: "pointer",
                    position: "relative",
                    transition: "background 0.12s"
                  }}
                  tabIndex={0}
                >
                  {task.completed && (
                    <span
                      style={{
                        width: 14,
                        height: 14,
                        display: "inline-block",
                        borderRadius: "50%",
                        background: COLORS.primary
                      }}
                    />
                  )}
                </button>
                {/* Task text OR edit input */}
                <div style={{ flex: 1, display: "flex", alignItems: "center", minHeight: 40 }}>
                  {editId === task.id ? (
                    <input
                      ref={editInputRef}
                      type="text"
                      value={editValue}
                      onChange={handleEditChange}
                      onBlur={() => handleEditSave(task.id)}
                      onKeyDown={e => handleKeyDown(e, task.id)}
                      style={{
                        width: "100%",
                        fontSize: "1.06rem",
                        background: "#fcfcf9",
                        border: `1.5px solid ${COLORS.accent}`,
                        borderRadius: 6,
                        padding: "6px 9px",
                        outline: "none"
                      }}
                      maxLength={120}
                      aria-label="Edit task"
                    />
                  ) : (
                    <span
                      style={{
                        fontSize: "1.11rem",
                        color: task.completed ? COLORS.completedText : COLORS.text,
                        textDecoration: task.completed ? "line-through" : "none",
                        opacity: task.completed ? 0.62 : 1,
                        wordBreak: "break-word",
                        userSelect: "text",
                        padding: "0 1px"
                      }}
                    >
                      {task.text}
                    </span>
                  )}
                </div>
                {/* Edit button */}
                {editId !== task.id && (
                  <button
                    type="button"
                    onClick={() => handleEditTask(task.id, task.text)}
                    aria-label="Edit task"
                    style={{
                      marginLeft: 10,
                      marginRight: 2,
                      padding: "2px 7px",
                      fontSize: "1.02rem",
                      borderRadius: 6,
                      border: "none",
                      background: COLORS.primary,
                      color: "#fff",
                      fontWeight: 500,
                      cursor: "pointer",
                      transition: "background 0.12s"
                    }}
                    tabIndex={0}
                    disabled={task.completed}
                  >
                    Edit
                  </button>
                )}
                {/* Save/Cancel controls if editing */}
                {editId === task.id && (
                  <>
                    <button
                      type="button"
                      onMouseDown={e => { e.preventDefault(); handleEditSave(task.id); }}
                      aria-label="Save task"
                      style={{
                        marginLeft: 7,
                        padding: "2px 8px",
                        fontSize: "1.02rem",
                        borderRadius: 6,
                        border: "none",
                        background: COLORS.accent,
                        color: "#fff",
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                      tabIndex={0}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onMouseDown={e => { e.preventDefault(); handleEditCancel(); }}
                      aria-label="Cancel editing"
                      style={{
                        marginLeft: 4,
                        padding: "2px 8px",
                        fontSize: "1.02rem",
                        borderRadius: 6,
                        border: "none",
                        background: "#dedede",
                        color: "#333",
                        fontWeight: 500,
                        cursor: "pointer"
                      }}
                      tabIndex={0}
                    >
                      Cancel
                    </button>
                  </>
                )}
                {/* Delete */}
                <button
                  type="button"
                  title="Delete task"
                  onClick={() => handleDeleteTask(task.id)}
                  aria-label="Delete task"
                  style={{
                    marginLeft: 14,
                    padding: "2px 9px",
                    fontSize: "1.08rem",
                    borderRadius: 6,
                    border: "none",
                    background: "#ef5350",
                    color: "#fff",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "background 0.12s"
                  }}
                  tabIndex={0}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </section>
        <footer style={{
          textAlign: "center",
          color: "#bdbdbd",
          marginTop: 36,
          fontSize: "1em",
          letterSpacing: ".04em"
        }}>
          <span role="img" aria-label="sparkle">
            ✨
          </span>
          &nbsp;MinimalTask &mdash; your lightweight todo!
        </footer>
      </main>
    </div>
  );
}

export default App;