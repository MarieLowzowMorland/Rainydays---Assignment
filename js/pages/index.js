import addHeaderForPage, { pageNames } from "../templates/header.js";
import addFooterForPage from "../templates/footer.js";

addHeaderForPage(pageNames.INDEX);
addFooterForPage();

const goToJackets = (gender) => {
  window.location.href = `ourJackets.html?gender=${gender}`;
}

document
  .getElementById("woman-link")
  .addEventListener("click", () => goToJackets("woman"));

document
  .getElementById("man-link")
  .addEventListener("click", () => goToJackets("man"));