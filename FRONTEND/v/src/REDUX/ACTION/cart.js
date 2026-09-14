// 
import axios from "axios";

import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE
} from "../Constant/constants";

export const addtocartaction =
  (product, productquantity, productprice) =>
  async (dispatch) => {

    dispatch({
      type: ADD_TO_CART_REQUEST
    });

    try {

      const response = await axios.post(
        "http://localhost:8000/api/cart/addtocart",
        {
          productid: product.productid,
          productquantity: productquantity,
          productprice: Number(productprice)
        }
      );

      console.log("Cart Response:", response.data);

      if (response.data.success) {

        dispatch({
          type: ADD_TO_CART_SUCCESS,

          payload: {
            ...product,

            // Backend se updated quantity
            productquantity:
              response.data.cartitem.productquantity
          }
        });

      }

    } catch (error) {

      console.log("Cart Error:", error);

      const message =
        error.response?.data?.message ||
        "An error occurred while adding to cart.";

      dispatch({
        type: ADD_TO_CART_FAILURE,
        payload: message
      });
    }
  };


  export const removefromcartaction =
  (productid) => async (dispatch) => {

    try {

      const response = await axios.delete(
        `http://localhost:8000/api/cart/remove/${productid}`
      );

      console.log("Remove Response:", response.data);

      if (response.data.success) {

        dispatch({
          type: "REMOVE_FROM_CART_SUCCESS",
          payload: productid
        });

      }

    } catch (error) {

      console.log("Remove Cart Error:", error);

      dispatch({
        type: "ADD_TO_CART_FAILURE",
        payload:
          error.response?.data?.message ||
          "Unable to remove product from cart"
      });
    }
  };