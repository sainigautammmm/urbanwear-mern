import {
  EMPTY_USER_FAILURE_MESSAGE,
  EMPTY_USER_SUCESS_MESSAGE,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCESS,
  LOGOUT_USER_FAILURE,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCESS,
  USER_AUTH_FAILURE,
  USER_AUTH_SUCESS,
  VERIFY_USER_ERROR,
  VERIFY_USER_REQUEST,
  VERIFY_USER_SUCESS,
} from "../Constant/user";

const userinitialstate = {
  user: {},
  isloading: false,
  sucess: "",
  failure: "",
};

export const userreducer = (state = userinitialstate, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        isloading: true,
      };

    case REGISTER_USER_SUCESS:
      return {
        ...state,
        isloading: false,
        user: action.payload.Data,
        sucess: action.payload.message,
      };

    case REGISTER_USER_FAILURE:
      return {
        ...state,
        isloading: false,
        failure: action.payload,
      };

    case VERIFY_USER_REQUEST:
      return {
        ...state,
        isloading: true,
      };
    case VERIFY_USER_SUCESS:
      return {
        ...state,
        isloading: false,
        user: action.payload.Data,
        sucess: action.payload.message,
      };
    case VERIFY_USER_ERROR:
      return {
        ...state,
        isloading: false,
        failure: action.payload,
      };

    case LOGIN_USER_REQUEST:
      return {
        ...state,
        isloading: true,
      };

    case LOGIN_USER_SUCESS:
      return {
        ...state,
        isloading: false,
        user: action.payload.Data,
        sucess: action.payload.message,
      };

    case LOGIN_USER_FAILURE:
      return {
        ...state,
        isloading: false,
        failure: action.payload,
      };

    case USER_AUTH_SUCESS:
      return {
        ...state,
        user: action.payload,
      };

    case USER_AUTH_FAILURE:
      return {
        ...state,
        failure: action.payload,
      };

    case LOGOUT_USER_REQUEST:
      return {
        ...state,
        isloading: true,
      };

    case LOGOUT_USER_SUCESS:
      return {
        ...state,
        isloading: false,
        sucess: action.payload,
        user: {},
      };

    case LOGOUT_USER_FAILURE:
      return {
        ...state,
        isloading: false,
        failure: action.payload,
      };

    case EMPTY_USER_SUCESS_MESSAGE:
      return {
        ...state,
        sucess: "",
      };

    case EMPTY_USER_FAILURE_MESSAGE:
      return {
        ...state,
        failure: "",
      };
    default:
      return state;
  }
};
