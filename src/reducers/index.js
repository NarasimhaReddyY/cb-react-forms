import previewItemsReducer from './previewItemsReducer';
import { combineReducers } from 'redux';

export default combineReducers({
  previewItems: previewItemsReducer
});