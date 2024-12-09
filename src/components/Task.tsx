import "../style/Task.scss";
import { TaskProps } from "../constants/interfaces";
import React, { ChangeEvent, useState } from "react";
import { deleteTasks, updateTask } from "../api/baseAPI";
import { Button, Checkbox, Input } from "antd";
import { CheckOutlined, CloseOutlined, DeleteOutlined, FormOutlined } from "@ant-design/icons";

const Task: React.FC<TaskProps> = ({ todo, updateTaskList }) => {
  const [isDoneTask, setIsDone] = useState<boolean>(todo.isDone);
  const [titleTask, setTitleTask] = useState<string>(todo.title);
  const [isEditingTask, setIsEditingTask] = useState<boolean>(false);
  const [newTitleTask, setNewTitleTask] = useState<string>(todo.title);
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

  const chengeTask = async () => {
    const updetedTask = {
      title: newTitleTask,
      isDone: isDoneTask,
    };
    try {
      await updateTask(todo.id, updetedTask);
      updateTaskList();
      setIsEditingTask(false);
      setTitleTask(newTitleTask);
    } catch (error) {
      console.error("Failed to fetch update task:", error);
    }
  };

  const toggleDone = async () => {
    const updateIsDone = !isDoneTask;
    try {
      await updateTask(todo.id, { isDone: updateIsDone });
      updateTaskList();
      setIsDone(updateIsDone);
    } catch (error) {
      console.error("Failed to fetch update task:", error);
    }
  };

  const onDeleteTask = async () => {
    try {
      await deleteTasks(todo.id);
      updateTaskList();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleChengeTitleTask = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitleTask(e.target.value);
    validateInput(e.target.value);
  };

  const handleCloseChengeTitleTask = () => {
    setIsEditingTask(false);
    setNewTitleTask(titleTask);
    setError(null);
  };

  const handleOpenChengeTitleTask = () => {
    setIsEditingTask(true);
  };

  return (
    <div className="task">
      <Checkbox onChange={toggleDone} checked={todo.isDone} />
      {error && <div className="task__error-message">{error}</div>}
      {isEditingTask && (
        <>
          <Input
            maxLength={64}
            autoFocus
            className="task__input"
            value={newTitleTask}
            onChange={handleChengeTitleTask}
          />
          <Button
            color={"primary"}
            variant={"solid"}
            onClick={chengeTask}
            disabled={error ? true : false}
          >
            <CheckOutlined />
          </Button>
          <Button
            color={"danger"}
            variant={"solid"}
            onClick={handleCloseChengeTitleTask}
          >
            <CloseOutlined />
          </Button>
        </>
      )}
      {!isEditingTask && (
        <>
          <p className="task__title">{titleTask}</p>
          <Button
            color={"primary"}
            variant={"solid"}
            onClick={handleOpenChengeTitleTask}
          >
            <FormOutlined />
          </Button>
          <Button 
            color={"danger"} 
            variant={"solid"} 
            onClick={onDeleteTask}
          >
            <DeleteOutlined />
          </Button>
        </>
      )}
    </div>
  );
};

export default Task;
