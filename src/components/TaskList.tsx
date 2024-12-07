import { TaskListProps } from "../constants/interfaces";
import Task from "./Task";

const TaskList: React.FC<TaskListProps> = ({ todos , updateTaskList }) => {
  return (
    <>
      {todos.map((i) => {
        return (
          <Task
            key={i.id}
            todo={i}
            updateTaskList={updateTaskList}
          />
        );
      })}
    </>
  );
};

export default TaskList;
