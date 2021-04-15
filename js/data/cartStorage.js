import { findJacketById } from "../data/products.js";
import { updateCartNumber } from "../templates/header.js";

export const getCartContent = () =>
  JSON.parse(window.localStorage.getItem("cart") || "[]");

export const setCartContent = (content) => {
  window.localStorage.setItem("cart", JSON.stringify(content));
  updateCartNumber();
};

export const getSelectionKey = (selectedJacket) => {
  const { id, selectedColor, selectedSize, selectedGender } = selectedJacket;
  return `${id}-${selectedColor.id}-${selectedSize}-${selectedGender}`;
};

export const addToCart = async (jacketId, color, size, gender) => {
  const { id, colors, genders, sizes } = await findJacketById(jacketId);
  const cartItem = {
    id,
    selectedColor: color || colors[0],
    selectedSize: size || sizes[0],
    selectedGender: gender || genders[0],
  };

  const currentContent = getCartContent();
  setCartContent([...currentContent, cartItem]);
};

export const removeFromCart = (selectionKey) => {
  const contentWithoutRemovedElements = getCartContent().filter(
    (jacket) => getSelectionKey(jacket) !== selectionKey
  );
  setCartContent(contentWithoutRemovedElements);
};

export const emptyCart = () => 
  window.localStorage.removeItem("cart");