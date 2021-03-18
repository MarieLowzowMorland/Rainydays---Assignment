import { ShoppingCartIcon } from "./svgIcons.js";

const saleBanner = (discountPercentage) => {
  if(discountPercentage <= 0){
    return "";
  }

  return /*template*/`
    <div class="sale-banner">
      <div><span>${discountPercentage}% sale</span></div>
      <svg xmlns="http://www.w3.org/2000/svg" width="717" height="621" viewBox="0 0 717 621">
        <path  data-name="Polygon 10" d="M358.5,0,717,621H0Z" fill="#3a4754"/>
      </svg>
    </div>`;
};

const salePrice = (price, discountPercentage) => {
  if(discountPercentage <= 0){
    return /*template*/`<p class="price">NOK ${price}</p>`;
  }

  return /*template*/`<p class="price sale">NOK ${price * (100 - discountPercentage)/100}</p>`;
};

const oldPrice = (price, discountPercentage) => {
  if(discountPercentage <= 0){
    return /*template*/`<div class="price-filler"></div>`;
  }

  return /*template*/`<p class="price strike-through">NOK ${price}</p>`;
};

const jacketBox = (jacket) => {
  const {id, name, price, discountPercentage, jacketType, colors, imageUrl, imageDescription} = jacket;
  return /*template*/`
    <div class="jacket-box" data-id="${id}" tabindex="0">
      ${saleBanner(discountPercentage)}
      <img src="${imageUrl(colors[0])}" alt="${imageDescription}"/>
      <div class="split-wrapper small-desktop-block">
        <div class="split-50">
          <h2>${name}</h2>
          <p>${jacketType}</p>
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