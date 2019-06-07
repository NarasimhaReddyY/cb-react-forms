import previewItemsReducer from './formBuilderReducer';
import formGeneratorReducer from './formGeneratorReducer';
import { combineReducers } from 'redux';

export default combineReducers({
  formBuilder: previewItemsReducer,
  formGenerator: formGeneratorReducer
});