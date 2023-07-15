import React from "react";
import { useState } from "react";
import "./UpdateTask.css";

function UpadateTask(props) {
  const [todo, setTodo] = useState(props.item.todo);

  function updateTodo() {
    fetch(`http://localhost:8000/tasks/${props.item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo: todo,
      }),
    }).then((response) => {
      console.log(data);
    });
    setTodo("");
    props.setEditItem("");
    window.location.reload();
  }
  return (
    <div className="update">
      <input
        type="text"
        value={todo}
        onChange={(event) => setTodo(event.target.value)}
        onKeyDown={(event) => {
          if (event.key == "Enter") updateTodo();
        }}
      />
      <button onClick={updateTodo}>Update</button>
    </div>
  );
}

export default UpadateTask;
