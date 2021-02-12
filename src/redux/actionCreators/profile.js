import { domain, jsonHeaders, handleJsonResponse } from "./constants";
import { GETMESSAGE, CREATEMESSAGE, DELETEMESSAGE, ADDLIKE, REMOVELIKE, GETPICTURE, SETPICTURE } from "../actionTypes";


const url = domain;

export const getMessage = (username, limit) => dispatch => {
  dispatch({
    type: GETMESSAGE.START
  });

  let queryParams = `?username=${username}${(limit) ? "&limit=" + limit : ""}`

  return fetch(url + "/messages/" + queryParams, {
    method: "GET",
    headers: jsonHeaders,
  })
    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: GETMESSAGE.SUCCESS,
        payload: result 
      });
    })
    .catch(err => {
      return Promise.reject(dispatch({ type: GETMESSAGE.FAIL, payload: err }));
    });
};

export const createMessage = (text) => (dispatch, getState) => {
  dispatch({
    type: CREATEMESSAGE.START
  });

  const token = getState().auth.login.result.token;

  return fetch(url + "/messages", {
    method: "POST",
    headers: { Authorization: "Bearer " + token, ...jsonHeaders },
    body: JSON.stringify({text})
  })
    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: CREATEMESSAGE.SUCCESS,
        payload: result
      });
    })
    .catch(err => {
      return Promise.reject(dispatch({ type: CREATEMESSAGE.FAIL, payload: err }));
    });
};


export const deleteMessage = (messageId) => (dispatch, getState) => {
  dispatch({
    type: DELETEMESSAGE.START
  });

  const token = getState().auth.login.result.token;

  return fetch(url + "/messages/" + messageId, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token, ...jsonHeaders },
  })
    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: DELETEMESSAGE.SUCCESS,
        payload: result
      });
    })
    .catch(err => {
      return Promise.reject(dispatch({ type: DELETEMESSAGE.FAIL, payload: err }));
    });
};

export const addLike = (messageId) => (dispatch, getState) => {
  dispatch({
    type: ADDLIKE.START
  });

  const token = getState().auth.login.result.token;

  return fetch(url + "/likes", {
    method: "POST",
    headers: { Authorization: "Bearer " + token, ...jsonHeaders },
    body: JSON.stringify({messageId})
  })
    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: ADDLIKE.SUCCESS,
        payload: result
      });
    })
    .catch(err => {
      return Promise.reject(
        dispatch({ type: ADDLIKE.FAIL, payload: err.message })
      );
    });
};

export const removeLike = (likeId) => (dispatch, getState) => {
  dispatch({
    type: REMOVELIKE.START
  });

  const token = getState().auth.login.result.token;

  return fetch(url + "/likes/" + likeId, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token, ...jsonHeaders }
  })
    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: REMOVELIKE.SUCCESS,
        payload: result
      });
    })
    .catch(err => {
      return Promise.reject(
        dispatch({ type: REMOVELIKE.FAIL, payload: err.message })
      );
    });
};

export const getPicture = (username) => dispatch => {
  dispatch({
    type: GETPICTURE.START
  });

  const d = new Date().toISOString().replace(/[^0-9]/g, '');

  return fetch(url + "/users/" + username +  "/picture/?t=" + d, {
    method: "GET",
    headers: {  ContentType: 'image/jpeg', accept: 'image/png' }
  })
    .then(result => {
      return result.blob()
    })
    .then(result => {
      return dispatch({
        type: GETPICTURE.SUCCESS,
        payload: URL.createObjectURL(result)
      });
    })
    .catch(err => {
      return Promise.reject(dispatch({ type: GETPICTURE.FAIL, payload: err }));
    });
};


export const setPicture = (username, picture) => (dispatch, getState) => {
  dispatch({
    type: SETPICTURE.START
  });

  const token = getState().auth.login.result.token;  
  
  const formData = new FormData();
  formData.append('picture', picture);

  return fetch(url + "/users/" + username +  "/picture", {
    method: "PUT",
    headers: { Authorization: "Bearer " + token, ContentType: 'multipart/form-data', },
    body: formData
  })
    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: SETPICTURE.SUCCESS,
        payload: result
      });
    })
    .catch(err => {
      return Promise.reject(dispatch({ type: SETPICTURE.FAIL, payload: err }));
    });
};

