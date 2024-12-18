import "../style/Home.scss";
import { useEffect, useState } from "react";
import { getTasks } from "../api/baseAPI";
import { TaskStatus, Todo, TodoInfo } from "../constants/interfaces";
import CreateTask from "../components/CreateTask";
import TaskCounter from "../components/TaskCounter";
import TaskList from "../components/TaskList";
import CustomMenu from "../components/CustomMenu";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      getAllTasks();
    }, 5000);
    return () => clearInterval(intervalId);
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
    <Layout
      style={{ minHeight: "100vh", display: "flex", flexDirection: "row" }}
    >
      <CustomMenu />
      <Layout style={{ margin: "20px", width: "100%" }}>
        <Content
          style={{
            width: "500px",
            padding: 24,
            background: "#fff",
            borderRadius: 8,
            minHeight: "calc(100vh - 32px)",
            margin: "0 auto",
          }}
        >
          <CreateTask updateTaskList={getAllTasks} />
          <TaskCounter
            taskCounter={taskCount}
            setTaskCategory={setTaskCategory}
          />
          <TaskList todos={taskList} updateTaskList={getAllTasks} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
