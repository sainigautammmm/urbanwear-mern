import {configureStore} from  "@reduxjs/toolkit";
import { productreducer } from "./REDUCER/products";
import { cartreducer } from "./REDUCER/cart";
import { userreducer } from "./REDUCER/user";

const store =  new configureStore({
    reducer:{
        myproduct:productreducer,
        mycart:cartreducer,
        myuser:userreducer

    }
})
export default store