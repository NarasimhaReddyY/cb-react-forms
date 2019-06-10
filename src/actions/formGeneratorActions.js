import { 
  LOAD_DEMO,
  HIDE_DEMO,
  HANDLE_INPUT_CHANGE
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