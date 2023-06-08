import { clearAllBodyScrollLocks, enableBodyScroll } from "body-scroll-lock";
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
  openTaskOverview,
  toggleWindowAnimation,
  enableEdit,
  taskOverviewWindow,
  populateTasksList,
  headerName,
  overviewPriority,
  changeOverviewPriority,
  changeOverviewDueDate,
  overviewDueDate,
  overviewProjectsSelect,
  changeOverviewProject,
  enableInputs,
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
  if (
    $qs(".task-overview-active") &&
    (!target.closest(".task-overview-window") ||
      target.closest(".task-overview-header__close-button-wrapper"))
  ) {
    $qs(".task-overview-bg").classList.remove("task-overview-active");
    toggleWindowAnimation();
    populateTasksList(headerName.dataset.id);
    enableInputs();
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

tasksList.addEventListener("click", openTaskOverview);
tasksListCompleted.addEventListener("click", openTaskOverview);

taskOverviewWindow.addEventListener("click", enableEdit);

overviewPriority.addEventListener("change", changeOverviewPriority);

overviewDueDate.addEventListener("change", changeOverviewDueDate);

overviewProjectsSelect.addEventListener("change", changeOverviewProject);

// document.addEventListener("click", (e) => console.log(e.target));
