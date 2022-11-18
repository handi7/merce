import { message } from "antd";
import axios from "axios";

export const getCartItems = async (user_id, dispatch) => {
  try {
    const response = await axios.get(`/api/cart/getItems/${user_id}`);
    dispatch({ type: "FILL_CART", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = async (user_id, product_id, qty, dispatch) => {
  try {
    const response = await axios.post(`/api/cart/addItem`, {
      user_id,
      product_id,
      qty,
    });
    getCartItems(user_id, dispatch);
    if (response.data === "add") {
      return message.success("Product added to cart.");
    }
    message.success("Cart updated.");
  } catch (error) {
    console.log(error);
  }
};

export const updateCart = async (user_id, id, qty, dispatch) => {
  try {
    await axios.patch(`/api/cart/updateItem`, { id, qty });
    getCartItems(user_id, dispatch);
  } catch (error) {
    console.log(error);
  }
};

export const deleteCart = async (user_id, cart_id, dispatch) => {
  try {
    await axios.delete(`/api/cart/deleteItem/${cart_id}`);
    getCartItems(user_id, dispatch);
  } catch (error) {
    console.log(error);
  }
};
