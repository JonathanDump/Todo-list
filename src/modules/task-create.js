export const initialCreateTask = (
  taskName,
  taskDescription = "",
  taskDueDate = "",
  taskPriority = 3,
  completed = false
) => {
  let taskId = crypto.randomUUID();
  return {
    taskId,
    taskName,
    taskDescription,
    taskDueDate,
    taskPriority,
    completed,
  };
};
