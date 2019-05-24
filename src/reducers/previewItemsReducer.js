import { ADD_ITEM_TO_PREVIEW, REMOVE_ITEM_FROM_PREVIEW } from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  switch(action.type) {
    case ADD_ITEM_TO_PREVIEW:
      console.log(action)
      return [
        ...state,
        action.payload
      ]
    case REMOVE_ITEM_FROM_PREVIEW:
        return state.filter((_, i) => i !== action.payload);
    default:
      return state;
  }
}