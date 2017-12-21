import { handleActions } from 'redux-actions';

import * as types from '../actionTypes/direction';

const initialState = {
  origin: {},
  destination: {},
  direction: {},
  currentSearch: ''
}

export default handleActions({
  [types.SET_ORIGIN]: (state, { payload }) => ({
    ...state,
    origin: payload
  }),

  [types.SET_DESTINATION]: (state, { payload}) => ({
    ...state,
    destination: payload
  }),

  [types.SET_CURRENT_SEARCH]: (state, { payload }) => ({
    ...state,
    currentSearch: payload
  })
}, initialState)