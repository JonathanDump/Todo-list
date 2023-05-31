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
  projectsList,
  openMore,
  deactivateMoreBtn,
  populateProjectsList,
  deleteProject,
} from "./modules/dom-control";

import { setProjectToStorage } from "./modules/storage-control";
import "./scss/index.scss";

console.log("123");

populateProjectsList();

projectsPlusBtn.addEventListener("click", openCreateProjectForm);

projectCancelBtn.addEventListener("click", closeCreateProjectForm);

projectInputName.addEventListener("input", checkInput);

projectAddBtn.addEventListener("click", (e) => {
  e.preventDefault();
  setProjectToStorage(projectInputName.value);
  closeCreateProjectForm();
  populateProjectsList();
});

projectsList.addEventListener("click", openMore);
// (e) => console.log(e.target)

document.addEventListener("click", ({ target }) => {
  if (
    document.querySelector(".more-window") &&
    !target.closest(".more-window")
  ) {
    document.querySelector(".more-window").remove();
    deactivateMoreBtn();
  }
});

projectsList.addEventListener("click", deleteProject);
