import addHeaderForPage, { pageNames } from "../templates/header.js";
import addFooterForPage from "../templates/footer.js";
import jacketBox from "../templates/jacketBox.js";
import { addToCart } from "../data/cartStorage.js";
import products from "../data/products.js";

addHeaderForPage(pageNames.OUR_JACKETS);
addFooterForPage();

const jacketContainger = document.querySelector(".jacket-container");
products.forEach(jacket =>
  jacketContainger.insertAdjacentHTML("afterbegin", jacketBox(jacket))
)

document.querySelectorAll(".add-to-cart-button")
  .forEach(button => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const box = event.target.closest(".jacket-box");
      addToCart(box.getAttribute("data-id"));
    });
  })

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