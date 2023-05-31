import trashIcon from "/src/icons/trash-icon.svg";
import editIcon from "/src/icons/edit-icon.svg";
import moreIcon from "/src/icons/more-icon.svg";
import { getProjectsFromStorage } from "./storage-control";

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

export function openCreateProjectForm() {
  projectsSectionWrapper.classList.add("list-btn-active");
  projectCreateForm.classList.remove("prj-create-form-disable");
}

export function closeCreateProjectForm() {
  projectCreateForm.classList.add("prj-create-form-disable");
  projectsSectionWrapper.classList.remove("list-btn-active");
  projectInputName.value = "";
}

//function to enable add-btn on create form(call it when input is changing)
function btnSuccess(input, button) {
  button.disabled = !input.value;
}

export function checkInput() {
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
