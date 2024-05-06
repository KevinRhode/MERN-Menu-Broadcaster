import {
  ADD_TASK,
  REMOVE_TASK,
 
} from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        state
      };
    case REMOVE_TASK:
      return {
        state
      };
    default:
      return state;
  }
};

export function useTaskReducer(initialState) {
  return useReducer(reducer, initialState);
}