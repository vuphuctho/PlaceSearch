import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import directionReducer from './reducers/direction'

import searchSaga from './saga/searchSaga'

const rootReducer = combineReducers({
  direction: directionReducer
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(searchSaga)

export default store