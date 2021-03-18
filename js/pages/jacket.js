import addHeaderForPage, { pageNames } from "../templates/header.js";
import addFooterForPage from "../templates/footer.js";
import { findJacketById } from "../data/products.js";
import { addToCart } from "../data/cartStorage.js";
import { IconColor, ShoppingCartIcon } from "../templates/svgIcons.js";

addHeaderForPage(pageNames.JACKET);
addFooterForPage();

const jacketId = new URLSearchParams(location.search).get("id");
const jacket = findJacketById(jacketId);
let selectedColor = jacket.colors[0];
let selectedSize = jacket.sizes[0];

const newSelectedColor = (colorId) => {
  const color = jacket.colors.find(color => color.id === colorId);
  selectedColor = color;
  document.querySelector(".image-wrapper img").src = jacket.imageUrl(color); 
};

const colorChange = (event) => {
  event.preventDefault();
  event.stopPropagation();
  const { checked, value } = event.target;
  if( checked ) {
    newSelectedColor(value);
  }
}

const colorOption = (color) => {
  const { id, name, hex} = color;
  let checkedAttribute = "";
  if(color ===  selectedColor){
    checkedAttribute = 'checked="checked"'
  }
  return /*template*/` 
    <div class="color-option">
      <input
        class="screen-reader-only"
        id=${id}
        type="radio"
        name="color"
        value=${id}
        ${checkedAttribute}
      />
      <label for="${id}" tabindex="0">
        ${IconColor(hex)}
        <span>${name}</span>
      </label>
    </div>`;
}

const newSelectedSize = (sizeId) => {
  const size = jacket.sizes.find(size => size === sizeId);
  selectedSize = size; 
};

const sizeChange = (event) => {
  event.preventDefault();
  event.stopPropagation();
  const { checked, value } = event.target;
  if( checked ) {
    newSelectedSize(value);
  }
};

const sizeOption = (size) => {
  let checkedAttribute = "";
  if(size === selectedSize){
    checkedAttribute = 'checked="checked"'
  }
  return /*template*/` 
  <input
  class="screen-reader-only"
  id= ${size}
  type="radio"
  name="size"
  value=${size}
  ${checkedAttribute}
/>
<label for=${size} tabindex="0">${size}</label>`
};

const jacketDescription = (jacket) => {
  const {id, name, price, discountPercentage, jacketType, colors, imageUrl, imageDescription, propities, sizes, genders} = jacket;
  return /*template*/`
    <section class="split-wrapper tablet-block">
      <div class="split-50 image-wrapper">
        <img src="${imageUrl(colors[0])}" alt="${imageDescription}" />
      </div>
      <div class="split-50">
        <h2>
          ${name}
          ${jacketType.icon()}
        </h2>
      
        <p>Product information</p>
        <p>
          Lorem ipsumNequi omnit quasit eost aut fugit ut estium susam
          fuga. Ficaepe liatque porepera dolorporum que del et est et que
          et anis cum nos volorpor aut a doluptatem dolupta temqui aut
          demolup tibuscitem.
        </p>
        <a>Read more >></a>
      
        <form id="jacket-form">
          <fieldset class="only-content">
            <p>Color:</p>
            <div class="jacket-colors">
              ${colors.map(colorOption).join("")}
            </div>
          </fieldset>
          <fieldset class="only-content">
            <p>Size:</p>
            <div class="jacket-sizes">
              ${sizes.map(sizeOption).join("")}
            </div>
          </fieldset>
      
          <button for="shopping-cart-visible" class="add-to-cart-button">
            <span>Add to cart</span>
            <span class="cart-wrapper">
              <span class="cart-background-color point-down"></span>
              ${ShoppingCartIcon()}
            </span>
          </button>
        </form>
      </div>
    </section>`;
};

const jacketPage = document.querySelector(".grey-card");
jacketPage.insertAdjacentHTML("afterbegin", jacketDescription(jacket));

document.querySelectorAll("main .jacket-colors input")
  .forEach(colorOption => colorOption.addEventListener("change", colorChange));

document.querySelectorAll("main .jacket-sizes input")
  .forEach(sizeOption => sizeOption.addEventListener("change", sizeChange));

const keyboardSelectLabel = (event) => {
  event.preventDefault();
  event.stopPropagation();
  if (event.keyCode === 13) {
    const forId = event.target.getAttribute("for");
    if(forId){
      document.getElementById(forId).click();
    }
  }
};

const form = document.getElementById("jacket-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  event.stopPropagation();
  addToCart(jacketId, selectedColor, selectedSize);
});

document.querySelectorAll("input[type=radio] + label")
  .forEach(label => label.addEventListener("keyup", keyboardSelectLabel));