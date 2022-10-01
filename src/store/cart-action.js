import axios from "axios";
import { alertAction } from "./alert-slice";
import { cartAction } from "./cart-slice";

export const getUserCart = (token) => {
  return async (dispatch) => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:8080/user/cart",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      dispatch(cartAction.setCart(response.data.productItems));
    } catch (error) {
      return error;
    }
  };
};

export const addItemToCart = (token, productId) => {
  return async (dispatch) => {
    try {
      await axios({
        method: "post",
        url: `http://localhost:8080/cart/add-product/${productId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      dispatch(getUserCart(token));
      dispatch(
        alertAction.showAlert({
          message: "Added to cart",
          type: "success",
        })
      );
    } catch (error) {
      return error;
    }
  };
};

export const removeItemFromCart = (token, productId) => {
  return async (dispatch) => {
    try {
      await axios({
        method: "delete",
        url: `http://localhost:8080/cart/remove-product/${productId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      dispatch(getUserCart(token));
      dispatch(
        alertAction.showAlert({
          message: "Removed from cart",
          type: "success",
        })
      );
    } catch (error) {
      return error;
    }
  };
};
