import {
  CART_FETCH_ERROR,
  CART_FETCH_INIT,
  CART_FETCH_SUCCESS,
  CLEAR_ALL,
  DECREASE_ITEM,
  INCREASE_ITEM,
  REMOVE_ITEM,
} from './actions.js';

export const initialState = {
  data: [],
  isLoading: true,
  isError: false,
};

export function cartReducer(state, action) {
  switch (action.type) {
    case CART_FETCH_INIT:
      return { ...state, isLoading: true, isError: false };
    case CART_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case CART_FETCH_ERROR:
      return { ...state, isLoading: false, isError: true };
    case CLEAR_ALL:
      return { ...state, data: [] };
    case REMOVE_ITEM:
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload),
      };
    case INCREASE_ITEM:
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.id === action.payload) {
            return { ...item, amount: item.amount++ };
          }

          return item;
        }),
      };
    case DECREASE_ITEM:
      return {
        ...state,
        data: state.data
          .map((item) => {
            if (item.id === action.payload) {
              return { ...item, amount: item.amount-- };
            }

            return item;
          })
          .filter((item) => item.amount > 0),
      };
    default:
      throw new Error(`No action matching: ${action.type}`);
  }
}
