import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS,
} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(
      "https://us-central1-barker-pc100.cloudfunctions.net/api/login",
      userData
    )
    .then((res) => {
      setAuthHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(
      "https://us-central1-barker-pc100.cloudfunctions.net/api/signup",
      newUserData
    )
    .then((res) => {
      setAuthHeader(res.data.userToken);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("https://us-central1-barker-pc100.cloudfunctions.net/api/user")
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      console.log("getUserData Not Working");
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({
    type: LOADING_USER,
  });
  axios
    .post(
      "https://us-central1-barker-pc100.cloudfunctions.net/api/user/image",
      formData,
      {
        headers: {
          "content-type": "application/json",
          "x-apikey": "AIzaSyADDZqUJyeSPnDlP-SBSYwDcGFgPmJxxO8",
        },
        crossdomain: true,
      }
    )
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post(
      "https://us-central1-barker-pc100.cloudfunctions.net/api/user",
      userDetails
    )
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const markNotificationRead = (notificationIDs) => (dispatch) => {
  axios
    .post(
      "https://us-central1-barker-pc100.cloudfunctions.net/api/notifications",
      notificationIDs
    )
    .then((res) => {
      dispatch({ type: MARK_NOTIFICATIONS });
    })
    .catch((err) => console.log(err));
};

const setAuthHeader = (token) => {
  localStorage.setItem("FBIdToken", `Bearer ${token}`);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
