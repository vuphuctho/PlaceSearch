import { createAction } from 'redux-actions'

import * as types from '../actionTypes/search'

export const selectLocation = createAction(types.ON_LOCATION_SELECTED)