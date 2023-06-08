import trashIcon from "/src/icons/trash-icon.svg";
import editIcon from "/src/icons/edit-icon.svg";
import moreIcon from "/src/icons/more-icon.svg";
import dueDateIcon from "/src/icons/due-date.svg";
import { compareAsc, format } from "date-fns";
import { getProjectsFromStorage } from "./storage-control";
import {
  findProject,
  pushTaskToProject,
  removeTaskFromProject,
  renameProject,
  superSort,
} from "./project-control";
import { editTask, findTask, initialCreateTask } from "./task-create";
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
export const headerName = document.querySelector(".name__text");
export const tasksList = document.querySelector(".tasks");
export const addTodoButton = document.querySelector(".add-todo-btn-wrapper");
export const tasksListCompleted = document.querySelector(".tasks.completed");
export const taskOverviewWindow = document.querySelector(
  ".task-overview-window"
);
export const overviewProjectsSelect =
  document.querySelector("#overview-projects");
export const overviewDueDate = document.querySelector("#overview-date");
export const overviewPriority = document.querySelector("#overview-priority");

const overviewHeader = document.querySelector(
  ".task-overview-header__project-name"
);
const overviewTaskName = document.querySelector(
  ".task-overview-content-wrapper__name"
);

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

export function populateTasksList(projectId) {
  addTodoButton.classList.remove("add-todo-btn-disable");
  const projects = getProjectsFromStorage();
  const project = projects.find((project) => project._prjId === projectId);

  const sortedTasks = project._prjTasks.sort(
    superSort.bind({ field: "taskPriority" })
  );

  tasksList.innerHTML = "";
  tasksListCompleted.innerHTML = "";
  let dueDate = "-";
  sortedTasks.forEach((task) => {
    if (task.taskDueDate) {
      dueDate = format(new Date(task.taskDueDate), "dd MMM yyyy");
    }

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
  ${dueDate}
  </div>
  </div>
</div>`;

      const taskDom = document.querySelector(
        `.task[data-id="${task.taskId}"] .task__content`
      );
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
  ${dueDate}
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

  const taskPriority = parseInt($qs("#priority").value);
  const projects = getProjectsFromStorage();
  const project = projects.find((project) => project.getPrjId() === projectId);

  project.addTask(
    initialCreateTask({ taskName, taskDescription, taskDueDate, taskPriority })
  );

  localStorage.setItem("projects", JSON.stringify(projects));

  populateTasksList(projectId);
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
    return;
  }

  if (!e.target.closest(".task__checkbox-wrapper")) {
    return;
  }

  const checkBox = e.target;
  const projectId = headerName.dataset.id;
  const taskId = e.target.closest(".task").dataset.id;
  const taskDom = document.querySelector(
    `.task[data-id="${taskId}"] .task__content`
  );

  let projects = getProjectsFromStorage();
  let task = findTask(projects, projectId, taskId);

  editTask(task, { completed: checkBox.checked });
  if (task.completed) {
    taskDom.classList.add("task-completed");
  } else {
    taskDom.classList.remove("task-completed");
  }

  localStorage.setItem("projects", JSON.stringify(projects));
  populateTasksList(projectId);
}

export function openTaskOverview(e) {
  if (!e.target.closest(".task") || e.target.id === "task-checkbox") {
    return;
  }
  const taskOverview = $qs(".task-overview-bg");
  taskOverview.classList.add("task-overview-active");

  const projectId = headerName.dataset.id;
  const taskId = e.target.closest(".task").dataset.id;
  const projects = getProjectsFromStorage();
  const task = findTask(projects, projectId, taskId);

  setTimeout(toggleWindowAnimation, 50);

  loadTaskOverview(task, headerName.textContent, projectId);

  e.stopPropagation();
}

export function toggleWindowAnimation() {
  const taskOverviewWindow = $qs(".task-overview-window");
  taskOverviewWindow.classList.toggle("task-overview-window-visible");
}

export function loadTaskOverview(task, projectName, projectId) {
  const overviewHeader = $qs(".task-overview-header__project-name");
  const overviewCheckbox = $qs("#task-detail-wrapper__checkbox");
  const overviewTaskName = $qs(".task-overview-content-wrapper__name");
  const overviewTaskDescription = $qs(
    ".task-overview-content-wrapper__description"
  );

  const taskDetailWrapper = $qs(".task-detail-wrapper");

  taskDetailWrapper.classList = "";

  taskDetailWrapper.classList.add("task-detail-wrapper");
  taskDetailWrapper.classList.add(`task-priority${task.taskPriority}`);

  overviewHeader.textContent = projectName;
  overviewHeader.dataset.id = projectId;

  overviewCheckbox.checked = task.completed;
  if (overviewCheckbox.checked) {
    overviewTaskName.classList.add("task-completed");
  } else {
    overviewTaskName.classList.remove("task-completed");
  }
  overviewTaskName.textContent = task.taskName;
  overviewTaskName.dataset.id = task.taskId;

  overviewTaskDescription.textContent = task.taskDescription;

  overviewProjectsSelect.innerHTML = "";
  const projects = getProjectsFromStorage();
  projects.forEach((project) => {
    overviewProjectsSelect.innerHTML += `
     <option value="${project._prjId}">${project._prjName.slice(
      0,
      15
    )}</option>`;
  });
  overviewProjectsSelect.value = projectId;
  overviewDueDate.value = task.taskDueDate;
  overviewPriority.value = task.taskPriority;
}

export function enableEdit(e) {
  const overviewHeader = $qs(".task-overview-header__project-name");
  const overviewTaskName = $qs(".task-overview-content-wrapper__name");
  const overviewTaskDescription = $qs(
    ".task-overview-content-wrapper__description"
  );
  const buttonsWrapper = $qs(".task-overview-buttons-wrapper");
  const taskDetailWrapper = $qs(".task-detail-wrapper");

  const projectName = overviewHeader.textContent;
  const projectId = overviewHeader.dataset.id;
  const taskId = overviewTaskName.dataset.id;

  const projects = getProjectsFromStorage();
  const task = findTask(projects, projectId, taskId);

  const inputsData = [...document.querySelectorAll('[data-input="data"')];

  if (e.target.id === "task-detail-wrapper__checkbox") {
    const checkbox = $qs("#task-detail-wrapper__checkbox");

    editTask(task, { completed: checkbox.checked });

    loadTaskOverview(task, projectName, projectId);

    localStorage.setItem("projects", JSON.stringify(projects));
  }

  if (e.target.closest(".task-overview-content-wrapper")) {
    const overviewTaskDescription = $qs(
      ".task-overview-content-wrapper__description"
    );

    buttonsWrapper.classList.add("task-overview-buttons-active");
    overviewTaskName.contentEditable = true;
    overviewTaskDescription.contentEditable = true;
    inputsData.forEach((input) => {
      input.setAttribute("disabled", true);
      input.classList.add("disabled-input-data");
    });
    taskDetailWrapper.classList.add("task-edit-active");

    if (e.target === overviewTaskName || e.target === overviewTaskDescription) {
      e.target.focus();
    }
  }

  if (e.target.classList.contains("task-overview-buttons-wrapper__cancel")) {
    enableInputs();
    buttonsWrapper.classList.remove("task-overview-buttons-active");
  }

  if (e.target.classList.contains("task-overview-buttons-wrapper__apply")) {
    const newName = overviewTaskName.textContent;
    const newDescription = overviewTaskDescription.textContent;

    editTask(task, { taskName: newName, taskDescription: newDescription });
    enableInputs();

    buttonsWrapper.classList.remove("task-overview-buttons-active");

    localStorage.setItem("projects", JSON.stringify(projects));
  }
}
export function enableInputs() {
  const buttonsWrapper = $qs(".task-overview-buttons-wrapper");
  const taskDetailWrapper = $qs(".task-detail-wrapper");
  const inputsData = [...document.querySelectorAll('[data-input="data"')];
  inputsData.forEach((input) => {
    input.removeAttribute("disabled");
    input.classList.remove("disabled-input-data");
    taskDetailWrapper.classList.remove("task-edit-active");
  });
  buttonsWrapper.classList.remove("task-overview-buttons-active");
}

export function changeOverviewPriority(e) {
  const projects = getProjectsFromStorage();
  const projectId = overviewHeader.dataset.id;
  const taskId = overviewTaskName.dataset.id;
  const task = findTask(projects, projectId, taskId);
  const taskPriority = +overviewPriority.value;

  editTask(task, { taskPriority });

  localStorage.setItem("projects", JSON.stringify(projects));
  loadTaskOverview(task, headerName.textContent, projectId);
}

export function changeOverviewDueDate(e) {
  const projects = getProjectsFromStorage();
  const projectId = overviewHeader.dataset.id;
  const taskId = overviewTaskName.dataset.id;
  const taskDueDate = overviewDueDate.value;
  const task = findTask(projects, projectId, taskId);

  editTask(task, { taskDueDate });
  localStorage.setItem("projects", JSON.stringify(projects));
  loadTaskOverview(task, headerName.textContent, projectId);
}

export function changeOverviewProject(e) {
  const projects = getProjectsFromStorage();

  const projectId = overviewHeader.dataset.id;
  const taskId = overviewTaskName.dataset.id;
  const task = findTask(projects, projectId, taskId);
  const newProjectId = overviewProjectsSelect.value;
  const project = findProject(projects, newProjectId);

  removeTaskFromProject(projects, projectId, task);

  pushTaskToProject(projects, newProjectId, task);
  localStorage.setItem("projects", JSON.stringify(projects));
  loadTaskOverview(task, project._prjName, newProjectId);
}
