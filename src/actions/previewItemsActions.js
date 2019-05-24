import { ADD_ITEM_TO_PREVIEW, REMOVE_ITEM_FROM_PREVIEW } from './types';

export const addItem = item => ({ type: ADD_ITEM_TO_PREVIEW, payload: item });

export const removeItem = id => ({ type: REMOVE_ITEM_FROM_PREVIEW, payload: id })