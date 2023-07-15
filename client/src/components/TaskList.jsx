import React, { useState } from "react";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Checkbox from "@mui/material/Checkbox";
import UpadateTask from "./UpdateTask";
import "./TaskList.css";

function TaskList(props) {
  const [editItem, setEditItem] = useState("");

  function deleteTask(id) {
    fetch(`http://localhost:8000/tasks/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function updateIsComplete(item) {
    fetch(`http://localhost:8000/tasks/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isComplete: !item.isComplete,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  const taskList = props.taskList.map((item, index) => {
    if (item._id === editItem)
      return <UpadateTask item={item} setEditItem={setEditItem}></UpadateTask>;
    return (
      <li key={index}>
        <div style={{ display: "flex" }}>
          <Checkbox
            checked={item.isComplete}
            onClick={() => updateIsComplete(item)}
          />
          <p style={{ textDecoration: item.isComplete && "line-through" }}>
            {item.todo}
          </p>
        </div>
        <div className="icons">
          <EditIcon
            className="edit-icon"
            onClick={() => setEditItem(item._id)}
          />
          <DeleteIcon
            className="delete-icon"
            onClick={() => deleteTask(item._id)}
          />
        </div>
      </li>
    );
  });

  return (
    <div>
      <ul>{taskList}</ul>
    </div>
  );
}

TaskList.propTypes = {
  taskList: PropTypes.array.isRequired,
};

export default TaskList;
