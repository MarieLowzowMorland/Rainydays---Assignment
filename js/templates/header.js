
import { getCartContent } from "../data/cartStorage.js"

import {
  LogoIcon,
  MenuIcon,
  ShoppingCartIcon,
} from "./svgIcons.js";

export const pageNames = {
  INDEX: "index",
  OUR_JACKETS: "ourJackets",
  JACKET: "jacket",
  ABOUT: "about",
  CONTACT: "contact",
  CHECKOUT: "checkout",
  ORDER_CONFIRMATION: "orderConfirmation",
  PRIVACY: "privacy",
  TERMS: "terms",
  MAGAZINE: "magazine",
};

const cartCircleVisiblityClass = (numberOfItems) => {
  if(numberOfItems <= 0){
    return "";
  }
  return "visible";
}

export const updateCartNumber = () => {
  const numberOfItems = getCartContent().length;
  document.querySelectorAll(".cart-circle")
    .forEach(circle => {
      circle.classList.remove("visible");

      const newClass = cartCircleVisiblityClass(numberOfItems);
      if(newClass){
        circle.classList.add(newClass);
      }

      circle.innerHTML = `<p>${numberOfItems}</p>`;
    });
}

const addHeaderForPage = (pageName) => {  
  document
    .querySelector("main")
    .insertAdjacentHTML("beforebegin", headerTemplate(pageName, getCartContent()));

  document  
    .getElementById("hamburger-menu")
    .addEventListener("click", () => {
      const menu = document.querySelector("nav .menu");
      menu.classList.toggle("visible");
    });
}

const cartWithCircle = (pageName, cartContent, divClass) => /*template*/`
  <div class="nav-shopping-cart ${divClass}">
    <a href="checkout.html" class="svg-button ${
      pageName === pageNames.CHECKOUT ? "active" : ""
    }"> ${ShoppingCartIcon()} </a>
    <div class="cart-circle ${cartCircleVisiblityClass(cartContent.length)}">
      <p>${cartContent.length}</p>
    </div>
  </div>
`;

const headerTemplate = (pageName, cartContent) => /*template*/ `
  <header>
    <nav>
      <div>
        <a href="index.html" class="logo-link">
          ${LogoIcon()}
        </a>
        <div class="filler desktop-hidden"></div>
        ${cartWithCircle(pageNames, cartContent, "desktop-hidden")}
        <button id="hamburger-menu" class="desktop-hidden svg-button">
          ${MenuIcon()}
        </button>
      </div>
      <div class="menu">
        <ul>
          <li><a href="ourJackets.html" class="${
            pageName === pageNames.OUR_JACKETS ? "active" : ""
          }">Our Jackets</a></li>
          <li><a href="about.html" class="${
            pageName === pageNames.ABOUT ? "active" : ""
          }">About</a></li>
          <li><a href="contact.html" class="${
            pageName === pageNames.CONTACT ? "active" : ""
          }">Contact</a></li>
        </ul>
        <div class="filler"></div>

        ${cartWithCircle(pageNames, cartContent, "tablet-hidden")}
      </div>
    </nav>
  </header>`;
      

export default addHeaderForPage;
