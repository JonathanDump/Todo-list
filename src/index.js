import "./index.html";
import "./scss/index.scss";

console.log("22");

//function to enable add-btn on create form(call it when input is changing)
function success() {
  if (document.querySelector(".info-wrapper__content").value === "") {
    document.querySelector(".form-btn-wrapper__btn-add-task").disabled = true;
  } else {
    document.querySelector(".form-btn-wrapper__btn-add-task").disabled = false;
  }
}
