import { createStore, applyMiddleware, combineReducers } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";

const userInitialState = {};

// constant
const USER_LOGOUT = "USER_LOGOUT";


// reducer
function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case USER_LOGOUT: 
      return {}
    default:
      return state;
  }
}
const allReducer = combineReducers({
  USER: userReducer
});



// action creators
export function userLogout() {
  return dispatch => {
    axios
      .post("/logout")
      .then(resp => {
        if (resp.status === 200) {
          dispatch({
            type: USER_LOGOUT
          });
        } else {
          console.log("logout failed", resp);
        }
      })
      .catch(err => {
        console.log("logout failed", err);
      });
  };
}

export default function initializeStore(state) {
  const store = createStore(
    allReducer,
    Object.assign(
      {},
      {
        USER: userInitialState
      },
      state
    ),
    composeWithDevTools(applyMiddleware(ReduxThunk))
  );
  return store;
}
