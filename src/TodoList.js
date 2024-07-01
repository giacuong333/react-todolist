import { useState, useRef, useEffect } from "react";
import styles from "./index.module.sass";

function TodoList() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    console.log(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  function handleAddTask() {
    setTasks((prev) => {
      let updated = [];
      if (isEditing) {
        updated = tasks.map((task, index) => (index === editIndex ? input : task));
        setIsEditing(false);
        setEditIndex(null);
      } else {
        updated = [...prev, input];
      }
      return updated;
    });

    setInput("");
    inputRef.current.focus();
  }

  function handleDelete(index) {
    setTasks((prev) => prev.filter((item, i) => i !== index));
  }

  function handleEdit(index) {
    setEditIndex(index);
    setIsEditing(true);
    setInput(tasks[index]);
  }

  return (
    <div className={styles.main}>
      <h2>TODO LIST</h2>

      <div className={styles.formGroup}>
        <input type="text" placeholder="add item..." value={input} onChange={handleInputChange} ref={inputRef} />
        <button type="button" onClick={handleAddTask} className={styles.secondaryBtn}>
          {isEditing ? "Update" : "Add"}
        </button>
      </div>

      <ul>
        {tasks.map((task, index) => {
          return (
            <li key={index} className={styles.listItems}>
              <p>{task}</p>
              <div className="action">
                <button type="button" className={styles.primaryBtn} onClick={() => handleDelete(index)}>
                  Delete
                </button>
                <button type="button" className={styles.primaryBtn} onClick={() => handleEdit(index)}>
                  Edit
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TodoList;
