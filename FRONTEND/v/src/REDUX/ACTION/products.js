import axios from "axios";
axios.defaults.withCredentials = true;

import { FETCH_PRODUCT_FAILURE, FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS } from "../Constant/constants";

export const fetchproductaction = () => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCT_REQUEST });
  
  try {
    const response = await axios.get("http://localhost:8000/api/products/all-products"); // Change to GET request for all products

    if (response.data.success) {
      dispatch({
        type: FETCH_PRODUCT_SUCCESS,
        payload: {
          Data: response.data.data, // Assuming `data` contains the list of products
          message: response.data.message,
        },
      });
    }
  } catch (error) {
    console.error(error);
    const message = error.response?.data?.message || "An error occurred"; // Access the error message safely
    dispatch({ type: FETCH_PRODUCT_FAILURE, payload: message });
  }
};
