import trashIcon from "/src/icons/trash-icon.svg";
import editIcon from "/src/icons/edit-icon.svg";
import moreIcon from "/src/icons/more-icon.svg";
import dueDateIcon from "/src/icons/due-date.svg";
import { compareAsc, format } from "date-fns";
import { getProjectsFromStorage } from "./storage-control";
import { renameProject, superSort } from "./project-control";
import { changeTaskStatus, findTask, initialCreateTask } from "./task-create";
import {
  addTodoButtonModule,
  renameWrapperModule,
  taskCompletedModule,
  taskCreateFormModule,
  taskModule,
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
export const tasksListCompleted = document.querySelector(".tasks.completed");

/////////FUNCTIONS
export const $qs = (selector) => document.querySelector(selector);

export function openCreateProjectForm() {
  projectsSectionWrapper.classList.add("list-btn-active");
  projectCreateForm.classList.remove("prj-create-form-disable");
  $qs("#project-create__name").focus();
}

export function closeCreateProjectForm() {
  projectCreateForm.classList.add("prj-create-form-disable");
  projectsSectionWrapper.classList.remove("list-btn-active");
  projectInputName.value = "";
}

function btnSuccess(input, button) {
  button.disabled = !input.value.trim();
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
  if (
    !projectsList.innerHTML ||
    e.target.parentElement.id !== "more-btn-delete"
  ) {
    return;
  }

  e.preventDefault();

  let projects = getProjectsFromStorage();
  const prjId = e.target.parentNode.parentNode.dataset.id;

  projects = projects.filter((prj) => prj.getPrjId() != prjId);

  localStorage.setItem("projects", JSON.stringify(projects));

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
  document.querySelector("#rename-form__input").focus();
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
  $qs("#input-content").focus();
  $qs(".task-create").scrollIntoView();
}

export function checkCreateTaskFormInput(e) {
  if (!document.querySelector(".task-create")) {
    return;
  }

  // if ($qs("#input-content").textContent.length > 500) {
  //   e.preventDefault();
  //   alert("Dfsf");
  // }

  $qs(".form-btn-wrapper__btn-add-task").disabled =
    !$qs("#input-content").textContent.trim();
}

export function renderProjectPage(e) {
  if (
    !projectsList.innerHTML ||
    $qs(".rename-wrapper") ||
    e.target.classList.contains(".item-more") ||
    !e.target.closest(".projects__item-wrapper") ||
    e.target.id === "rename-form__btn-cancel"
  ) {
    return;
  }

  if (addTodoButton.innerHTML === "") {
    addTodoButton.innerHTML += addTodoButtonModule;
  }

  const projectsButtons = [...document.querySelectorAll(".projects__item")];
  projectsButtons.forEach((btn) => btn.classList.remove("list-btn-active"));

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
  populateTasksList(projectId);
}

function populateTasksList(projectId) {
  console.log(tasksListCompleted);
  const projects = getProjectsFromStorage();
  const project = projects.find((project) => project._prjId === projectId);

  const sortedTasks = project._prjTasks.sort(
    superSort.bind({ field: "taskPriority" })
  );

  tasksList.innerHTML = "";
  tasksListCompleted.innerHTML = "";
  sortedTasks.forEach((task) => {
    if (task.completed) {
      tasksListCompleted.innerHTML += `<div class="task task-priority${task.taskPriority}" data-id="${task.taskId}">
      <div class="task__checkbox-wrapper">
    <input type="checkbox" id="task-checkbox" name="task" checked/>
    </div>
    <div class="task__text-date-wrapper">
  <div class="task__text-wrapper">
    <div class="task__content">${task.taskName}</div>
    <div class="task__description">${task.taskDescription}</div>
  </div>
  <div class="task__date-wrapper">
  <img src="${dueDateIcon}" alt="" />
  ${task.taskDueDate}
  </div>
  </div>
</div>`;

      const taskDom = document.querySelector(`.task[data-id="${task.taskId}"]`);
      taskDom.classList.add("task-completed");
    } else {
      tasksList.innerHTML += `<div class="task task-priority${task.taskPriority}" data-id="${task.taskId}">
      <div class="task__checkbox-wrapper">
    <input type="checkbox" id="task-checkbox" name="task"/>
    </div>
     <div class="task__text-date-wrapper">
  <div class="task__text-wrapper">
    <div class="task__content">${task.taskName}</div>
    <div class="task__description">${task.taskDescription}</div>
  </div>
  <div class="task__date-wrapper">
  <img src="${dueDateIcon}" alt="" />
  ${task.taskDueDate}
  </div>
  </div>
</div>`;
    }
  });
}
export function createTask(e) {
  if (!e.target.classList.contains("form-btn-wrapper__btn-add-task")) {
    return;
  }
  e.preventDefault();

  const projectId = headerName.dataset.id;
  const taskName = $qs("#input-content").textContent;
  const taskDescription = $qs("#input-description").textContent;
  let taskDueDate = $qs("#date").value;
  if (taskDueDate) {
    taskDueDate = format(new Date($qs("#date").value), "dd MMM yyyy");
  }
  console.log(taskDueDate);
  const taskPriority = parseInt($qs("#priority").value);
  const projects = getProjectsFromStorage();
  const project = projects.find((project) => project.getPrjId() === projectId);

  project.addTask(
    initialCreateTask(taskName, taskDescription, taskDueDate, taskPriority)
  );

  localStorage.setItem("projects", JSON.stringify(projects));

  populateTasksList(projectId);
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

export function toggleTaskStatus(e) {
  if (e.target.id !== "task-checkbox") {
    console.log("1");
    return;
  }

  if (!e.target.closest(".task__checkbox-wrapper")) {
    console.log(e.target);
    console.log("2");
    return;
  }
  console.log("3");
  const checkBox = e.target;
  const projectId = headerName.dataset.id;
  const taskId = e.target.closest(".task").dataset.id;
  const taskDom = document.querySelector(`.task[data-id="${taskId}"]`);

  let projects = getProjectsFromStorage();
  let task = findTask(projects, projectId, taskId);

  // task.completed = checkBox.checked;
  console.log(task);

  changeTaskStatus(task, checkBox.checked);
  if (task.completed) {
    taskDom.classList.add("task-completed");
  } else {
    taskDom.classList.remove("task-completed");
  }

  localStorage.setItem("projects", JSON.stringify(projects));
  populateTasksList(projectId);
}

// function setCheckBoxes() {}
