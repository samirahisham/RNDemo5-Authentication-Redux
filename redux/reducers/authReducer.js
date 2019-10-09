import * as actionTypes from "../actions/types";

const initialState = {
  user: null,
  isAuthenticated: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        user: null
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,

        error: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
