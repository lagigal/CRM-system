import { useEffect, useState } from "react";
import "./style/App.scss";
import CreateTask from "./components/CreateTask";
import { getTasks } from "./api/baseAPI";
import { TaskStatus, Todo, TodoInfo } from "./constants/interfaces";
import TaskCounter from "./components/TaskCounter";
import TaskList from "./components/TaskList";

function App() {
  const [taskList, setTaskList] = useState<Todo[]>([]);
  const [taskCount, setTaskCount] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });
  const [taskCategory, setTaskCategory] = useState<TaskStatus>("all");

  useEffect(() => {
    getAllTasks();
  }, [taskCategory]);

  async function getAllTasks() {
    await getTasks(taskCategory).then((data) => {
      setTaskList(data.data);
      setTaskCount(data.info);
    });
  }

  return (
    <>
      <div className="app">
        <CreateTask updateTaskList={getAllTasks} />
        <TaskCounter
          taskStatus={taskCategory}
          taskCounter={taskCount}
          setTaskCategory={setTaskCategory}
        />
        <TaskList todos={taskList} updateTaskList={getAllTasks} />
      </div>
    </>
  );
}

export default App;
