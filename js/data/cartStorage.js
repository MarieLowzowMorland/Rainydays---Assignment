import { findJacketById } from "../data/products.js";

export const getCartContent = () => JSON.parse(window.localStorage.getItem("cart") || "[]");

const setCartContent = (content) => window.localStorage.setItem("cart", JSON.stringify(content));

export const addToCart = (jacketId, color, size, gender) => {
  const { id, colors, genders, sizes } = findJacketById(jacketId);
  const cartItem = {
    id,
    color: color || colors[0],
    size: size || sizes[0],
    gender: gender || genders[0]
  };

  const currentContent = getCartContent();
  setCartContent([...currentContent, cartItem]);
  console.log(getCartContent());
}