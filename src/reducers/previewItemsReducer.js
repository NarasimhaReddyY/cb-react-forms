import { 
	ADD_ITEM_TO_PREVIEW, 
	REMOVE_ITEM_FROM_PREVIEW, 
	DRAG_ITEM_IN_PREVIEW,
	SHOW_EDITOR, 
	HIDE_EDITOR,
	SUBMIT_EDITOR_STATE
} from "../actions/types";
import update from "immutability-helper";

const initialState = {
	editorVisible: false,
	editorState: {},
	previewItems: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_ITEM_TO_PREVIEW:
			return {
				...state,
				previewItems: [...state.previewItems, action.payload]
			}

		case REMOVE_ITEM_FROM_PREVIEW:
			return {
				...state,
				previewItems: state.previewItems.filter(item => item.id !== action.payload.id) 
			}

		case DRAG_ITEM_IN_PREVIEW:
			const { dragIndex, hoverIndex } = action.payload;
			const dragCard = state.previewItems[dragIndex];
			const updatedItems = update(state.previewItems, {
				$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
			});
			return {
				...state, 
				previewItems: updatedItems
			};

		case SHOW_EDITOR:
			return {
				...state,
				editorVisible: true,
				editorState: action.payload.item
			}

		case  HIDE_EDITOR:
			return {
				...state,
				editorVisible: false,
				editorState: {}
			}

		case SUBMIT_EDITOR_STATE:
			const editedItem = state.previewItems.filter(item => item.id === action.payload.state.id);
			const updatedPreviewItems = state.previewItems.map(item => {
				if (item.id === editedItem.id) {
					item = editedItem
					return item;
				}
				return item;
			})
			const updatedState = 	{
				...state,
				previewItems: [...updatedPreviewItems]
			}
			return updatedState;

		default:
			return state;
	}
};
