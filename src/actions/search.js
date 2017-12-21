import { createAction } from 'redux-actions'

import * as types from '../actionTypes/search'

export const selectLocation = createAction(types.ON_LOCATION_SELECTED)
export const getDirection = createAction(types.GET_DIRECTION)
export const onGetDirectionSucceeded = createAction(types.ON_GET_DIRECTION_SUCCEEDED)
export const onGetDirectionFailed = createAction(types.ON_GET_DIRECTION_FAILED)