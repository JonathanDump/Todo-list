import "./index.html";
import {
  projectsPlusBtn,
  openCreateProjectForm,
  closeCreateProjectForm,
  projectsSectionWrapper,
  checkInput,
  getInputValue,
  projectCancelBtn,
  projectInputName,
  projectAddBtn,
} from "./modules/dom-control";
import { initialCreateProject } from "./modules/project-control";
import { setProjectToStorage } from "./modules/storage-control";
import "./scss/index.scss";

// const projects = [];

console.log("123");

// let prj = createProject("water plants");
// console.log(prj);
// console.log(prj.getPrjId());

// prj.addTask({ name: "wtr ficus" });

projectsPlusBtn.addEventListener("click", openCreateProjectForm);

projectCancelBtn.addEventListener("click", closeCreateProjectForm);

projectInputName.addEventListener("input", checkInput);

projectAddBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // projects.push(createProject(projectInputName.value));
  // localStorage.setItem("projects", JSON.stringify(projects));

  setProjectToStorage(projectInputName.value);

  closeCreateProjectForm();
  // console.log(projects);
});
