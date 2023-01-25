import { combineReducers } from '@reduxjs/toolkit';
import type { AnyAction, CombinedState } from '@reduxjs/toolkit';

// reducers..

// actions..

type ReducerState = {};

const rootReducer = (
  state: any,
  action: AnyAction,
): CombinedState<ReducerState> => {
  switch (action.type) {
    default:
      return combineReducers({})(state, action);
  }
};

export default rootReducer;
