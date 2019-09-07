import { createStore, applyMiddleware, combineReducers } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const userInitialState = {

};

function userReducer(state = userInitialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
const allReducer = combineReducers({
  USER: userReducer
});

export default function initializeStore(state) {
  const store = createStore(
    allReducer,
    Object.assign({}, {
      USER: userInitialState,
    },state),
    composeWithDevTools(applyMiddleware(ReduxThunk))
  );
  return store
};
