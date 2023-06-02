import trashIcon from "/src/icons/trash-icon.svg";
import editIcon from "/src/icons/edit-icon.svg";
import moreIcon from "/src/icons/more-icon.svg";
import { getProjectsFromStorage } from "./storage-control";
import { renameProject, superSort } from "./project-control";
import { initialCreateTask } from "./task-create";
import {
  addTodoButtonModule,
  renameWrapperModule,
  taskCreateFormModule,
} from "./dom-patterns";

export const projectsPlusBtn = document.querySelector(".projects__add-icon");
export const projectsSectionWrapper = document.querySelector(
  ".projects__projects-section-wrapper"
);
export const projectAddBtn = document.querySelector(
  ".project-create__btn-add-project"
);
export const projectCancelBtn = document.querySelector(
  ".project-create__btn-cancel"
);
export const projectInputName = document.querySelector("#project-create__name");
const projectCreateForm =
  projectsSectionWrapper.querySelector(".project-create");
export const projectsList = document.querySelector(".projects__list");
const headerName = document.querySelector(".name__text");
export const tasksList = document.querySelector(".tasks");
export const addTodoButton = document.querySelector(".add-todo-btn-wrapper");

/////////FUNCTIONS
export const $qs = (selector) => document.querySelector(selector);

export function openCreateProjectForm() {
  projectsSectionWrapper.classList.add("list-btn-active");
  projectCreateForm.classList.remove("prj-create-form-disable");
}

export function closeCreateProjectForm() {
  projectCreateForm.classList.add("prj-create-form-disable");
  projectsSectionWrapper.classList.remove("list-btn-active");
  projectInputName.value = "";
}

function btnSuccess(input, button) {
  button.disabled = !input.value;
}

export function checkCreateProjectFormInput() {
  btnSuccess(projectInputName, projectAddBtn);
}

export function openMore(e) {
  if (document.querySelector(".more-window")) {
    document.querySelector(".more-window").remove();
  }
  if (!projectsList.innerHTML) {
    return;
  }

  if (!e.target.classList.contains("item-more__icon")) {
    return;
  }
  const projectWrapper = e.target.parentNode.parentNode.parentNode;
  const projectBtn = e.target.parentNode.parentNode;

  projectBtn.classList.add("list-btn-active");
  e.target.classList.add("more-btn-visible");

  projectWrapper.innerHTML += `<div class="more-window"  data-id="${projectBtn.parentElement.dataset.id}">
  <button class="more-btn" id="more-btn-rename">
    <img src="${editIcon}" alt="" />
    <div class="more-btn__name">Rename</div>
  </button>
  <button class="more-btn" id="more-btn-delete">
    <img src="${trashIcon}" alt="" />
    <div class="more-btn__name" >Delete</div>
  </button>
</div>
`;

  e.stopPropagation();
}

export function deactivateMoreBtn() {
  if (!projectsList.querySelector(".more-btn-visible")) {
    return;
  }
  projectsList
    .querySelector(".projects__item:has(div):has(.more-btn-visible)")
    .classList.remove("list-btn-active");

  projectsList
    .querySelector(".more-btn-visible")
    .classList.remove("more-btn-visible");
}

export function populateProjectsList() {
  projectsList.innerHTML = "";

  const projects = getProjectsFromStorage();

  projects.forEach((project) => {
    projectsList.innerHTML += `<div class="projects__item-wrapper" data-id="${project.getPrjId()}">
  <button class="projects__item">
    <div class="item-name">${project.getPrjName()}</div>
    <div class="item-more">
      <img  class="item-more__icon" src="${moreIcon}" alt="" />
    </div>
  </button>
</div>
`;
  });
}

export function deleteProject(e) {
  if (!projectsList.innerHTML) {
    return;
  }

  if (e.target.parentElement.id !== "more-btn-delete") {
    return;
  }

  e.preventDefault();

  let projects = getProjectsFromStorage();
  const prjId = e.target.parentNode.parentNode.dataset.id;

  projects = projects.filter((prj) => prj.getPrjId() != prjId);

  localStorage.setItem("projects", JSON.stringify(projects));

  document
    .querySelector(`.projects__item-wrapper[data-id="${prjId}"]`)
    .remove();

  populateProjectsList();
}

export function openRenameProjectForm(e) {
  if (!projectsList.innerHTML) {
    return;
  }

  if (e.target.parentElement.id !== "more-btn-rename") {
    return;
  }

  const prjId = e.target.parentNode.parentNode.dataset.id;
  let projects = getProjectsFromStorage();
  const prjName = projects
    .filter((project) => project.getPrjId() === prjId)[0]
    .getPrjName();

  const projectWrapper = document.querySelector(
    `.projects__item-wrapper[data-id="${prjId}"]`
  );

  projectWrapper.innerHTML = "";
  projectWrapper.innerHTML = renameWrapperModule;

  document.querySelector("#rename-form__input").value = prjName;

  e.preventDefault();
}

export function checkRenameProjectFormInput() {
  if (!document.querySelector(".rename-wrapper")) {
    return;
  }

  const input = document.querySelector("#rename-form__input");
  const button = document.querySelector("#rename-form__btn-apply");

  btnSuccess(input, button);
}

export function cancelProjectRename(e) {
  if (!document.querySelector(".rename-wrapper")) {
    return;
  }
  if (e.target.id !== "rename-form__btn-cancel") {
    return;
  }

  populateProjectsList();
}

export function renameProjectDOM(e) {
  if (!document.querySelector(".rename-wrapper")) {
    return;
  }
  if (e.target.id !== "rename-form__btn-apply") {
    return;
  }

  const newName = document.querySelector("#rename-form__input").value;
  const projectId = e.target.closest(".projects__item-wrapper").dataset.id;

  renameProject(newName, projectId);
  populateProjectsList();
}

export function openCreateTaskForm() {
  addTodoButton.classList.add("add-todo-btn-disable");
  tasksList.innerHTML += taskCreateFormModule;
}

export function checkCreateTaskFormInput(e) {
  if (!document.querySelector(".task-create")) {
    return;
  }

  $qs(".form-btn-wrapper__btn-add-task").disabled =
    !$qs("#input-content").value;
}

export function renderProjectPage(e) {
  if (
    !projectsList.innerHTML ||
    $qs(".rename-wrapper") ||
    e.target.classList.contains(".item-more") ||
    !e.target.closest(".projects__item-wrapper")
  ) {
    return;
  }

  if (addTodoButton.innerHTML === "") {
    addTodoButton.innerHTML += addTodoButtonModule;
  }

  tasksList.innerHTML = "";
  const projectId = e.target.closest(".projects__item-wrapper").dataset.id;
  const projectButton = document.querySelector(
    `.projects__item-wrapper[data-id="${projectId}"] .projects__item`
  );
  const projectName = document.querySelector(
    `.projects__item-wrapper[data-id="${projectId}"] .item-name`
  ).textContent;

  projectButton.classList.add("list-btn-active");
  headerName.textContent = projectName;
  headerName.dataset.id = projectId;
  loadTasksList(projectId);
}

function loadTasksList(projectId) {
  const projects = getProjectsFromStorage();
  const project = projects.find((project) => project._prjId === projectId);

  const sortedTasks = project._prjTasks.sort(
    superSort.bind({ field: "priority" })
  );

  tasksList.innerHTML = "";
  sortedTasks.forEach((task) => {
    tasksList.innerHTML += `<div class="task task-priority${task.taskPriority}" data-taskId="${task.taskId}">
  <input type="checkbox" id="todo" name="todo" />
  <div class="task__text-wrapper">
    <div class="task__content">${task.taskName}</div>
    <div class="task__description">${task.taskDescription}</div>
  </div>
</div>`;
  });
}
export function createTask(e) {
  if (!e.target.classList.contains("form-btn-wrapper__btn-add-task")) {
    return;
  }
  e.preventDefault();

  const projectId = headerName.dataset.id;
  const taskName = $qs("#input-content").value;
  const taskDescription = $qs("#input-description").value;
  const taskDueDate = $qs("#date").value;
  const taskPriority = parseInt($qs("#priority").value);
  const projects = getProjectsFromStorage();
  const project = projects.find((project) => project.getPrjId() === projectId);

  project.addTask(
    initialCreateTask(taskName, taskDescription, taskDueDate, taskPriority)
  );

  localStorage.setItem("projects", JSON.stringify(projects));

  loadTasksList(projectId);
  addTodoButton.classList.remove("add-todo-btn-disable");
}

export function cancelTaskCreate(e) {
  if (!e.target.classList.contains("form-btn-wrapper__btn-cancel")) {
    return;
  }
  closeCreateTaskForm();
}

export function closeCreateTaskForm() {
  $qs(".task-create").remove();
  addTodoButton.classList.remove("add-todo-btn-disable");
}
