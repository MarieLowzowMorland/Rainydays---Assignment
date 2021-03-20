import addHeaderForPage, { pageNames } from "../templates/header.js";
import addFooterForPage from "../templates/footer.js";
import { IconRemove } from "../templates/svgIcons.js";
import addValidationToForm from "../components/formValidation.js";
import {
  getCartContent,
  removeFromCart,
  getSelectionKey,
} from "../data/cartStorage.js";
import { findJacketById } from "../data/products.js";
import { colorOption, sizeOption } from "../templates/jacketBox.js";

addHeaderForPage(pageNames.CHECKOUT);
addFooterForPage();
addValidationToForm("purchase-form");

const jacketActualPrice = (jacket) => {
  if (jacket.discountPercentage > 0) {
    return (jacket.price * (100 - jacket.discountPercentage)) / 100;
  }
  return jacket.price;
};

const cartItem = (selectedJacket) => {
  const {
    selectedColor,
    selectedSize,
    name,
    jacketType,
    colors,
    sizes,
    imageUrl,
    imageDescription,
    selectionKey,
    numberOfJackets
  } = selectedJacket;

  return /*template*/ `
  <li>
    <div id=${selectionKey} class="jacket-chekout-info">
      <button class="remove-jacket">${IconRemove()}</button>
      <div class="one-liner">
        <img
          height="100";
          width="100";
          src=${imageUrl(selectedColor)}
          alt=${imageDescription}
        />
        <h3>${name}${jacketType.icon()}</h3>
      </div>
      <div class="jacket-colors">
        ${colors
          .map((color) => colorOption(selectionKey, color, selectedColor))
          .join("")}
      </div>
      <div class="jacket-sizes">
        ${sizes
          .map((size) => sizeOption(selectionKey, size, selectedSize))
          .join("")}
      </div>
      <div class="price-line">
        <div class="one-liner">
          <button class="circle">-</button>
          <p>${numberOfJackets}</p>
          <button class="circle">+</button>
        </div>
        <p class="bold">NOK ${jacketActualPrice(selectedJacket)},-</p>
      </div>
    </div>
  </li>
`;
};

const cartTotal = (items) => {
  const total = items.map(jacketActualPrice).reduce((a, b) => a + b, 0);

  return `NOK ${total}`;
};

const updateCartInfo = () => {
  const cartContents = getCartContent().map((selectedJacket) => {
    return {
      ...selectedJacket,
      ...findJacketById(selectedJacket.id),
      selectionKey: getSelectionKey(selectedJacket),
    };
  });

  document.getElementById(
    "cart-number-of-items"
  ).innerHTML = `${cartContents.length} items`;

  const totalPrice = cartTotal(cartContents);
  document.getElementById("sum-products").innerHTML = totalPrice;
  document.getElementById("cart-total").innerHTML = totalPrice;
  return cartContents;
};

const cartContents = updateCartInfo();

const groupIdenticalJackets = (jackets) => {
  const allSelectionKeys = jackets.map(jacket => jacket.selectionKey);
  const uniqeSelectionKeys = [...new Set(allSelectionKeys)];
  
  return uniqeSelectionKeys.map(selectionKey => {
    const jacketsWithSelectionKey = jackets
        .filter(jacket => jacket.selectionKey === selectionKey);

    return {...jacketsWithSelectionKey[0], numberOfJackets: jacketsWithSelectionKey.length};
  })
};
// https://www.freecodecamp.org/news/15-useful-javascript-examples-of-map-reduce-and-filter-74cbbb5e0a1f/

groupIdenticalJackets(cartContents).forEach((selectedJacket) => {
  document
    .getElementById("cart-content")
    .insertAdjacentHTML("afterbegin", cartItem(selectedJacket));
});

const keyboardSelectLabel = (event) => {
  event.preventDefault();
  event.stopPropagation();
  if (event.keyCode === 13) {
    const forId = event.target.getAttribute("for");
    if (forId) {
      document.getElementById(forId).click();
    }
  }
};

document
  .querySelectorAll("input[type=radio] + label")
  .forEach((label) => label.addEventListener("keyup", keyboardSelectLabel));

const removeJacket = (event) => {
  const selectionKey = event.target.closest(".jacket-chekout-info").id;
  removeFromCart(selectionKey);
  event.target.closest("li").remove();
  updateCartInfo();
};

document
  .querySelectorAll(".remove-jacket")
  .forEach((remove) => remove.addEventListener("click", removeJacket));
