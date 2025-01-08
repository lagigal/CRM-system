import "../style/CreateTask.scss";
import { createTasks } from "../api/userAPI";

import React, { ChangeEvent, useState } from "react";
import { updateTaskListProps, TodoRequest } from "../constants/interfaces";
import { Button, Input } from "antd";

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

  const saveTask = async () => {
    const task: TodoRequest = { title: taskText, isDone: false };
    if (!error && taskText) {
      try {
        await createTasks(task);
        updateTaskList();
        setTaskText("");
        setError(null);
      } catch (error) {
        console.error("Failed to create task:", error);
      }
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
        <Input
          maxLength={65}
          placeholder="Добавьте задачу..."
          value={taskText}
          onChange={hendleChangeCreateTaskInput}
        />
        {error && <div className="createTask__error-message">{error}</div>}
        <Button onClick={saveTask}>Добавить</Button>
      </div>
    </>
  );
};

export default CreateTask;
