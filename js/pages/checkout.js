import addHeaderForPage, { pageNames } from "../templates/header.js";
import addFooterForPage from "../templates/footer.js";
import addValidationToForm from "../components/formValidation.js"

addHeaderForPage(pageNames.CHECKOUT);
addFooterForPage();
addValidationToForm("purchase-form");
