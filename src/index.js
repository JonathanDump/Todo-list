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
import { createProject } from "./modules/project-create";
import "./scss/index.scss";

const projects = [];

console.log("22");

//function to enable add-btn on create form(call it when input is changing)
function success() {
  if (document.querySelector(".info-wrapper__content").value === "") {
    document.querySelector(".form-btn-wrapper__btn-add-task").disabled = true;
  } else {
    document.querySelector(".form-btn-wrapper__btn-add-task").disabled = false;
  }
}

// let prj = createProject("water plants");
// console.log(prj);
// console.log(prj.getPrjId());

// prj.addTask({ name: "wtr ficus" });

projectsPlusBtn.addEventListener("click", openCreateProjectForm);

projectCancelBtn.addEventListener("click", closeCreateProjectForm);

projectInputName.addEventListener("input", checkInput);

projectAddBtn.addEventListener("click", (e) => {
  e.preventDefault();
  projects.push(createProject(projectInputName.value));
  closeCreateProjectForm();
  console.log(projects[0].getPrjName());
});
