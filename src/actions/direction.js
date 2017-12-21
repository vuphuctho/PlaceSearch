import { createAction } from 'redux-actions'

import * as types from '../actionTypes/direction'

export const setOrigin = createAction(types.SET_ORIGIN)
export const setDestination = createAction(types.SET_DESTINATION)
export const setCurrentSearch = createAction(types.SET_CURRENT_SEARCH)
export const setDirection = createAction(types.SET_DIRECTION)