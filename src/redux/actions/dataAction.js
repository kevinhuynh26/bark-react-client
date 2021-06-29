import {
  SET_BARKS,
  SET_ONE_BARK,
  LOADING_DATA,
  LIKE_BARK,
  UNLIKE_BARK,
  DELETE_BARK,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  POST_BARK,
  SUBMIT_COMMENT,
  DIALOG_OPEN,
  DIALOG_CLOSE,
} from "../types";
import axios from "axios";

export const getBarks = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  return new Promise((resolve, reject) =>
    axios
      .get("https://us-central1-barker-pc100.cloudfunctions.net/api/getBarks", {
        headers: {
          "content-type": "application/json",
          "x-apikey": "AIzaSyADDZqUJyeSPnDlP-SBSYwDcGFgPmJxxO8",
        },
        crossdomain: true,
      })
      .then((res) => {
        dispatch({
          type: SET_BARKS,
          payload: res.data,
        });
        resolve(res.data);
      })
      .catch((err) => {
        dispatch({
          type: SET_BARKS,
          payload: [],
        });
        reject(err);
      })
  );
};

export const dialogClosed = () => (dispatch) => {
  dispatch({ type: DIALOG_CLOSE });
};

export const getOneBark = (barkID, singlePost) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  if (!singlePost) dispatch({ type: DIALOG_OPEN });
  return new Promise((resolve, reject) =>
    axios
      .get(
        `https://us-central1-barker-pc100.cloudfunctions.net/api/getBark/${barkID}`
      )
      .then((res) => {
        dispatch({ type: SET_ONE_BARK, payload: res.data });
        dispatch({ type: STOP_LOADING_UI });
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      })
  );
};

export const submitComment = (barkID, comment) => (dispatch) => {
  return new Promise((resolve, reject) =>
    axios
      .post(
        `https://us-central1-barker-pc100.cloudfunctions.net/api/getBark/${barkID}/comment`,
        comment
      )
      .then((res) => {
        dispatch({ type: SUBMIT_COMMENT, payload: res.data });
        dispatch(clearErrors());
        resolve("comment successfully submitted");
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: SET_ERRORS, payload: err.response.data });
        reject("error => submitComment failed");
      })
  );
};

export const postBark = (newData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  return new Promise((resolve, reject) =>
    axios
      .post(
        `https://us-central1-barker-pc100.cloudfunctions.net/api/postBark`,
        newData
      )
      .then((res) => {
        dispatch({ type: POST_BARK, payload: res.data });
        dispatch(clearErrors());
        resolve();
      })
      .catch((err) => {
        dispatch({ type: SET_ERRORS, payload: err.response.data });
        reject();
      })
  );
};

export const likeBark = (barkID) => (dispatch) => {
  axios
    .get(
      `https://us-central1-barker-pc100.cloudfunctions.net/api/getBark/${barkID}/like`
    )
    .then((res) => {
      dispatch({ type: LIKE_BARK, payload: res.data });
    })
    .catch((err) => console.log(err));
};

export const unlikeBark = (barkID) => (dispatch) => {
  axios
    .get(
      `https://us-central1-barker-pc100.cloudfunctions.net/api/getBark/${barkID}/like`
    )
    .then((res) => {
      dispatch({ type: UNLIKE_BARK, payload: res.data });
    })
    .catch((err) => console.log(err));
};

export const deleteBark = (barkID) => (dispatch) => {
  axios
    .delete(
      `https://us-central1-barker-pc100.cloudfunctions.net/api/getBark/${barkID}`
    )
    .then(() => {
      dispatch({ type: DELETE_BARK, payload: barkID });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUserData = (handle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  return new Promise((resolve, reject) =>
    axios
      .get(
        `https://us-central1-barker-pc100.cloudfunctions.net/api/user/${handle}`
      )
      .then((res) => {
        dispatch({ type: SET_BARKS, payload: res.data.barks });
        resolve(res.data.user);
      })
      .catch((err) => {
        dispatch({ type: SET_BARKS, payload: null });
        reject(err);
      })
  );
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
