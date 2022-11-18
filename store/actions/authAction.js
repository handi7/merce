import axios from "axios";
import Router from "next/router";
import { LOCAL_TOKEN } from "../../lib/constants";

export const login = (dispatch, data) => {
  try {
    dispatch({ type: "LOADING" });
    dispatch({ type: "UNCHECK_TOKEN" });

    setTimeout(async () => {
      const response = await axios.post(`/api/auth/login`, data);

      if (typeof response.data == "string") {
        return dispatch({ type: "ERROR", payload: response.data });
      }

      localStorage.setItem(LOCAL_TOKEN, response.data.token);
      dispatch({ type: "LOGIN", payload: response.data.userData });
      Router.push("/");
    }, 2000);
  } catch (error) {
    console.log(error);
  }
};

export const keepLogin = async (dispatch, token) => {
  try {
    const response = await axios.post(`/api/auth/keepLogin`, { token });
    if (!response.data) {
      localStorage.removeItem(LOCAL_TOKEN);
      return dispatch({ type: "LOGOUT" });
    }
    localStorage.setItem(LOCAL_TOKEN, response.data.token);
    dispatch({ type: "LOGIN", payload: response.data.userData });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (dispatch) => {
  localStorage.removeItem(LOCAL_TOKEN);
  dispatch({ type: "LOGOUT" });
  Router.push("/login");
};

export const checkStorage = (dispatch) => {
  dispatch({ type: "CHECK_STORAGE" });
};

export const getProfile = async (dispatch, userId) => {
  try {
    const response = await axios.get(`/api/admins/getProfile/${userId}`);
    dispatch({ type: "FILL_PROFILE", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};
