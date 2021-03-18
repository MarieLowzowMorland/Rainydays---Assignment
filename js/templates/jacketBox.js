import { ShoppingCartIcon, TriangleUp } from "./svgIcons.js";
import {salePrice, oldPrice} from "../data/products.js";

const saleBanner = (discountPercentage) => {
  if(discountPercentage <= 0){
    return "";
  }

  return /*template*/`
    <div class="sale-banner">
      <div><span>${discountPercentage}% sale</span></div>
      ${TriangleUp()}
    </div>`;
}

const jacketBox = (jacket) => {
  const {id, name, price, discountPercentage, jacketType, colors, imageUrl, imageDescription} = jacket;
  return /*template*/`
    <div class="jacket-box" data-id="${id}" tabindex="0">
      ${saleBanner(discountPercentage)}
      <img src="${imageUrl(colors[0])}" alt="${imageDescription}"/>
      <div class="split-wrapper small-desktop-block">
        <div class="split-50">
          <h2>${name}</h2>
          <p>${jacketType.name}</p>
          <p>${colors[0].name}</p>
          ${salePrice(price, discountPercentage)}
          ${oldPrice(price, discountPercentage)}
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