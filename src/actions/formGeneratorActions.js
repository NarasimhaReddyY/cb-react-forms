import { 
  LOAD_DEMO,
  HIDE_DEMO
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