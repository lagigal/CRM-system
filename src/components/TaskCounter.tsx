import React from "react";
import { TaskCounterProps } from "../constants/interfaces";
import "../style/TaskCounter.scss";
import { Button } from "antd";

const TaskCounter: React.FC<TaskCounterProps> = ({
  setTaskCategory,
  taskCounter,
  taskStatus,
}) => {
  return (
    <>
      <div className="taskCounter">
        <Button
          className={`taskCounter__button ${
            taskStatus === "all" ? "active" : ""
          }`}
          onClick={() => setTaskCategory("all")}
        >
          Все ({`${taskCounter?.all}`})
        </Button>
        <Button
          className={`taskCounter__button ${
            taskStatus === "completed" ? "active" : ""
          }`}
          onClick={() => setTaskCategory("completed")}
        >
          Завершенные ({`${taskCounter?.completed}`})
        </Button>
        <Button
          className={`taskCounter__button ${
            taskStatus === "inWork" ? "active" : ""
          }`}
          onClick={() => setTaskCategory("inWork")}
        >
          В работе ({`${taskCounter?.inWork}`})
        </Button>
      </div>
    </>
  );
};

export default TaskCounter;
