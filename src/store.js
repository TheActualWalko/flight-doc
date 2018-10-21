import { createStore } from 'redux';
import { canGoToPage, getNextPage, getPrevPage } from './pages';

const initialState = {
  hobbsStart: '55.9',
  hobbsStop: '',
  timeUp: '',
  timeDown: '',
  page: 'TIME_UP'
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
