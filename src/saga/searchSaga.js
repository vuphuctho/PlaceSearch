import { takeEvery, put, select, call } from 'redux-saga/effects'

import { isEmpty, isError, get, keys } from 'lodash'

import * as directionActions from '../actions/direction'
import * as actions from '../actions/search'
import * as types from '../actionTypes/search'
import { setOrigin, setDestination } from '../actions/direction'

const getCurrentSearchTarget = state => state.direction.currentSearch

const isTwoPointSet = state => {
  return !isEmpty(state.direction.origin) &&
    !isEmpty(state.direction.destination)
}

const getPlaceId = (state, pointName) => {
  return get(state, `direction.${pointName}.place_id`, '')
}

function* fetchData(url) {
  return fetch(url, { method: 'GET' })
}

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
  const _isTwoPointSet = yield select(isTwoPointSet)
  if (_isTwoPointSet) {
    yield put(actions.getDirection())
  }
}

function* getDirectionFromGoogle() {
  const originId = yield select(getPlaceId, 'origin')
  const destId = yield select(getPlaceId, 'destination')
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${originId}&destination=place_id:${destId}&mode=walking&key=AIzaSyA7Os3aZz2jfUB0G7PzJJRsTjm6FVYux6s`;
  const result = yield call(fetchData, url)
  result.then(resp => {
    if (resp.ok) {
      const { status, routes } = JSON.parse(get(resp, '_bodyText'))
      if (status === 'OK') {
        const polyline = get(routes, '0.overview_polyline.points', '')
        console.log(polyline)
        put(directionActions.setDirection(polyline))
      }
    }
  }).catch(e => { console.log(e)})
}

export default function* watchSearchSaga() {
  yield takeEvery(types.ON_LOCATION_SELECTED, onLocationSelected)
  // yield takeEvery(types.GET_DIRECTION, getDirectionFromGoogle)
}