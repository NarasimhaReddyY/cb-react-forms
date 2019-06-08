import { 
  LOAD_DEMO,
  HIDE_DEMO
} from '../actions/types';

const initialState = {
  demoVisible: true,
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
    default:
      return state
  }
}