import { createStore } from 'redux';
import { canGoToPage, getNextPage, getPrevPage } from './pages';
import { getDeltaHours } from './tools';

const initialState = {
  hobbsStart: '',
  hobbsStop: '',
  timeUp: '',
  timeDown: '',
  page: 'HOBBS_START'
};

const rootReducer = (state, {type, payload}) => {
  switch(type) {
    case 'SET_HOBBS_START': {
      return { ...state, hobbsStart: payload}
    }
    case 'SET_HOBBS_STOP': {
      return {...state, hobbsStop: payload}
    }
    case 'SET_TIME_UP': {
      return {...state, timeUp: payload}
    }
    case 'SET_TIME_DOWN': {
      return {
        ...state,
        timeDown: payload,
        hobbsStop: state.hobbsStop === '' ? (Number(state.hobbsStart) + getDeltaHours(state.timeUp, payload) + 0.2).toFixed(1) : state.hobbsStop
      }
    }
    case 'NEXT': {
      const nextPage = getNextPage(state);
      return {
        ...state,
        page: canGoToPage(state, nextPage) ? nextPage : state.page
      };
    }
    case 'PREV': {
      const prevPage = getPrevPage(state);
      return {
        ...state,
        page: canGoToPage(state, prevPage) ? prevPage : state.page
      };
    }
    default: {
      return state;
    }
  }
}

export default createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
