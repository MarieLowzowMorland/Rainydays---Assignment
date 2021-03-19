import addHeaderForPage, { pageNames } from "../templates/header.js";
import addFooterForPage from "../templates/footer.js";
import jacketBox from "../templates/jacketBox.js";
import products from "../data/products.js";

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

const jacketContainger = document.querySelector(".jacket-slider");
products.forEach(jacket =>
  jacketContainger.insertAdjacentHTML("afterbegin", jacketBox(jacket, "h3"))
)

const goToJacketPage = (event) => {
  event.preventDefault();
  event.stopPropagation();
  const box = event.target.closest(".jacket-box");
  const id = box.getAttribute("data-id");
  window.location.href = `jacket.html?id=${id}`;
};

document.querySelectorAll(".jacket-box")
  .forEach(jacketBox => {
    jacketBox.addEventListener("click", goToJacketPage);
    jacketBox.addEventListener("keyup", (event) => {
      if (event.keyCode === 13) {
        goToJacketPage(event);
      }
    });
  })