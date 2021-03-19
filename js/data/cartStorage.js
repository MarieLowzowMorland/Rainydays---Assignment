import { findJacketById } from "../data/products.js";
import { updateCartNumber } from "../templates/header.js";

export const getCartContent = () => JSON.parse(window.localStorage.getItem("cart") || "[]");

const setCartContent = (content) => window.localStorage.setItem("cart", JSON.stringify(content));

export const addToCart = (jacketId, color, size, gender) => {
  const { id, colors, genders, sizes } = findJacketById(jacketId);
  const cartItem = {
    id,
    selectedColor: color || colors[0],
    selectedSize: size || sizes[0],
    selectedGender: gender || genders[0]
  };

  const currentContent = getCartContent();
  setCartContent([...currentContent, cartItem]);
  updateCartNumber();
  console.log(getCartContent());
}