import addHeaderForPage, { pageNames } from "../templates/header.js";
import addValidationToForm from "../components/formValidation.js";
import addFooterForPage from "../templates/footer.js";

addHeaderForPage(pageNames.CONTACT);
addValidationToForm("contact-form", "Thank you for your message. Have a nice day.");
addFooterForPage();
