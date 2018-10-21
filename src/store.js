import { createStore } from 'redux';

const initialState = {
  hobbsStart: '',
  hobbsStop: '',
  timeUp: '',
  timeDown: '',
};

const rootReducer = (state, {type, payload}) => {
  switch(type) {
    case 'SET_HOBBS_START': {
      return {...state, hobbsStart: payload}
    }
    case 'SET_HOBBS_STOP': {
      return {...state, hobbsStop: payload}
    }
    case 'SET_TIME_UP': {
      return {...state, timeUp: payload}
    }
    case 'SET_TIME_DOWN': {
      return {...state, timeDown: payload}
    }
    default: {
      return state;
    }
  }
}

export default createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
