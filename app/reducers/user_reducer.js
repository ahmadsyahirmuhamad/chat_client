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
        firstName: action.payload.first_name,
        lastName: action.payload.last_name,
        authToken: action.payload.token,
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
      };
    default:
      return state;
  }
}