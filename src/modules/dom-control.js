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

export function getInputValue(e) {
  e.preventDefault();
  const addBtn = projectsSectionWrapper.querySelector(
    ".project-create__btn-add-project"
  );
  if (
    e.target.classList.contains("project-create__btn-add-project") &&
    addBtn.disabled === true
  ) {
    let prjName = projectsSectionWrapper.querySelector(
      "#project-create__name"
    ).value;
    return prjName;
  }
}
