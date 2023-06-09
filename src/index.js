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
  deleteTask,
  filterButtons,
  renderAllTasks,
  checkForRender,
  renderTodayTasks,
  clearMain,
  deactivateSidebarButtons,
  renderThisWeekTasks,
  headerHamburger,
  toggleSidebar,
  screenWidth,
  hideSidebarMedia,
  sidebarBg,
  sidebar,
  toggleProjectsList,
  projectsExtendButton,
} from "./modules/dom-control";

import { setProjectToStorage } from "./modules/storage-control";
import "./scss/index.scss";
import { getAllTasks } from "./modules/project-control";

populateProjectsList();
renderAllTasks();
screenWidth.addEventListener("change", hideSidebarMedia);

if (screenWidth.matches) {
  hideSidebarMedia();
  sidebar.addEventListener("click", (e) => {
    if (e.target.closest('[data-button="sidebar"]')) {
      toggleSidebar();
    }
  });
}

headerHamburger.addEventListener("click", toggleSidebar);
sidebarBg.addEventListener("click", toggleSidebar);

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
      target.closest("#to-close-button"))
  ) {
    $qs(".task-overview-bg").classList.remove("task-overview-active");
    toggleWindowAnimation();
    enableInputs();
    clearMain();
    checkForRender();
  }
});

projectsList.addEventListener("click", deleteProject);

projectsList.addEventListener("click", openRenameProjectForm);

projectsList.addEventListener("input", checkRenameProjectFormInput);

projectsList.addEventListener("click", cancelProjectRename);

projectsList.addEventListener("click", renameProjectDOM);

projectsList.addEventListener("click", renderProjectPage);

addTodoButton.addEventListener("click", openCreateTaskForm);

filterButtons.forEach((button) =>
  button.addEventListener("click", () => {
    clearMain();
    deactivateSidebarButtons();
    button.classList.add("list-btn-active");
    if (button.id === "all-tasks") {
      renderAllTasks();
    }
    if (button.id === "today") {
      renderTodayTasks();
    }
    if (button.id === "this-week") {
      renderThisWeekTasks();
    }
  })
);

tasksList.addEventListener("input", checkCreateTaskFormInput);

tasksList.addEventListener("click", createTask);

tasksList.addEventListener("click", cancelTaskCreate);

tasksList.addEventListener("change", toggleTaskStatus);
tasksListCompleted.addEventListener("change", toggleTaskStatus);

tasksList.addEventListener("click", openTaskOverview);
tasksListCompleted.addEventListener("click", openTaskOverview);

tasksList.addEventListener("click", deleteTask);
tasksListCompleted.addEventListener("click", deleteTask);

taskOverviewWindow.addEventListener("click", enableEdit);

overviewPriority.addEventListener("change", changeOverviewPriority);

overviewDueDate.addEventListener("change", changeOverviewDueDate);

overviewProjectsSelect.addEventListener("change", changeOverviewProject);

projectsExtendButton.addEventListener("click", toggleProjectsList);

document.addEventListener("click", (e) => console.log(e.target));
