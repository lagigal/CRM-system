import "../style/CreateTask.scss";
import { createTasks, getTask } from "../api/baseAPI";

import React, { useRef, useState } from "react";
import { CreateTaskProps, TaskProps } from "../constants/interfaces";

const CreateTask: React.FC<CreateTaskProps> = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const validateInput = (text: string) => {
    if (text.length < 2) {
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
    const task: TaskProps = { title: taskText, isDone: false };
    if (!error && inputRef.current?.value.length) {
      createTasks(task).then((data) => {
        getTask(data.id!).then((data) => onAddTask(data));
        inputRef.current!.value = "";
        setError(null);
      });
    }
  };

  return (
    <>
      <div className="createTask">
        <input
          maxLength={65}
          ref={inputRef}
          className="createTask__input"
          placeholder="Добавьте задачу..."
          onChange={(e) => {
            setTaskText(e.target.value);
            validateInput(e.target.value);
            if (!e.target.value.length) {
              setError(null);
            }
          }}
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
