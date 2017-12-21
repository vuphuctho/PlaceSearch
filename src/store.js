import { createStore, applyMiddleware, combineReducers } from 'redux'

import directionReducer from './reducers/direction'

const rootReducer = combineReducers({
  direction: directionReducer
})

const store = createStore(rootReducer)

export default store