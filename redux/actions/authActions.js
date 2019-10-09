import * as actionTypes from "./types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { AsyncStorage } from "react-native";

export const login = userData => {
  return async dispatch => {
    try {
      let response = await axios.post(
        "https://precious-things.herokuapp.com/login/",
        userData
      );
      let user = response.data;
      let decodedUser = jwt_decode(user.token);
      setAuthToken(user.token);
      dispatch(setCurrentUser(decodedUser));
    } catch (error) {
      console.error(error);
    }
  };
};

export const signup = userData => {
  return async dispatch => {
    try {
      await axios.post(
        "https://precious-things.herokuapp.com/signup/",
        userData
      );
      dispatch(login(userData));
    } catch (error) {
      console.error(error);
    }
  };
};
export const checkForExpiredToken = () => {
  return async dispatch => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      const currentTime = Date.now() / 1000;
      const user = jwt_decode(token);
      console.log((user.exp - currentTime) / 60);
      if (user.exp >= currentTime) {
        setAuthToken(token);
        dispatch(setCurrentUser(user));
      } else {
        dispatch(logout());
      }
    }
  };
};
const setCurrentUser = user => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: user
});

const setAuthToken = async token => {
  if (token) {
    await AsyncStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `jwt ${token}`;
  } else {
    await AsyncStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
  }
};

export const logout = () => {
  setAuthToken();
  return setCurrentUser();
};
