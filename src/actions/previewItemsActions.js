import uuid from "uuid/v4";
import addPropsToItems from './addPropsToItem';
import { 
  ADD_ITEM_TO_PREVIEW, 
  REMOVE_ITEM_FROM_PREVIEW, 
  MOVE_ITEM_IN_PREVIEW 
} from "./types";

export const addItem = element => {
  const id = uuid();
  const defaultProps = {
    required: false,
    bold: false,
    italic: false,
    label: 'Placeholder label'
  };
  const props = addPropsToItems(element);
	const item = { id, element, ...defaultProps,...props };
	return { type: ADD_ITEM_TO_PREVIEW, payload: item };
};

export const removeItem = id => ({ type: REMOVE_ITEM_FROM_PREVIEW, payload: { id } });

export const dragItem = (dragIndex, hoverIndex) => ({ type: MOVE_ITEM_IN_PREVIEW, payload: { dragIndex, hoverIndex } });