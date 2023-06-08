export const initialCreateTask = ({
  taskName,
  taskDescription = "",
  taskDueDate = "",
  taskPriority = 3,
  completed = false,
  taskId = crypto.randomUUID(),
}) => {
  return {
    taskId,
    taskName,
    taskDescription,
    taskDueDate,
    taskPriority,
    completed,
  };
};

export function findTask(projects, projectId, taskId) {
  let project = projects.find((project) => project.getPrjId() === projectId);
  return project._prjTasks.find((task) => task.taskId === taskId);
}

export function editTask(task, newParameters) {
  for (let [key, value] of Object.entries(newParameters)) {
    task[key] = value;
  }
}
