import { ADD_ITEM_TO_PREVIEW } from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  switch(action.type) {
    case ADD_ITEM_TO_PREVIEW:
      console.log(action)
      return [
        ...state,
        action.payload
      ]
    default:
      return state;
  }
}