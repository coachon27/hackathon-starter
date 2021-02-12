const createActionTypes = actionName => {
  const ACTIONNAME = actionName.toUpperCase();
  return {
    START: ACTIONNAME + ".START",
    SUCCESS: ACTIONNAME + ".SUCCESS",
    FAIL: ACTIONNAME + ".FAIL"
  };
};

export const LOGIN = createActionTypes("LOGIN");
export const LOGOUT = createActionTypes("LOGOUT");
export const ADDLIKE = createActionTypes("ADDLIKE");
export const REMOVELIKE = createActionTypes("REMOVELIKE");
export const CREATEMESSAGE = createActionTypes("CREATEMESSAGE");
export const DELETEMESSAGE = createActionTypes("DELETEMESSAGE");
export const GETMESSAGE = createActionTypes("GETMESSAGE");
export const GETPICTURE = createActionTypes("GETPICTURE");
export const SETPICTURE = createActionTypes("SETPICTURE");



