const validateForm = (successDivId) => (event) => {
  event.preventDefault();
  const inputs = [
    ...Array.from(event.target.querySelectorAll("input")), 
    ...Array.from(event.target.querySelectorAll("textarea"))
  ];
  const formIsValid = inputs
      .map(validateInput(successDivId))
      .every(valid => valid);  

  if(formIsValid){
      showSuccessMessage(successDivId);
  } else {
      hideSuccessMessage(successDivId);
  }
}

const showSuccessMessage = (successDivId) => {
  if(successDivId){
    document.getElementById(successDivId).style.display = "block";
  }
}

const hideSuccessMessage = (successDivId) => {
  if(successDivId){
    document.getElementById(successDivId).style.display = "none";
  }
}

const validateInput = (successDivId) => (inputElement) => {
  const {name, value, required, type} = inputElement;
  const minlength = inputElement.getAttribute("data-minlength") || 0;
  
  let errorMessages = [];
  if(required){
      errorMessages.push(validateRequired(value, name));
  }
  if(type === "email"){
      errorMessages.push(validateEmail(value, name));
  }
  if(minlength > 0){
      errorMessages.push(validateMinLength(value, minlength, name));
  }

  const errorMessage = errorMessages.join("")

  document.getElementById(`${name}Error`).innerHTML = errorMessage;
  if (errorMessage === ""){
      inputElement.classList.remove("invalid");
      return true;
  } else {
      inputElement.classList.add("invalid");
      hideSuccessMessage(successDivId);
      return false;
  };
}

const validateRequired = (value, name) => {
  if(!value || value.trim().length === 0){
      return /*template*/`<p>${upperCaseFirst(name)} is required.</p>`
  } else {
      return "";
  }
}

const validateEmail = (value, name) => { 
  const regEx = /\S+@\S+\.\S+/;
  if (regEx.test(value)){
      return "";
  } else {
      return /*template*/`<p>${upperCaseFirst(name)} must contain at least @ and a domain. I.e "test@example.com".</p>`;
  }
}


const upperCaseFirst = (value) => value.charAt(0).toUpperCase() + value.substr(1);

const validateInputEventHandler = (successDivId) => (event) => {
  validateInput(successDivId)(event.target);
}

const addValidationToForm = (formId, successDivId) => {
  const form = document.getElementById(formId);
  const inputs = [
    ...form.querySelectorAll("input"), 
    ...form.querySelectorAll("textarea")
  ]

  form.addEventListener("submit", validateForm(successDivId));
  inputs.forEach(input => input.addEventListener("input", validateInputEventHandler(successDivId)));
}

export default addValidationToForm;