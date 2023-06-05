import "./index.html";
import {
  projectsPlusBtn,
  openCreateProjectForm,
  closeCreateProjectForm,
  projectsSectionWrapper,
  checkCreateProjectFormInput,
  getInputValue,
  projectCancelBtn,
  projectInputName,
  projectAddBtn,
  projectsList,
  openMore,
  deactivateMoreBtn,
  populateProjectsList,
  deleteProject,
  openRenameProjectForm,
  checkRenameProjectFormInput,
  cancelProjectRename,
  renameProjectDOM,
  renderProjectPage,
  addTodoButton,
  openCreateTaskForm,
  tasksList,
  checkCreateTaskFormInput,
  createTask,
  closeCreateTaskForm,
  cancelTaskCreate,
  toggleTaskStatus,
  tasksListCompleted,
  $qs,
} from "./modules/dom-control";

import { setProjectToStorage } from "./modules/storage-control";
import "./scss/index.scss";

console.log("123");

populateProjectsList();

projectsPlusBtn.addEventListener("click", openCreateProjectForm);

projectCancelBtn.addEventListener("click", closeCreateProjectForm);

projectInputName.addEventListener("input", checkCreateProjectFormInput);

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

projectsList.addEventListener("click", openRenameProjectForm);

projectsList.addEventListener("input", checkRenameProjectFormInput);

projectsList.addEventListener("click", cancelProjectRename);

projectsList.addEventListener("click", renameProjectDOM);

projectsList.addEventListener("click", renderProjectPage);

addTodoButton.addEventListener("click", openCreateTaskForm);

tasksList.addEventListener("input", checkCreateTaskFormInput);

tasksList.addEventListener("click", createTask);

tasksList.addEventListener("click", cancelTaskCreate);

tasksList.addEventListener("change", toggleTaskStatus);
tasksListCompleted.addEventListener("change", toggleTaskStatus);

// document.addEventListener("click", (e) => console.log(e.target));

// tasksList.addEventListener("focusout", () => {
//   if (!$qs(".task-create")) {
//     return;
//   }
//   const taskNameInput = $qs("#input-description");
//   if (!taskNameInput.textContent.trim().length) {
//     taskNameInput.innerHTML = "";
//   }
// });
