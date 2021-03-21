import addHeaderForPage, { pageNames } from "../templates/header.js";
import addFooterForPage from "../templates/footer.js";
import jacketBox from "../templates/jacketBox.js";
import products from "../data/products.js";

addHeaderForPage(pageNames.OUR_JACKETS);
addFooterForPage();

const jacketContainger = document.querySelector(".jacket-container");
products.forEach(jacket =>
  jacketContainger.insertAdjacentHTML("afterbegin", jacketBox(jacket))
)

const toggleMenu = (event) => {
  document.getElementById("filter-menu-wrapper").classList.toggle("visible");
} 

document.getElementById("toggle-menu").addEventListener("click", toggleMenu);