import { DEMO_TOGGLE } from '../actions/types';

const initialState = {
  demoVisible: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case DEMO_TOGGLE:
      return {
        demoVisible: !state.demoVisible
      }
    default:
      return state
  }
}