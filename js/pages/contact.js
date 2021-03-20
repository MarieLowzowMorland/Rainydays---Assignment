import addHeaderForPage, { pageNames } from "../templates/header.js";
import addValidationToForm, { addSuccessMessage } from "../components/formValidation.js";
import addFooterForPage from "../templates/footer.js";

addHeaderForPage(pageNames.CONTACT);
addValidationToForm("contact-form", () => addSuccessMessage("Thank you for your message. Have a nice day."));
addFooterForPage();
