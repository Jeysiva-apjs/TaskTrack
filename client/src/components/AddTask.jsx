import react, { useState } from "react";
import "./AddTask.css";

function AddTask() {
  const [task, setTask] = useState("");

  function addTask() {
    if (task.trim() === "") return;
    else {
      fetch("http://localhost:8000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo: task,
          isComplete: false,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setTask("");
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <>
      <div className="add-task-container">
        <input
          type="text"
          placeholder="Add your Task..."
          onChange={(event) => setTask(event.target.value)}
          onKeyDown={(event) => {
            if (event.key == "Enter") addTask();
          }}
          value={task}
        />
        <button onClick={addTask}>Add</button>
      </div>
    </>
  );
}

export default AddTask;
