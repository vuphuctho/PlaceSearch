import { takeEvery } from 'redux-saga'
import { put, select } from 'redux-saga/effects'

import * as types from '../actionTypes/search'
import { setOrigin, setDestination } from '../actions/direction'

const getCurrentSearchTarget = state => state.direction.currentSearch

function* onLocationSelected({ payload }) {
  const currentSearchTarget = yield select(getCurrentSearchTarget)
  switch (currentSearchTarget) {
    case 'origin':
      yield put(setOrigin(payload))
      break;
    case 'destination':
      yield put(setDestination(payload))
      break;
    default:
      break;
  }
}

export default function* watchSearchSaga() {
  yield takeEvery(types.ON_LOCATION_SELECTED, onLocationSelected)
}