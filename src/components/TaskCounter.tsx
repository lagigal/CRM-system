import React from "react";
import { TaskCounterProps } from "../constants/interfaces";
import "../style/TaskCounter.scss";
import { Radio } from "antd";

const TaskCounter: React.FC<TaskCounterProps> = ({
  setTaskCategory,
  taskCounter,
}) => {


  return (
    <>
      <div className="taskCounter">
      <Radio.Group onChange={(e) => setTaskCategory(e.target.value)}>
        <Radio.Button value="all">Все ({`${taskCounter?.all}`})</Radio.Button>
        <Radio.Button value="completed">Завершенные ({`${taskCounter?.completed}`})</Radio.Button>
        <Radio.Button value="inWork">В работе ({`${taskCounter?.inWork}`})</Radio.Button>
      </Radio.Group>
      </div>
    </>
  );
};

export default TaskCounter;
