import axios from "axios";
import { useDispatch } from "react-redux";
import { API_URL, LOCAL_TOKEN } from "../../lib/constants";

// const dispatch = useDispatch();

export const login = (dispatch, data) => {
  try {
    dispatch({ type: "LOADING" });
    dispatch({ type: "UNCHECK_TOKEN" });

    setTimeout(async () => {
      const response = await axios.post(`${API_URL}/auth/login`, data);

      if (typeof response.data == "string") {
        return dispatch({ type: "ERROR", payload: response.data });
      }

      localStorage.setItem(LOCAL_TOKEN, response.data.token);
      dispatch({ type: "LOGIN", payload: response.data.userData });
    }, 2000);
  } catch (error) {
    console.log(error);
  }
};

export const keepLogin = async (dispatch, token) => {
  try {
    const response = await axios.post(`${API_URL}/auth/keepLogin`, { token });
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
};
