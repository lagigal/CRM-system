import { useEffect, useState } from "react";
import "./style/App.scss";
import Task from "./components/Task";
import CreateTask from "./components/CreateTask";
import { deleteTasks, getTasks, updateTask } from "./api/baseAPI";
import { TaskCategorys, TaskProps } from "./constants/interfaces";
import TaskCounter from "./components/TaskCounter";

function App() {
  const [taskList, setTaskList] = useState<TaskProps[]>([]);
  const [taskListChanged, setTaskListChanged] = useState<boolean>(false);
  const [taskCategory, setTaskCategory] = useState<TaskCategorys>("Все");

  useEffect(() => {
    getTasks().then((data) => {
      const allTtasks = data.data.reverse();
      if (taskCategory === "Все") {
        setTaskList(allTtasks);
      } else if (taskCategory === "В работе") {
        setTaskList(allTtasks.filter((tasks) => tasks.isDone === false));
      } else if (taskCategory === "Завершенные") {
        setTaskList(allTtasks.filter((tasks) => tasks.isDone === true));
      }
    });
  }, [taskListChanged, taskCategory]);

  const triggerChenged = () => {
    setTaskListChanged((prev) => !prev);
  };

  function addTask(newTask: TaskProps) {
    setTaskList((prev) => [newTask, ...prev!]);
    triggerChenged();
  }

  function deleteTask(id: number) {
    deleteTasks(id!).then(() => triggerChenged());
  }

  function onUpdateTask(id: number, updatedData: TaskProps) {
    updateTask(id, updatedData).then(() => triggerChenged());
  }

  return (
    <>
      <div className="app">
        <CreateTask onAddTask={addTask} />
        <TaskCounter
          setTaskCategory={setTaskCategory}
          taskListChanged={taskListChanged}
        />
        {taskList?.map((i) => {
          return (
            <Task
              key={i.id}
              created={i.created}
              id={i.id}
              isDone={i.isDone}
              title={i.title}
              deleteTask={deleteTask}
              updateTask={onUpdateTask}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
