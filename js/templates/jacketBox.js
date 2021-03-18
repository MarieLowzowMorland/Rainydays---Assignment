import { ShoppingCartIcon } from "./svgIcons.js";

const jacketBox = (jacket) => {
  const {id, name, price, discountPercentage, jacketType, colors, imageUrl, imageDescription} = jacket;
  return /*template*/`
    <div class="jacket-box" data-id="${id}" tabindex="0">
      <img src="${imageUrl(colors[0])}" alt="${imageDescription}"/>
      <div class="split-wrapper small-desktop-block">
        <div class="split-50">
          <h2>${name}</h2>
          <p>${jacketType}</p>
          <p>${colors[0].name}</p>
          <p class="price">NOK ${price * (100 - discountPercentage)/100}</p>
        </div>
        <div class="split-50">
          <button class="add-to-cart-button">
            <span>Buy</span>
            <span class="cart-wrapper">
              <span class="cart-background-color point-down"></span>
              ${ShoppingCartIcon()}
            </span>
          </button>
        </div>
      </div>
    </div>`;
};

export default jacketBox;