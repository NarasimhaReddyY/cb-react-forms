import uuid from "uuid/v4";
import { ADD_ITEM_TO_PREVIEW, REMOVE_ITEM_FROM_PREVIEW, MOVE_ITEM_IN_PREVIEW } from "./types";

export const addItem = element => {
	const id = uuid();
	const item = { id, element };
	return { type: ADD_ITEM_TO_PREVIEW, payload: item };
};

export const removeItem = id => ({ type: REMOVE_ITEM_FROM_PREVIEW, payload: id });

export const moveItem = (dragIndex, hoverIndex) => ({ type: MOVE_ITEM_IN_PREVIEW, payload: { dragIndex, hoverIndex } });
