import addHeaderForPage, { pageNames } from "../templates/header.js";
import addFooterForPage from "../templates/footer.js";
import products from "../data/products.js";
import createCarousel from "../components/jacketCarousel.js";

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

products().then(jackets => {
  const featuredJackets = jackets.filter(jacket => jacket.featured);
  createCarousel(featuredJackets, ".jacket-slider-wrapper");
});