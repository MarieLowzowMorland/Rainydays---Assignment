import { ShoppingCartIcon, TriangleUp } from "./svgIcons.js";
import { IconColor } from "../templates/svgIcons.js";
import {salePrice, oldPrice} from "../data/products.js";

export const colorOption = (jacketId, color, selectedColor) => {
  const { id, name, hex} = color;
  const colorInputId = `${jacketId}-${id}`;
  const colorInputName = `${jacketId}-color`;
  let checkedAttribute = "";
  if(id ===  selectedColor.id){
    checkedAttribute = 'checked="checked"'
  }
  return /*template*/` 
    <div class="color-option">
      <input
        class="screen-reader-only"
        id=${colorInputId}
        type="radio"
        name=${colorInputName}
        value=${id}
        ${checkedAttribute}
      />
      <label for="${colorInputId}" tabindex="0">
        ${IconColor(hex)}
        <span>${name}</span>
      </label>
    </div>`;
}

export const sizeOption = (jacketId, size, selectedSize) => {
  let checkedAttribute = "";
  const sizeInputId = `${jacketId}-${size}`;
  const sizeInputName = `${jacketId}-size`;
  if(size === selectedSize){
    checkedAttribute = 'checked="checked"'
  }
  return /*template*/` 
  <input
  class="screen-reader-only"
  id= ${sizeInputId}
  type="radio"
  name=${sizeInputName}
  value=${size}
  ${checkedAttribute}
/>
<label for=${sizeInputId} tabindex="0">${size}</label>`
};

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