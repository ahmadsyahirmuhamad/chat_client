import * as types from '../actions/types';

const initialState = {
    id: null,
    email: '',
    firstName: '',
    lastName: '',
    authToken: null,
    message: "haha",
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        authToken: action.payload.token,

        message: null
      };
    case types.LOGIN_FAILED:
      return {
        ...state,
        message: action.payload.message
      };
    case types.UPDATE_TOKEN:
      return {
        ...state,
        authToken: action.payload.token,
        
        message: null
      };
    case types.FETCH_USER_SUCCESS:
      return {
        ...state,
        id: action.payload.user.id,
        email: action.payload.user.email,
        firstName: action.payload.user.firstName,
        lastName: action.payload.user.lastName,
        
        message: null
      };
    case types.FETCH_USER_FAILED:
      return {
        ...state,
        message: action.payload.message
      };
    default:
      return state;
  }
}