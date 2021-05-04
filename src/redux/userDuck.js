import { loginWithGoogle, logoutWithGoogle } from "../firebase";
import { retrieveFavoritesAction } from "./charsDuck";

// constants
let initialData = {
  logged: false,
  fetching: false,
};

let LOGIN = "LOGIN";
let LOGIN_SUCCESS = "LOGIN_SUCCESS";
let LOGIN_ERROR = "LOGIN_ERROR";

let LOGOUT = "LOGOUT";
// reducer
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, fetching: false, ...action.payload, logged: true };
    case LOGIN_ERROR:
      return { ...state, fetching: false, error: action.payload };
    case LOGIN:
      return { ...state, fetching: true };
    case LOGOUT:
      return { ...initialData };

    default:
      return state;
  }
}

// aux
function saveStorage(storage) {
  localStorage.storage = JSON.stringify(storage);
}

// actions
export const restoreSessionAction = () => (dispatch) => {
  let storage = localStorage.getItem("storage");
  storage = JSON.parse(storage);
  if (storage && storage.user) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: storage.user,
    });
  }
};

export const logoutAction = () => (dispatch, getState) => {
  logoutWithGoogle();
  dispatch({ type: LOGOUT });
  localStorage.removeItem("storage");
};

export const googleLoginAction = () => (dispatch, getState) => {
  dispatch({ type: LOGIN });
  return loginWithGoogle()
    .then((user) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        },
      });
      saveStorage(getState());
      retrieveFavoritesAction()(dispatch, getState);
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: LOGIN_ERROR, payload: err.message });
    });
};
