export const createProject = (_prjName) => {
  let _tasks = [];
  let _prjId = crypto.randomUUID();

  const getPrjName = () => {
    return _prjName;
  };

  const addTask = (task) => {
    _tasks.push(task);
  };

  const getPrjId = () => {
    return _prjId;
  };

  const getPrjTasks = () => {
    return _tasks;
  };

  return {
    getPrjName,
    getPrjTasks,
    addTask,
    getPrjId,
  };
};
