import "../style/CreateTask.scss";
import { createTasks } from "../api/baseAPI";

import React, { ChangeEvent, useState } from "react";
import { updateTaskListProps, TodoRequest } from "../constants/interfaces";

const CreateTask: React.FC<updateTaskListProps> = ({ updateTaskList }) => {
  const [taskText, setTaskText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const validateInput = (text: string) => {
    if (text.trim().length < 2) {
      setError("Минимальная длина задачи: 2 символа.");
      return false;
    } else if (text.length > 64) {
      setError("Максимальная длина задачи: 64 символа.");
      return false;
    }
    setError(null);
    return true;
  };

  const saveTask = () => {
    const task: TodoRequest = { title: taskText, isDone: false };
    if (!error && taskText) {
      createTasks(task).then(() => {
        updateTaskList();
        setTaskText("");
        setError(null);
      });
    }
  };

  const hendleChangeCreateTaskInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskText(e.target.value);
    validateInput(e.target.value);
    if (!e.target.value.length) {
      setError(null);
    }
  };

  return (
    <>
      <div className="createTask">
        <input
          maxLength={65}
          className="createTask__input"
          placeholder="Добавьте задачу..."
          value={taskText}
          onChange={hendleChangeCreateTaskInput}
        />
        {error && <div className="createTask__error-message">{error}</div>}
        <button className="createTask__button" onClick={saveTask}>
          Добавить
        </button>
      </div>
    </>
  );
};

export default CreateTask;
