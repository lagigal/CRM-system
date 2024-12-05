import "../style/Task.scss";
import { TaskProps } from "../constants/interfaces";
import React, { ChangeEvent, useState } from "react";
import trash from "../assets/trash.svg";
import { deleteTasks, updateTask } from "../api/baseAPI";

const Task: React.FC<TaskProps> = ({ todo, updateTaskList }) => {
  const [isDoneTask, setIsDone] = useState<boolean>(todo.isDone);
  const [titleTask, setTitleTask] = useState<string>(todo.title);
  const [isEditingTask, setIsEditingTask] = useState<boolean>(false);
  const [newTitleTask, setNewTitleTask] = useState<string>(todo.title);

  const chengeTask = () => {
    const updetedTask = {
      title: newTitleTask,
      isDone: isDoneTask,
    };
    updateTask(todo.id, updetedTask).then(() => updateTaskList());
    setIsEditingTask(false);
    setTitleTask(newTitleTask);
  };

  const toggleDone = () => {
    const updateIsDone = !isDoneTask;
    updateTask(todo.id, { isDone: updateIsDone }).then(() => {
      updateTaskList();
      setIsDone(updateIsDone);
    });
  };

  const onDeleteTask = () => {
    deleteTasks(todo.id).then(() => updateTaskList());
  };

  const handleChengeTitleTask = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitleTask(e.target.value);
  };

  const handleCloseChengeTitleTask = () => {
    setIsEditingTask(false);
    setNewTitleTask(titleTask);
  };

  const handleOpenChengeTitleTask = () => {
    setIsEditingTask(true);
  };

  return (
    <div className="task">
      <input
        className="task__checkbox"
        type="checkbox"
        onChange={toggleDone}
        checked={todo.isDone}
      />

      {isEditingTask && (
        <>
          <input
            maxLength={64}
            autoFocus
            className="task__input"
            value={newTitleTask}
            onChange={handleChengeTitleTask}
          />
          <button className="task__button save" onClick={chengeTask}>
            &#10004;
          </button>
          <button
            className="task__button close"
            onClick={handleCloseChengeTitleTask}
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
            onClick={handleOpenChengeTitleTask}
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
