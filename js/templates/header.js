
import { getCartContent } from "../data/cartStorage.js"

import {
  LogoIcon,
  MenuIcon,
  ShoppingCartIcon,
  SearchIcon,
} from "./svgIcons.js";

export const pageNames = {
  INDEX: "index",
  OUR_JACKETS: "our-jackets",
  JACKET: "jacket",
  ABOUT: "about",
  CONTACT: "contact",
  CHECKOUT: "checkout",
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

const addHeaderForPage = (pageName) =>
  document
    .querySelector("main")
    .insertAdjacentHTML("beforebegin", headerTemplate(pageName, getCartContent()));

const cartWithCircle = (pageName, cartContent, divClass) => /*template*/`
  <div id="nav-shopping-cart" class=${divClass}>
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
      <input
        id="menu-visible"
        type="checkbox"
        class="screen-reader-only desktop-hidden"
      />
      <div>
        <a href="index.html" class="logo-link">
          ${LogoIcon()}
        </a>
        <div class="filler desktop-hidden"></div>
        ${cartWithCircle(pageNames, cartContent, "desktop-hidden")}
        <label class="desktop-hidden" for="menu-visible">
          ${MenuIcon()}
        </label>
      </div>
      <div class="menu">
        <div class="search desktop-hidden">
          <div class="svg-button">
            ${SearchIcon()}
          </div>
          <div class="searchbar input-with-label-wrapper shorter">
            <label for="search-small">Search</label>
            <input type="text" name="search" id="search-small" />
          </div>
        </div>
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

        <div class="searchbar input-with-label-wrapper shorter tablet-hidden">
          <label for="search">Search</label>
          <input type="text" name="search" id="search" />
        </div>

        <div class="svg-button tablet-hidden">
           ${SearchIcon()}
        </div>
        ${cartWithCircle(pageNames, cartContent, "tablet-hidden")}
      </div>
    </nav>
  </header>`;

export default addHeaderForPage;
