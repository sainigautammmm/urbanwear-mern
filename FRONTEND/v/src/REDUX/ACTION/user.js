import axios from "axios";

import { LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCESS, LOGOUT_USER_FAILURE, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCESS, REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCESS, USER_AUTH_FAILURE, USER_AUTH_SUCESS, VERIFY_USER_ERROR, VERIFY_USER_REQUEST, VERIFY_USER_SUCESS } from "../Constant/user";

export const registerUseraction = (formData, navigate) => async (dispatch) => {
  dispatch({ type: REGISTER_USER_REQUEST });
  try {
    const response = await axios.post(
      "http://localhost:8000/register_user",
      formData
    );

    if (response.data.sucess) {
      dispatch({
        type: REGISTER_USER_SUCESS,
        payload: {
          Data: response.data.Data,
          message: response.data.message,
        },
      });
    }
    localStorage.setItem("email", response.data.Data.email);
    navigate("/verify-otp");
  } catch (error) {
    const message = error.response.data.message;
    dispatch({ type: REGISTER_USER_FAILURE, payload: message });
  }
};

export const verifyOtpaction = (formData, navigate) => async (dispatch) => {
  dispatch({ type: VERIFY_USER_REQUEST });
  try {
    const response = await axios.post(
      "http://localhost:8000/verify-otp",
      formData
    );

    if (response.data.sucess) {
      dispatch({
        type: VERIFY_USER_SUCESS,
        payload: {
          Data: response.data.Data,
          message: response.data.message,
        },
      });
    }

    localStorage.removeItem("email");
    navigate("/login");
  } catch (error) {
    console.log(error);
    const message = error.response.data.message;
    dispatch({ type: VERIFY_USER_ERROR, payload: message });
  }
};



 export const loginuseraction = (formData,navigate)=>  async (dispatch)=>{

   dispatch({type:LOGIN_USER_REQUEST});

    try {
             const response = await axios.post("http://localhost:8000/login",formData);
             
             if (response.data.sucess) {
            console.log(response.data.Data)
              dispatch({type:LOGIN_USER_SUCESS,payload:{
                Data:response.data.Data,
                message:response.data.message,

              }});
                navigate('/');
             }

  } catch (error) {
       

    const message = error.response.data.message;
    dispatch({type:LOGIN_USER_FAILURE,payload:message});
  }


}



export const userAuthenticationaction = ()=>  async(dispatch)=>
  {
     
   
    try {
        const response = await axios.get("http://localhost:8000/user-auth");

        if (response.data.sucess) {
             dispatch({type:USER_AUTH_SUCESS,payload:{
              Data:response.data.Data,
              message:response.data.message,
             }})
        }
    } catch (error) {
        const message = error.response.Data.message;
        dispatch({type:USER_AUTH_FAILURE,payload:message})
    }
}



export const logoutuseraction =  (navigate)=>   async  (dispatch)=>{
  

       dispatch({type:LOGOUT_USER_REQUEST})

  try {
      const response = await axios.get("http://localhost:8000/logout",);

     if(response.data.sucess){
      dispatch({type:LOGOUT_USER_SUCESS,payload: response.data.message});
      navigate('/')
     }

  } catch (error) {
      const message = error.response.data.message;  
      dispatch({type:LOGOUT_USER_FAILURE})
  }







}