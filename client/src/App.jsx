import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

function App() {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/tasks", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setTaskList(data))
      .catch((err) => console.log(err));
  }, [taskList]);

  return (
    <>
      <AddTask />
      <TaskList taskList={taskList} />
    </>
  );
}
export default App;
