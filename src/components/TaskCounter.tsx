import React, { useEffect, useState } from "react";
import { InfoProps, TaskCounterProps } from "../constants/interfaces";
import { getTasks } from "../api/baseAPI";
import "../style/TaskCounter.scss";

const TaskCounter: React.FC<TaskCounterProps> = ({
  taskListChanged,
  setTaskCategory,
}) => {
  const [taskCount, setTaskCount] = useState<InfoProps>();

  useEffect(() => {
    getTasks().then((data) => {
      setTaskCount(data.info);
    });
  }, [taskListChanged]);

  return (
    <>
      <div className="taskCounter">
        <button
          className="taskCounter__button"
          onClick={() => setTaskCategory("Все")}
        >
          Все ({`${taskCount?.all}`})
        </button>
        <button
          className="taskCounter__button"
          onClick={() => setTaskCategory("Завершенные")}
        >
          Завершенные ({`${taskCount?.completed}`})
        </button>
        <button
          className="taskCounter__button"
          onClick={() => setTaskCategory("В работе")}
        >
          В работе ({`${taskCount?.inWork}`})
        </button>
      </div>
    </>
  );
};

export default TaskCounter;
