import { ADD_ITEM_TO_PREVIEW, REMOVE_ITEM_FROM_PREVIEW, DRAG_ITEM_IN_PREVIEW } from "../actions/types";
import update from "immutability-helper";

const initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_ITEM_TO_PREVIEW:
			return [...state, action.payload];

		case REMOVE_ITEM_FROM_PREVIEW:
			return state.filter((item) => item.id !== action.payload.id);

		case DRAG_ITEM_IN_PREVIEW:
			const { dragIndex, hoverIndex } = action.payload;
			const dragCard = state[dragIndex];
			const newState = update(state, {
				$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
			});
			return newState;

		default:
			return state;
	}
};
