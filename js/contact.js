
const validateForm = (event) => {
    event.preventDefault();
    const inputs = [
      ...Array.from(event.target.querySelectorAll("input")), 
      ...Array.from(event.target.querySelectorAll("textarea"))
    ];
    const formIsValid = inputs
        .map(validateInput)
        .every(valid => valid);  

    if(formIsValid){
        showSuccessMessage();
    } else {
        hideSuccessMessage();
    }
}

const showSuccessMessage = () => {
    document.getElementById("success-message").style.display = "block";
}

const hideSuccessMessage = () => {
    document.getElementById("success-message").style.display = "none";
}

const validateInput = (inputElement) => {
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
        hideSuccessMessage();
        return false;
    };
}

const validateRequired = (value, name) => {
    if(!value || value.trim().length === 0){
        return `<p>${upperCaseFirst(name)} is required.</p>`
    } else {
        return "";
    }
}

const validateEmail = (value, name) => { 
    const regEx = /\S+@\S+\.\S+/;
    if (regEx.test(value)){
        return "";
    } else {
        return `<p>${upperCaseFirst(name)} must contain at least @ and a domain. I.e "test@example.com".</p>`;
    }
 }


const upperCaseFirst = (value) => value.charAt(0).toUpperCase() + value.substr(1);

const validateInputEventHandler = (event) => {
    validateInput(event.target);
}

const form = document.getElementById("contact-form");
form.addEventListener("submit", validateForm);
[
  ...form.querySelectorAll("input"), 
  ...form.querySelectorAll("textarea")
].forEach(input => input.addEventListener("input", validateInputEventHandler));
