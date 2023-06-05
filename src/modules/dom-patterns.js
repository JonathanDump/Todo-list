export const addTodoButtonModule = `
              <button class="add-todo-btn">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="9"
                    cy="9"
                    r="9"
                    fill="#1C1D22"
                    fill-opacity="0.08"
                  />
                  <g opacity="0.4">
                    <path
                      d="M12 9H6"
                      stroke="#1C1D22"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M9 12L9 6"
                      stroke="#1C1D22"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </g>
                </svg>
                Add task
              </button>`;

export const renameWrapperModule = `<div class="rename-wrapper">
  <form action="" class="rename-form">
    <div class="rename-form__input-wrapper">
      <input autoFocus type="text" placeholder="New name" required id="rename-form__input"/>
    </div>
    <div class="rename-form__btn-wrapper">
      <button
        type="button"
        class="rename-form__btn cancel"
        id="rename-form__btn-cancel"
      >
        Cancel
      </button>
      <button
        class="rename-form__btn apply"
        id="rename-form__btn-apply"
        type="button"
      >
        Apply
      </button>
    </div>
  </form>
</div>`;

export const taskCreateFormModule = `<div class="task-create">
  <form action="">
    <div class="info-wrapper">
      <div class="info-wrapper__content">
        <div  contenteditable="true"
          id="input-content"
          placeholder="Task name"
          
        ></div>
      </div>
      <div class="info-wrapper__description">
        <div  contenteditable="true"
          id="input-description"
          placeholder="Description"
          
        ></div>
      </div>
      <div class="info-wrapper__additional">
        <input type="date" name="date" id="date" />
        <select name="priority" id="priority">
          <option data-priority="1" value="1">Priority 1</option>
          <option data-priority="2" value="2">Priority 2</option>
          <option data-priority="3" selected="selected" value="3">Priority 3</option>
        </select>
      </div>
    </div>
    <div class="form-btn-wrapper">
      <button type="button" class="form-btn-wrapper__btn-cancel">Cancel</button>
      <button type="button" class="form-btn-wrapper__btn-add-task" disabled>Add task</button>
    </div>
  </form>
</div>`;

// export const taskModule = `<div class="task task-priority${task.taskPriority}" data-id="${task.taskId}">
//   <div class="task-checkbox-wrapper">
//     <input type="checkbox" id="task-checkbox" name="task"/>
//     </div>
//   <div class="task__text-wrapper">
//     <div class="task__content">${task.taskName}</div>
//     <div class="task__description">${task.taskDescription}</div>
//   </div>
// </div>`;

// export const taskCompletedModule = `<div class="task task-priority${task.taskPriority}" data-id="${task.taskId}">
//   <div class="task-checkbox-wrapper">
//     <input type="checkbox" id="task-checkbox" name="task" checked/>
//     </div>
//   <div class="task__text-wrapper">
//     <div class="task__content">${task.taskName}</div>
//     <div class="task__description">${task.taskDescription}</div>
//   </div>
// </div>`;
