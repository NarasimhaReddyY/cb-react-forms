import { 
  LOAD_DEMO,
  HIDE_DEMO,
  HANDLE_INPUT_CHANGE,
  HANDLE_CHECKBOX_CHANGE,
  HANDLE_TAGS_CHANGE,
  HANDLE_RADIOBUTTON_CHANGE,
  HANDLE_RATING_CHANGE
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

    case HANDLE_INPUT_CHANGE: {
      const { id, value } = action.payload;
      const updatedFormData = state.formData.map(item => {
        if(item.id === id) {
          item.value = value
        }
        return item;
      })
      return {
        ...state,
        formData: [...updatedFormData]
      }
    }

    case HANDLE_CHECKBOX_CHANGE: {
      const { id, optionId } = action.payload;
      const updatedFormData = state.formData.map(item => {
        if(item.id === id) {
          item.options.forEach(option => {
            if(option.id === optionId) {
              option.checked = !option.checked
            }
            return option;
          })
        }
        return item
      })
      return {
        ...state,
        formData: [...updatedFormData]
      }
    }

    case HANDLE_TAGS_CHANGE: {
      const { id, option } = action.payload;
      const updatedFormData = state.formData.map(item => {
        if(item.id === id) {
          item.value = [...option]
          return item;
        }
        return item;
      })
      return {
        ...state,
        formData: [...updatedFormData]
      }
    }

    case HANDLE_RADIOBUTTON_CHANGE: {
      const { id, optionId } = action.payload;
      const updatedFormData = state.formData.map(item => {
        if(item.id === id) {
          item.options.forEach(option => {
            if(option.id === optionId) {
              option.checked = true;
              return option;
            } else {
              option.checked = false;
              return option;
            }
          })
          return item;
        }
        return item;
      })
      return {
        ...state,
        formData: [...updatedFormData]
      }
    }

    case HANDLE_RATING_CHANGE: {
      const { id, value } = action.payload;
      const updatedFormData = state.formData.map(item => {
        if(item.id === id) {
          item.value = value;
        }
        return item;
      })
      return {
        ...state,
        formData: [...updatedFormData]
      }
    }

    default:
      return state
  }
}