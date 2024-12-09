import React from "react";
import { TaskCounterProps, TaskStatus } from "../constants/interfaces";
import "../style/TaskCounter.scss";
import { Tabs } from "antd";

const TaskCounter: React.FC<TaskCounterProps> = ({
  setTaskCategory,
  taskCounter,
}) => {
  const tabItems = [
    {
      label: `Все (${taskCounter?.all})`, // Название вкладки
      key: 'all', // Уникальный ключ для вкладки
      children: null, // Контент вкладки, можно оставить пустым, если вкладка не раскрывает нового контента
    },
    {
      label: `Завершенные (${taskCounter?.completed})`,
      key: 'completed',
      children: null,
    },
    {
      label: `В работе (${taskCounter?.inWork})`,
      key: 'inWork',
      children: null,
    },
  ];

  const handleTabChange = (key: string) => {
    setTaskCategory(key as TaskStatus);
  };

  return (
    <>
      <div className="taskCounter">
      <Tabs 
      defaultActiveKey="all"
      centered
      items={tabItems}
      onChange={handleTabChange}
    />
      </div>
    </>
  );
};

export default TaskCounter;
