const createTask = (
  taskName,
  taskDescription,
  taskDueDate,
  taskPriority,
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
