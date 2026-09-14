import { FETCH_PRODUCT_FAILURE, FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS } from "../Constant/constants";

const productinitialstate = {
    products:[],
    success:"",
    failure:"",
    isloading:false,
}

export const productreducer = (state=productinitialstate,action)=>{
    
    switch (action.type) {
        case FETCH_PRODUCT_REQUEST:
            return{
                ...state,
                isloading:true,
            }
            
            case FETCH_PRODUCT_SUCCESS:
                return{
                    ...state,
                    isloading:false,
                    products:action.payload.Data,
                    success:action.payload.message,
                }
     
                case FETCH_PRODUCT_FAILURE:
                    return{
                        ...state,
                        isloading:false,
                        failure:action.payload
                    }



        default:
            return state;
    }
}