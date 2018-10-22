const pages = ['HOBBS_START', 'TIME_UP', 'TIME_DOWN', 'HOBBS_STOP', 'REPORT'];

const isValidHobbs = (hobbs) => {
  return hobbs.indexOf('.') !== -1 && hobbs.indexOf('.') === hobbs.length - 2;
}

export const canGoToPage = (state, page) => {
  if (page === 'HOBBS_START') {
    return true;
  }
  if (page === 'TIME_UP' && isValidHobbs(state.hobbsStart)) {
    return true;
  }
  if (page === 'TIME_DOWN' && !!state.timeUp) {
    return true;
  }
  if (page === 'HOBBS_STOP' && !!state.timeDown) {
    return true;
  }
  if (page === 'REPORT' && isValidHobbs(state.hobbsStop)) {
    return true;
  }
}

export const getNextPage = (state) => {
  return pages[Math.min(pages.length - 1, pages.indexOf(state.page) + 1)];
}

export const getPrevPage = (state) => {
  return pages[Math.max(0, pages.indexOf(state.page) - 1)];
}
