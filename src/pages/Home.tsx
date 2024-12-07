import "../style/Home.scss";
import { useEffect, useState } from "react";
import { getTasks } from "../api/baseAPI";
import { TaskStatus, Todo, TodoInfo } from "../constants/interfaces";
import CreateTask from "../components/CreateTask";
import TaskCounter from "../components/TaskCounter";
import TaskList from "../components/TaskList";
import CustomMenu from "../components/CustomMenu";
import Sider from "antd/es/layout/Sider";
import { Layout } from "antd";

const Home: React.FC = () => {
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
    try {
      const data = await getTasks(taskCategory);
      setTaskList(data.data);
      setTaskCount(data.info);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  }

  return (
      <>
      <CustomMenu />
      <div className="home">
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
};

export default Home;
