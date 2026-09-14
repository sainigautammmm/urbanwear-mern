// import { ADD_TO_CART_FAILURE, ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS } from "../Constant/constants";

// const initialstate = {
//     cartitems:[],
//     isloading:false,
//     success:null,
//     failure:null,
// };

// export  const cartreducer = (state=initialstate,action)=>{

//      switch (action.type) {
//         case ADD_TO_CART_REQUEST:
//             return{
//                 ...state,
//                 isloading:true,
//                 success:null,
//                 failure:null
//             }
            
//            case ADD_TO_CART_SUCCESS:
//     return {
//         ...state,
//         isloading: false,
//         cartitems: [
//             ...state.cartitems,
//             action.payload
//         ],
//         success: "Product added to cart successfully"
//     };
     
//              case ADD_TO_CART_FAILURE:
//                 return{
//                     ...state,
//                     isloading:false,
//                     failure:action.payload,
//                 }
          

//         default:
//             return state;
//      }

// }

import {
  ADD_TO_CART_FAILURE,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS
} from "../Constant/constants";

const initialstate = {
  cartitems: [],
  isloading: false,
  success: null,
  failure: null
};

export const cartreducer = (
  state = initialstate,
  action
) => {

  switch (action.type) {

    case ADD_TO_CART_REQUEST:

      return {
        ...state,
        isloading: true,
        success: null,
        failure: null
      };


    case ADD_TO_CART_SUCCESS:

      // Check whether product already exists
      const existingProduct = state.cartitems.find(
        (item) =>
          item.productid === action.payload.productid
      );

      if (existingProduct) {

        return {
          ...state,

          isloading: false,

          cartitems: state.cartitems.map((item) =>
            item.productid === action.payload.productid
              ? {
                  ...item,
                  productquantity:
                    action.payload.productquantity
                }
              : item
          ),

          success: "Product added to cart successfully"
        };

      } else {

        return {
          ...state,

          isloading: false,

          cartitems: [
            ...state.cartitems,
            action.payload
          ],

          success: "Product added to cart successfully"
        };
      }


      case "REMOVE_FROM_CART_SUCCESS":

  return {
    ...state,

    cartitems: state.cartitems.filter(
      (item) =>
        item.productid !== action.payload
    ),

    success: "Product removed from cart"
  };

    case ADD_TO_CART_FAILURE:

      return {
        ...state,
        isloading: false,
        failure: action.payload
      };


    default:
      return state;
  }
};