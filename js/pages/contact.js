import { addHeaderForPage, pageNames } from "../templates/header.js";
import addValidationToForm from "../components/formValidation.js";

addHeaderForPage(pageNames.CONTACT);
addValidationToForm("contact-form");
