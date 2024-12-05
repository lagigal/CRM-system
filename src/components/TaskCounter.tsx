import React from "react";
import { TaskCounterProps } from "../constants/interfaces";
import "../style/TaskCounter.scss";

const TaskCounter: React.FC<TaskCounterProps> = ({
  setTaskCategory,
  taskCounter,
  taskStatus,
}) => {
  return (
    <>
      <div className="taskCounter">
        <button
          className={`taskCounter__button ${
            taskStatus === "all" ? "active" : ""
          }`}
          onClick={() => setTaskCategory("all")}
        >
          Все ({`${taskCounter?.all}`})
        </button>
        <button
          className={`taskCounter__button ${
            taskStatus === "completed" ? "active" : ""
          }`}
          onClick={() => setTaskCategory("completed")}
        >
          Завершенные ({`${taskCounter?.completed}`})
        </button>
        <button
          className={`taskCounter__button ${
            taskStatus === "inWork" ? "active" : ""
          }`}
          onClick={() => setTaskCategory("inWork")}
        >
          В работе ({`${taskCounter?.inWork}`})
        </button>
      </div>
    </>
  );
};

export default TaskCounter;
