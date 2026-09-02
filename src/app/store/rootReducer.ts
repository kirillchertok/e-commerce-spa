import { combineReducers } from '@reduxjs/toolkit';

const appReducer = (state: Record<string, never> = {}) => state;

export const rootReducer = combineReducers({
    app: appReducer,
});
