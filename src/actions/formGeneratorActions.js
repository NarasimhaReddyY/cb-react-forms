import { 
  LOAD_DEMO,
  HIDE_DEMO,
  HANDLE_INPUT_CHANGE,
  HANDLE_CHECKBOX_CHANGE,
  HANDLE_TAGS_CHANGE,
  HANDLE_RADIOBUTTON_CHANGE,
  HANDLE_RATING_CHANGE
} from './types';

export const loadDemo = data => (
  { 
    type: LOAD_DEMO, 
    payload: { 
      data 
    } 
  }
);

export const hideDemo = () => (
  {
    type: HIDE_DEMO
  }
) 

export const handleInputChange = (id, value) => (
  {
    type: HANDLE_INPUT_CHANGE,
    payload: { id, value }
  }
)

export const handleCheckboxChange = (id, optionId) => (
  {
    type: HANDLE_CHECKBOX_CHANGE,
    payload: { id, optionId }
  }
)

export const handleTagsChange = (id, option) => (
  {
    type: HANDLE_TAGS_CHANGE,
    payload: { id, option }
  }
)

export const handleRadioButtonChange = (id, optionId) => (
  {
    type: HANDLE_RADIOBUTTON_CHANGE,
    payload: { id, optionId }
  }
)

export const handleRatingChange = (id, value) => (
  {
    type: HANDLE_RATING_CHANGE,
    payload: { id, value }
  }
)