const createTask = (taskName, taskDescription, taskDueDate, taskPriority) => {
  let taskId = crypto.randomUUID();
  return {
    taskId,
    taskName,
    taskDescription,
    taskDueDate,
    taskPriority,
  };
};
