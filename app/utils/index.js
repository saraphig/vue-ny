export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  }
}

export function debounce(fn, delay) {
  let timer = null;

  function d(...args) {
    const context = this;

    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  }

  return d;
}

export function throttle(fn, threshhold = 250) {
  let last;
  let timer;

  function t(...args) {
    const context = this;
    const now = +new Date();

    if (last && now < last + threshhold) {
      clearTimeout(timer);

      timer = setTimeout(() => {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  }

  return t;
}
