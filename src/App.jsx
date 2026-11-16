
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");

  const [task, setTask] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) || []
  );

  const [edit, setEdit] = useState(null);

  const [complete, setComplete] = useState(
    () => JSON.parse(localStorage.getItem("complete")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  useEffect(() => {
    localStorage.setItem("complete", JSON.stringify(complete));
  }, [complete]);

  function handleAdd() {
    if (input.trim() === "") {
      return;
    }

    if (edit !== null) {
      const updateTask = [...task];
      updateTask[edit] = input;
      setTask(updateTask);
      setInput("");
      setEdit(null);
    } else {
      setTask([...task, input]);
      setInput("");
    }
  }

  function handleEdit(index) {
    setInput(task[index]);
    setEdit(index);
  }

  function handleDelete(index) {
    const dlt = task.filter((_, i) => i !== index);
    setTask(dlt);

    const updatedComplete = complete
      .filter((item) => item !== index);

    setComplete(updatedComplete);
  }

  function handleComplete(index) {
    if (complete.includes(index)) {
      const com = complete.filter((item) => item !== index);
      setComplete(com);
    } else {
      setComplete([...complete, index]);
    }
  }

  return (
    <div className="todo-container">

      <h1>TO DO LIST</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter Task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e)=>{
            if(e.key === "Enter"){
              handleAdd();
            }
          }}
        />

        <button className="add-btn" onClick={handleAdd} >
          {edit === null ? "Add" : "Update"}
        </button>
      </div>

      <ul className="task-list">
        {task.map((item, i) => (
          <li className="task-item" key={i}>

            <span
              className="task-text"
              style={{
                textDecoration: complete.includes(i)
                  ? "line-through"
                  : "none"
              }}
            >
              {item}
            </span>

            <button
              className="delete-btn"
              onClick={() => handleDelete(i)}
            >
              Delete
            </button>

            <button
              className="edit-btn"
              onClick={() => handleEdit(i)}
            >
              Edit
            </button>

            <button
              className="complete-btn"
              onClick={() => handleComplete(i)}
            >
              Complete
            </button>

          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;
