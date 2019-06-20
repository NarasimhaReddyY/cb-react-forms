import { 
  LOAD_DEMO,
  HIDE_DEMO,
  HANDLE_INPUT_CHANGE,
  HANDLE_CHECKBOX_CHANGE,
  HANDLE_TAGS_CHANGE,
  HANDLE_RADIOBUTTON_CHANGE,
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

export const handleCheckboxChange = (id, optionIDs) => (
  {
    type: HANDLE_CHECKBOX_CHANGE,
    payload: { id, optionIDs }
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