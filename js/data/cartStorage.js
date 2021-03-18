import { findJacketById } from "../data/products.js";

export const getCartContent = () => JSON.parse(window.localStorage.getItem("cart") || "[]");

const setCartContent = (content) => window.localStorage.setItem("cart", JSON.stringify(content));

export const addToCart = (jacketId) => {
  const { id, colors, genders, sizes } = findJacketById(jacketId);
  const cartItem = {
    id,
    color: colors[0],
    gender: genders[0],
    size: sizes[0]
  };

  const currentContent = getCartContent();
  setCartContent([...currentContent, cartItem]);
  console.log(getCartContent());
}