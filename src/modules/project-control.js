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
  return b[this.field] - a[this.field];
}
