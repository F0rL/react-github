import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const initialNumState = {
  count: 0
};

const ADD = "count/ADD_COUNT";

function add(num) {
  return {
    type: ADD,
    num
  };
}
function addAsync(num) {
  return dispatch => {
    setTimeout(() => {
      dispatch(add(num));
    }, 1000);
  };
}
function numReducer(state = initialNumState, action) {
  switch (action.type) {
    case ADD:
      return { count: state.count + action.num };
    default:
      return state;
  }
}

const initialNameState = {
  name: ""
};

const CHANGE_NAME = "name/CHANGE_NAME";

function changeName(name) {
  return {
    type: CHANGE_NAME,
    name
  };
}
function nameReducer(state = initialNameState, action) {
  switch (action.type) {
    case CHANGE_NAME:
      return { name: action.name };
    default:
      return state;
  }
}
const allReducer = combineReducers({
  COUNT: numReducer,
  NAME: nameReducer
});

const store = createStore(
  allReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

console.log(store.getState());
store.dispatch(add(3));
console.log(store.getState());
store.dispatch(changeName("kuma"));
console.log(store.getState());
store.dispatch(addAsync(5));
console.log(store.getState());
store.subscribe(() => console.log("changed: ", store.getState()));

export default store;
