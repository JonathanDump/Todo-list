import { initialCreateProject, recreateProject } from "./project-control";

export const setProjectToStorage = (name) => {
  const project = initialCreateProject(name);
  const projects = getProjectsFromStorage();
  projects.push(project);
  localStorage.setItem("projects", JSON.stringify(projects));
};

function getProjectsFromStorage() {
  if (!localStorage.getItem("projects")) {
    localStorage.setItem("projects", JSON.stringify([]));
    return [];
  } else {
    return JSON.parse(localStorage.getItem("projects")).map((project) => {
      return initialCreateProject(
        project["_prjName"],
        project["_prjTasks"],
        project["_prjId"]
      );
    });
  }
}
