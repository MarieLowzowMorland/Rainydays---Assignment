import addHeaderForPage, { pageNames } from "../templates/header.js";
import addFooterForPage from "../templates/footer.js";
import { IconRemove } from "../templates/svgIcons.js";
import addValidationToForm from "../components/formValidation.js";
import {
  getCartContent,
  removeFromCart,
  getSelectionKey,
  addToCart,
  setCartContent,
  emptyCart
} from "../data/cartStorage.js";
import { findJacketById } from "../data/products.js";

addHeaderForPage(pageNames.CHECKOUT);
addFooterForPage();
addValidationToForm(
  "purchase-form",
  () => {
    emptyCart();
    window.location.href = `${pageNames.ORDER_CONFIRMATION}.html`;
  }
);

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
    imageUrl,
    imageDescription,
    selectionKey,
    numberOfJackets,
  } = selectedJacket;

  return /*template*/ `
  <li>
    <div id="${selectionKey}" class="jacket-chekout-info">
      <button id="${selectionKey}-remove" class="remove-jacket" aria-label="remove">${IconRemove()}</button>
      <div class="one-liner">
        <img
          height="100"
          width="100"
          src="${imageUrl(selectedColor)}"
          alt="${imageDescription}"
        />
        <h3>${name}${jacketType.icon()}</h3>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Color:</th>
            <td>${selectedColor.name}</td>
          </tr>
          <tr>
            <th>Size:</th>
            <td>${selectedSize}</td>
          </tr>
        </tbody>
      </table>
      <div class="price-line">
        <div class="one-liner">
          <button class="circle remove-item">-</button>
          <p class="item-number" id="${selectionKey}-number">${numberOfJackets}</p>
          <button class="circle add-item">+</button>
        </div>
        <p id="${selectionKey}-price"  class="bold">NOK ${
    numberOfJackets * jacketActualPrice(selectedJacket)
  },-</p>
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
  const allSelectionKeys = jackets.map((jacket) => jacket.selectionKey);
  const uniqeSelectionKeys = [...new Set(allSelectionKeys)];

  return uniqeSelectionKeys.map((selectionKey) => {
    const jacketsWithSelectionKey = jackets.filter(
      (jacket) => jacket.selectionKey === selectionKey
    );

    return {
      ...jacketsWithSelectionKey[0],
      numberOfJackets: jacketsWithSelectionKey.length,
    };
  });
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

const numberOfIdenticalJackets = (allJackets, selectionKey) => {
  return allJackets.map(getSelectionKey).filter((key) => key === selectionKey)
    .length;
};

const rerenderCart = (selectionKey) => {
  const newContents = updateCartInfo();
  const numberOfJackets = numberOfIdenticalJackets(newContents, selectionKey);
  const jacket = newContents.find(
    (jacket) => jacket.selectionKey === selectionKey
  );
  document.getElementById(`${selectionKey}-price`).innerHTML = `NOK ${
    numberOfJackets * jacketActualPrice(jacket)
  },-`;
  document.getElementById(`${selectionKey}-number`).innerHTML = numberOfJackets;
};

const addItem = (event) => {
  const selectionKey = event.target.closest(".jacket-chekout-info").id;
  const jacket = cartContents.find(
    (jacket) => jacket.selectionKey === selectionKey
  );
  const { id, selectedColor, selectedSize, selectedGender } = jacket;
  addToCart(id, selectedColor, selectedSize, selectedGender);
  rerenderCart(selectionKey);
};

document
  .querySelectorAll(".add-item")
  .forEach((remove) => remove.addEventListener("click", addItem));

const cartWithSelectedKey = () =>
  getCartContent().map((selectedJacket) => {
    return {
      ...selectedJacket,
      selectionKey: getSelectionKey(selectedJacket),
    };
  });

const removeItem = (event) => {
  const currentContents = cartWithSelectedKey();
  const selectionKey = event.target.closest(".jacket-chekout-info").id;
  const matchingJackets = currentContents.filter(
    (jacket) => jacket.selectionKey === selectionKey
  );
  const numberOfMatchingJackets = matchingJackets.length;
  if (numberOfMatchingJackets === 1) {
    document.getElementById(`${selectionKey}-remove`).click();
    return;
  }

  matchingJackets.pop();
  const otherJackets = currentContents.filter(
    (jacket) => jacket.selectionKey !== selectionKey
  );
  const newCart = [...matchingJackets, ...otherJackets];
  setCartContent(newCart);
  rerenderCart(selectionKey);
};

document
  .querySelectorAll(".remove-item")
  .forEach((remove) => remove.addEventListener("click", removeItem));
