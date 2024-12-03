import "../style/Task.scss";
import { TaskProps } from "../constants/interfaces";
import React, { useEffect, useState } from "react";
import trash from "../assets/trash.svg";

const Task: React.FC<TaskProps> = ({
  title,
  isDone,
  id,
  deleteTask,
  updateTask,
}) => {
  const [isDoneTask, setIsDone] = useState<boolean>(isDone);
  const [titleTask, setTitleTask] = useState<string>(title);
  const [isEditingTask, setIsEditingTask] = useState<boolean>(false);
  const [newTitleTask, setNewTitleTask] = useState<string>(title);

  const toggleDone = () => {
    setIsDone((prev) => !prev);
  };

  const onDeleteTask = () => {
    if (deleteTask) {
      deleteTask(id!);
    }
  };

  const chengeTask = () => {
    const updetedTask = {
      title: newTitleTask,
      isDone: isDoneTask,
    };
    if (updateTask) {
      updateTask(id!, updetedTask);
      setIsEditingTask(false);
      setTitleTask(newTitleTask);
    }
  };

  useEffect(() => {
    chengeTask();
  }, [isDoneTask]);

  return (
    <div className="task">
      <input
        className="task__checkbox"
        type="checkbox"
        onChange={toggleDone}
        checked={isDoneTask}
      />

      {isEditingTask && (
        <>
          <input
            maxLength={64}
            autoFocus
            className="task__input"
            value={newTitleTask}
            onChange={(e) => {
              setNewTitleTask(e.target.value);
            }}
          />
          <button className="task__button save" onClick={chengeTask}>
            &#10004;
          </button>
          <button
            className="task__button close"
            onClick={() => {
              setIsEditingTask(false);
              setNewTitleTask(titleTask);
            }}
          >
            &#10006;
          </button>
        </>
      )}
      {!isEditingTask && (
        <>
          <p className="task__title">{titleTask}</p>
          <button
            className="task__button chenge"
            onClick={() => setIsEditingTask(true)}
          >
            &#9998;
          </button>
          <button className="task__button trash" onClick={onDeleteTask}>
            <img src={trash} />
          </button>
        </>
      )}
    </div>
  );
};

export default Task;
