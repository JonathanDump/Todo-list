import { getProjectsFromStorage } from "./storage-control";

export const initialCreateProject = (
  _prjName,
  _prjTasks = [],
  _prjId = crypto.randomUUID()
) => {
  // let fakeName = "Fake Name";

  const getPrjName = () => {
    return _prjName;
  };

  const addTask = (task) => {
    _prjTasks.push(task);
  };

  const getPrjId = () => {
    return _prjId;
  };

  const getPrjTasks = () => {
    return _prjTasks;
  };

  const getPrjProps = () => {
    return {
      _prjName,
      _prjTasks,
      _prjId,
    };
  };

  return {
    setProjectName: function (name) {
      this._prjName = name;
    },
    getPrjName,
    getPrjTasks,
    getPrjId,
    getPrjProps,
    addTask,
    _prjName,
    _prjId,
    _prjTasks,
  };
};

export function renameProject(newName, id) {
  let projects = getProjectsFromStorage();
  let project = projects.find((project) => project.getPrjId() === id);

  project._prjName = newName;
  // project.setProjectName(newName);

  localStorage.setItem("projects", JSON.stringify(projects));
}

export function superSort(a, b) {
  return a[this.field] - b[this.field];
}

export function removeTaskFromProject(projects, projectId, task) {
  let project = projects.find((project) => project.getPrjId() === projectId);
  project._prjTasks = project._prjTasks.filter((item) => item !== task);
}

export function pushTaskToProject(projects, newProjectId, task) {
  let project = projects.find((project) => project.getPrjId() === newProjectId);
  task.projectId = newProjectId;
  project.addTask(task);
}

export function findProject(projects, id) {
  return projects.find((project) => project.getPrjId() === id);
}

export function getAllTasks() {
  let projects = getProjectsFromStorage();
  return projects.map((project) => project._prjTasks).flat();
}
