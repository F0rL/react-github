import { createStore} from 'redux'

const initialState = {
  count: 0
}

const ADD = 'ADD_COUNT'

function reducer(state = initialState, action) {
  switch(action.type) {
    case ADD:
      return {count: state.count + 1}
    default:
      return state
  }
}

const store  = createStore(reducer, initialState)

console.log(store.getState())
store.dispatch({type: ADD})
console.log(store.getState())

export default store