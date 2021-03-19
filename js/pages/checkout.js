import addHeaderForPage, { pageNames } from "../templates/header.js";
import addFooterForPage from "../templates/footer.js";
import addValidationToForm from "../components/formValidation.js"
import { getCartContent } from "../data/cartStorage.js"
import { findJacketById } from "../data/products.js";
import { colorOption, sizeOption} from "../templates/jacketBox.js";

addHeaderForPage(pageNames.CHECKOUT);
addFooterForPage();
addValidationToForm("purchase-form");

const jacketActualPrice = (jacket) => {
  if(jacket.discountPercentage > 0){
    return jacket.price * (100 - jacket.discountPercentage)/100;
  }
  return jacket.price;
}

const cartItem = (selectedJacket, i) => {
  const {
    id, 
    selectedColor, 
    selectedSize, 
    name, 
    jacketType, 
    colors, 
    sizes, 
    imageUrl, 
    imageDescription 
  } = selectedJacket;
  const htmlId = `checkout-jacket-${id}-${i}`;

  return /*template*/`
  <li>
    <div id=${htmlId} class="jacket-chekout-info">
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
        ${colors.map(color => colorOption(htmlId, color, selectedColor)).join("")}
      </div>
      <div class="jacket-sizes">
        ${sizes.map(size => sizeOption(htmlId, size, selectedSize)).join("")}
      </div>
      <div class="price-line">
        <div class="one-liner">
          <button class="circle">-</button>
          <p>1</p>
          <button class="circle">+</button>
        </div>
        <p class="bold">NOK ${jacketActualPrice(selectedJacket)},-</p>
      </div>
    </div>
  </li>
`
}

const cartTotal = (items) => {
  console.log(items)
  const total = items
    .map(jacketActualPrice)
    .reduce((a, b) => a + b, 0);

  return `NOK ${total}`;
}

const cartContents = getCartContent()
  .map(selectedJacket => { 
    return {...selectedJacket, ...findJacketById(selectedJacket.id)};
  });

document.getElementById("cart-number-of-items").insertAdjacentHTML("afterbegin", `${cartContents.length} items`);

const totalPrice = cartTotal(cartContents);
document.getElementById("sum-products").insertAdjacentHTML("afterbegin", totalPrice);
document.getElementById("cart-total").insertAdjacentHTML("afterbegin", totalPrice);

cartContents
  .forEach((selectedJacket, i) => {
    document.getElementById("cart-content")
    .insertAdjacentHTML("afterbegin", cartItem(selectedJacket, i))
  });

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

document.querySelectorAll("input[type=radio] + label")
  .forEach(label => label.addEventListener("keyup", keyboardSelectLabel));