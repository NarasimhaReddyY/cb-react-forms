import { 
  LOAD_DEMO,
  HIDE_DEMO,
  HANDLE_INPUT_CHANGE
} from '../actions/types';

const initialState = {
  demoVisible: false,
  formData: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case LOAD_DEMO:
      return {
        ...state,
        demoVisible: true,
        formData: action.payload.data
      }
    case HIDE_DEMO:
      return {
        ...state,
        demoVisible: false,
        formData: []
      }
    case HANDLE_INPUT_CHANGE:
      const updatedFormData = state.formData.map(item => {
        if(item.id === action.payload.id) {
          item.value = action.payload.value
          return item;
        }
        return item;
      })
      return {
        ...state,
        formData: [...updatedFormData]
      }
    default:
      return state
  }
}